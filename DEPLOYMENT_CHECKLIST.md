# ✅ MFSG Website Deployment Checklist

Use this checklist to ensure a smooth deployment process.

## 📋 Pre-Deployment Checklist

### Local Development
- [ ] Clone/download the project
- [ ] Run `npm install` successfully
- [ ] Run `npm run dev` and test at localhost:3000
- [ ] Verify all sections render correctly
- [ ] Test responsive design on mobile/tablet/desktop
- [ ] Check browser console for errors
- [ ] Test contact form functionality

### AWS Prerequisites
- [ ] AWS Account created
- [ ] AWS CLI installed (`aws --version`)
- [ ] AWS credentials configured (`aws configure`)
- [ ] Verify access: `aws sts get-caller-identity`
- [ ] Terraform installed (optional but recommended)
- [ ] Node.js 18+ installed (`node --version`)

### Cost Planning
- [ ] Review cost estimates in documentation
- [ ] Set up AWS Budget alert
- [ ] Configure billing alarm in CloudWatch
- [ ] Understand Lambda pricing
- [ ] Understand CloudFront pricing

## 🚀 Deployment Checklist

### Step 1: Build Application
- [ ] Run `npm run build`
- [ ] Verify build completes without errors
- [ ] Check `.next` folder was created
- [ ] Verify standalone build in `.next/standalone`

### Step 2: Prepare Lambda Package
- [ ] Create `aws/lambda-package` directory
- [ ] Copy standalone build files
- [ ] Copy Lambda handler
- [ ] Install production dependencies
- [ ] Create deployment zip file
- [ ] Verify zip is under 250MB

### Step 3: Deploy Infrastructure

#### Using Terraform (Recommended)
- [ ] Navigate to `aws/` directory
- [ ] Run `terraform init`
- [ ] Run `terraform plan`
- [ ] Review plan output
- [ ] Run `terraform apply`
- [ ] Save Terraform outputs
- [ ] Note Lambda Function URL
- [ ] Note CloudFront distribution URL
- [ ] Note S3 bucket name

#### Manual Deployment
- [ ] Create S3 bucket for static assets
- [ ] Configure S3 bucket policy (public read)
- [ ] Create Lambda function (Node.js 20.x)
- [ ] Upload Lambda deployment package
- [ ] Set Lambda handler to `lambda-handler.handler`
- [ ] Configure Lambda timeout (30s)
- [ ] Configure Lambda memory (1024MB)
- [ ] Create Lambda Function URL
- [ ] Configure CORS on Function URL
- [ ] Create CloudFront distribution
- [ ] Configure CloudFront origins (Lambda + S3)
- [ ] Configure CloudFront behaviors
- [ ] Wait for CloudFront deployment (10-15 min)

### Step 4: Upload Static Assets
- [ ] Upload `.next/static` to S3 bucket
- [ ] Set cache headers (max-age=31536000)
- [ ] Upload `public/` folder to S3
- [ ] Verify files are accessible via S3 URL

### Step 5: Verify Deployment
- [ ] Test Lambda Function URL directly
- [ ] Test CloudFront URL
- [ ] Verify homepage loads
- [ ] Click through all sections
- [ ] Test all navigation links
- [ ] Submit contact form (test)
- [ ] Check mobile responsiveness
- [ ] Test in different browsers
- [ ] Verify static assets load (check Network tab)

## 🔒 Security Checklist

### CloudFront Security
- [ ] HTTPS enforced (redirect HTTP to HTTPS)
- [ ] SSL certificate configured (if custom domain)
- [ ] Compression enabled
- [ ] Consider enabling AWS Shield Standard

### AWS WAF Setup (Highly Recommended)
- [ ] Create WAF Web ACL
- [ ] Add rate limiting rule (2000 req/5min)
- [ ] Add AWS Managed Rules for Bot Control
- [ ] Add IP reputation lists
- [ ] Associate WAF with CloudFront distribution
- [ ] Test rate limiting

### Lambda Security
- [ ] IAM role has least privilege
- [ ] No hardcoded secrets
- [ ] Environment variables secured
- [ ] CloudWatch Logs enabled
- [ ] Reserved concurrency set (optional)

### S3 Security
- [ ] Bucket policy reviewed
- [ ] Versioning enabled
- [ ] No sensitive data in bucket
- [ ] Access logs enabled (optional)

## 📊 Monitoring Setup

### CloudWatch Alarms
- [ ] Create alarm: Lambda errors > 5%
- [ ] Create alarm: Lambda duration > 25s
- [ ] Create alarm: CloudFront 5xx errors > 1%
- [ ] Create alarm: Daily cost > $10
- [ ] Test alarm notifications

### CloudWatch Dashboards
- [ ] Create dashboard for Lambda metrics
- [ ] Add widget: Invocation count
- [ ] Add widget: Error rate
- [ ] Add widget: Duration
- [ ] Create dashboard for CloudFront metrics
- [ ] Add widget: Request count
- [ ] Add widget: Cache hit ratio
- [ ] Add widget: Error rates

