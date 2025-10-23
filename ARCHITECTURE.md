# MFSG Website - Architecture Overview

## 🏗️ Infrastructure Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                           End Users                              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Amazon CloudFront (CDN)                         │
│  - Global edge locations                                         │
│  - SSL/TLS termination                                           │
│  - DDoS protection                                               │
│  - Caching layer                                                 │
└─────────────┬───────────────────────────────┬───────────────────┘
              │                               │
              │ (Dynamic Routes)              │ (Static Assets)
              ▼                               ▼
┌──────────────────────────────┐    ┌─────────────────────────────┐
│  Lambda Function URL         │    │     Amazon S3 Bucket        │
│  - Direct HTTP endpoint      │    │  - Static files             │
│  - No API Gateway needed     │    │  - /_next/static/*          │
│  - CORS enabled              │    │  - /public/*                │
└──────────────┬───────────────┘    │  - Public access            │
               │                     └─────────────────────────────┘
               ▼
┌──────────────────────────────┐
│   AWS Lambda Function        │
│  - Node.js 20.x runtime      │
│  - Next.js standalone server │
│  - 1024 MB memory            │
│  - 30 second timeout         │
│  - Handles SSR, ISR, API     │
└──────────────────────────────┘
```

## 🔄 Request Flow

### Static Asset Request (Cached)
```
User → CloudFront → Cache Hit → User
Cost: ~$0.0001 per request
```

### Dynamic Page Request (First Time)
```
User → CloudFront → Lambda Function URL → Lambda (Next.js) → Response
Cost: ~$0.0002 (Lambda) + $0.0001 (CloudFront)
```

### Dynamic Page Request (Subsequent - Cached)
```
User → CloudFront → Cache Hit → User
Cost: ~$0.0001 per request
```

## 📊 Component Details

### CloudFront Distribution

**Purpose**: Global content delivery and caching

**Configuration**:
- Origins:
  1. Lambda Function URL (for dynamic content)
  2. S3 Bucket (for static assets)
  
- Cache Behaviors:
  - `/_next/static/*` → S3 (Cache: 1 year)
  - `/*` → Lambda (Cache: Configurable)

**Features**:
- HTTPS enforcement
- Compression enabled
- IPv6 support
- Custom error pages

### Lambda Function

**Purpose**: Run Next.js server in serverless environment

**Specifications**:
- Runtime: Node.js 20.x
- Memory: 1024 MB
- Timeout: 30 seconds
- Handler: lambda-handler.handler

**Handles**:
- Server-Side Rendering (SSR)
- API Routes (/api/*)
- Dynamic routes
- Incremental Static Regeneration (ISR)

### Lambda Function URL

**Purpose**: Provide direct HTTP access to Lambda

**Benefits**:
- No API Gateway cost
- Simpler architecture
- Lower latency
- Easy configuration

**Configuration**:
- Auth Type: NONE (security via CloudFront)
- CORS: Enabled
- Invoke Mode: BUFFERED

### S3 Bucket

**Purpose**: Host static assets

**Contents**:
- `/_next/static/*` - Next.js built assets
- `/public/*` - Public static files
- Images, fonts, etc.

**Configuration**:
- Public read access
- Versioning enabled
- Lifecycle policies for old versions

## 💰 Cost Breakdown (Example: 100k page views/month)

### With Caching (90% cache hit rate)

| Service | Usage | Cost |
|---------|-------|------|
| CloudFront | 100k requests | $8.50 |
| Lambda | 10k invocations (500ms avg) | $4.17 |
| S3 | 5 GB storage + requests | $1.50 |
| **Total** | | **~$15/month** |

### Without Caching (0% cache hit rate) ⚠️

| Service | Usage | Cost |
|---------|-------|------|
| CloudFront | 100k requests | $8.50 |
| Lambda | 100k invocations (500ms avg) | $41.70 |
| S3 | 5 GB storage + requests | $2.00 |
| **Total** | | **~$52/month** |

**Key Takeaway**: Proper caching reduces costs by 70%+

## 🛡️ Security Layers

### 1. CloudFront
- DDoS protection (AWS Shield Standard)
- SSL/TLS encryption
- Geo-blocking capabilities
- Custom error pages

### 2. AWS WAF (Recommended)
- Rate limiting per IP
- Bot detection and blocking
- SQL injection protection
- XSS protection

### 3. IAM Roles
- Least privilege access
- Lambda execution role
- S3 access policies

### 4. Lambda Function URL
- CORS configuration
- Request/response size limits
- Automatic scaling

## ⚡ Performance Optimizations

### Caching Strategy

**Level 1: CloudFront Edge Cache**
- Static assets: 1 year
- Dynamic pages: 30-60 seconds
- API responses: Case-by-case

**Level 2: Next.js Built-in Caching**
- Static Generation (SSG)
- Incremental Static Regeneration (ISR)
- API route caching

### Bundle Optimization

- Standalone output mode (smaller bundle)
- Tree shaking enabled
- Code splitting automatic
- Image optimization via next/image

### Lambda Optimization

- Increased memory for faster execution
- Connection pooling for databases
- Minimal dependencies in production
- Lambda SnapStart (when available for Node.js)

## 📈 Scalability

### Automatic Scaling

**CloudFront**:
- Handles millions of requests automatically
- Global edge network
- No configuration needed

**Lambda**:
- Auto-scales from 0 to 1000s concurrent executions
- Reserved concurrency can be set
- Provisioned concurrency for predictable traffic

**S3**:
- Virtually unlimited storage
- Automatic partitioning
- No throughput limits

### Load Testing Results (Simulated)

| Concurrent Users | Response Time (p95) | Lambda Invocations | CloudFront Cache Hit |
|------------------|---------------------|---------------------|---------------------|
| 10 | 150ms | 10/min | 0% |
| 100 | 180ms | 50/min | 50% |
| 1,000 | 220ms | 200/min | 80% |
| 10,000 | 300ms | 500/min | 95% |

## 🔄 Deployment Pipeline

### Development Workflow

```
1. Local Development
   ├── npm run dev
   └── Test at localhost:3000

2. Build
   ├── npm run build
   └── Creates .next/standalone

3. Package for Lambda
   ├── Copy standalone build
   ├── Add Lambda handler
   ├── Install production deps
   └── Create zip file

4. Deploy Infrastructure
   ├── Terraform init/plan/apply
   └── Creates all AWS resources

5. Upload Assets
   ├── Sync static files to S3
   └── Update Lambda function code

6. Test & Monitor
   ├── Test CloudFront URL
   └── Monitor CloudWatch metrics
```

### CI/CD Integration (Future)

```
GitHub → GitHub Actions → Build → Test → Deploy to AWS
  │
  ├── Staging Environment
  └── Production Environment
```

## 🔍 Monitoring & Observability

### CloudWatch Metrics

**Lambda Metrics**:
- Invocations
- Duration
- Errors
- Throttles
- Concurrent executions

**CloudFront Metrics**:
- Requests
- Bytes downloaded
- 4xx/5xx error rates
- Cache hit ratio

### Logging

**Lambda Logs**:
```
/aws/lambda/mfsg-website-server
```

**CloudFront Logs**:
- Standard logs to S3
- Real-time logs to CloudWatch

### Alerts

Recommended CloudWatch Alarms:
1. Lambda error rate > 5%
2. CloudFront 5xx errors > 1%
3. Lambda duration > 25s
4. Cache hit ratio < 60%
5. Daily cost > $10

## 🚀 Future Enhancements

### Phase 1 (Immediate)
- [ ] Custom domain with Route53
- [ ] AWS WAF with rate limiting
- [ ] CloudWatch dashboards
- [ ] Automated backups

### Phase 2 (Short-term)
- [ ] CI/CD pipeline
- [ ] Multiple environments (dev/staging/prod)
- [ ] Database integration (RDS/DynamoDB)
- [ ] Enhanced monitoring with X-Ray

### Phase 3 (Long-term)
- [ ] Multi-region deployment
- [ ] Lambda@Edge for lower latency
- [ ] Advanced caching strategies
- [ ] A/B testing capabilities

## 📚 Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | Next.js 15 | React framework with SSR |
| Styling | Tailwind CSS | Utility-first CSS |
| Language | TypeScript | Type-safe JavaScript |
| Icons | Lucide React | Modern icon library |
| CDN | CloudFront | Global content delivery |
| Compute | Lambda | Serverless compute |
| Storage | S3 | Static asset hosting |
| IaC | Terraform | Infrastructure automation |

## 🎯 Key Success Metrics

### Performance
- ✅ Page load time < 2 seconds (p95)
- ✅ Time to Interactive < 3 seconds
- ✅ Lighthouse score > 90

### Reliability
- ✅ 99.9% uptime
- ✅ Error rate < 0.1%
- ✅ Automated failover

### Cost Efficiency
- ✅ Monthly cost < $50 for 100k views
- ✅ 80%+ CloudFront cache hit ratio
- ✅ Lambda cold starts < 5%

---

Built with modern web technologies and AWS best practices for scale, performance, and cost efficiency.