### Logging
- [ ] Lambda logs streaming to CloudWatch
- [ ] CloudFront access logs enabled (optional)
- [ ] Review log retention settings
- [ ] Set up log insights queries

## 💰 Cost Optimization

### Caching Configuration
- [ ] CloudFront cache behaviors configured
- [ ] Static assets: Cache for 1 year
- [ ] Dynamic content: Cache for 30-60s
- [ ] Query string caching configured
- [ ] Cookie forwarding minimized
- [ ] Header forwarding minimized

### Lambda Optimization
- [ ] Lambda memory optimized (1024MB)
- [ ] Lambda timeout appropriate (30s)
- [ ] Code bundle size minimized
- [ ] Unused dependencies removed
- [ ] Consider Lambda SnapStart

### Monitoring Costs
- [ ] AWS Cost Explorer enabled
- [ ] Daily cost checks scheduled
- [ ] Budgets set up
- [ ] Billing alerts configured
- [ ] Review costs weekly

## 🔧 Post-Deployment

### Custom Domain (Optional)
- [ ] Domain registered
- [ ] ACM certificate requested (us-east-1)
- [ ] Certificate validated
- [ ] Added to CloudFront distribution
- [ ] Route53 DNS records created
- [ ] SSL working on custom domain
- [ ] www redirect configured

### Performance Testing
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Test load time from different locations
- [ ] Verify cache hit ratio > 80%
- [ ] Test under load (optional)

### Documentation
- [ ] Document CloudFront distribution ID
- [ ] Document Lambda function ARN
- [ ] Document S3 bucket name
- [ ] Document custom domain (if any)
- [ ] Save Terraform state (if using Terraform)
- [ ] Create runbook for updates

### Backup & Disaster Recovery
- [ ] S3 versioning enabled
- [ ] Terraform state backed up
- [ ] Lambda function code backed up
- [ ] Configuration documented
- [ ] Rollback procedure documented

## 🔄 Maintenance Checklist

### Weekly
- [ ] Check CloudWatch metrics
- [ ] Review error logs
- [ ] Check cache hit ratio
- [ ] Monitor costs
- [ ] Review security alerts

### Monthly
- [ ] Review and optimize costs
- [ ] Update dependencies (npm update)
- [ ] Review WAF rules and metrics
- [ ] Check for AWS service updates
- [ ] Performance audit

### Quarterly
- [ ] Full security audit
- [ ] Review and update documentation
- [ ] Disaster recovery test
- [ ] Performance optimization review
- [ ] Cost optimization review

## 🐛 Troubleshooting Checklist

### If Website Won't Load
- [ ] Check CloudFront distribution status
- [ ] Verify DNS records (if custom domain)
- [ ] Check CloudWatch logs
- [ ] Test Lambda Function URL directly
- [ ] Verify CloudFront behaviors
- [ ] Check S3 bucket permissions

### If Static Assets 404
- [ ] Verify files uploaded to S3
- [ ] Check S3 bucket policy
- [ ] Review CloudFront cache behaviors
- [ ] Check file paths in S3
- [ ] Clear CloudFront cache
- [ ] Verify CloudFront origin configuration

### If High Costs
- [ ] Check CloudFront cache hit ratio
- [ ] Review Lambda invocation count
- [ ] Check for bot traffic
- [ ] Review WAF logs
- [ ] Add rate limiting
- [ ] Optimize caching policies

### If Slow Performance
- [ ] Check Lambda duration metrics
- [ ] Review Lambda memory allocation
- [ ] Check CloudFront cache headers
- [ ] Optimize bundle size
- [ ] Enable compression
- [ ] Review database queries (if any)

## ✅ Final Verification

### Production Readiness
- [ ] All deployment steps completed
- [ ] Security measures in place
- [ ] Monitoring configured
- [ ] Costs within budget
- [ ] Performance acceptable
- [ ] Backup strategy in place
- [ ] Documentation complete
- [ ] Team trained (if applicable)
- [ ] Rollback plan ready
- [ ] Support contacts documented

### Launch Day
- [ ] Final testing complete
- [ ] Monitoring dashboard open
- [ ] Team on standby
- [ ] Rollback plan ready
- [ ] DNS cutover (if custom domain)
- [ ] Smoke tests passed
- [ ] Monitor for first 24 hours

## 🎉 Success Criteria

Your deployment is successful when:
- ✅ Website loads in < 2 seconds
- ✅ All sections render correctly
- ✅ Mobile responsive works perfectly
- ✅ Cache hit ratio > 80%
- ✅ Error rate < 0.1%
- ✅ Daily cost within budget
- ✅ Monitoring alerts working
- ✅ Security measures active

---

## 📞 Support Resources

If you get stuck:
1. Check [QUICKSTART.md](./QUICKSTART.md) troubleshooting
2. Review [README.md](./README.md) documentation
3. Check CloudWatch logs
4. Review AWS service status
5. Consult Terraform documentation

---

**Print this checklist and check items off as you complete them!**

Good luck with your deployment! 🚀
