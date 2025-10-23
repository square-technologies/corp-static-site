# MFSG Website - Next.js with AWS Lambda + CloudFront

A modern, responsive website for Momentum Financial Services Group (MFSG) built with Next.js 15 and deployed to AWS using Lambda Function URLs and CloudFront.

## 🎨 Design Features

- **MoneyMart-inspired design**: Blue and red color scheme matching the MoneyMart brand
- **Fully responsive**: Mobile-first design that works on all devices
- **Modern UI**: Gradient backgrounds, smooth animations, and professional layouts
- **MFSG content**: Uses actual content from mfsg.com with enhanced presentation

## 🏗️ Architecture

```
User Request
    ↓
CloudFront CDN (Global Distribution)
    ├─ /_next/static/* → S3 (Cached static assets)
    ├─ /public/* → S3 (Public files)
    └─ /* (all other routes) → Lambda Function URL → Lambda (Next.js Server)
```

### Key Components

1. **CloudFront**: CDN for global content delivery and caching
2. **Lambda Function URL**: Direct HTTP endpoint for Lambda (no API Gateway needed)
3. **Lambda**: Runs Next.js server in standalone mode
4. **S3**: Hosts static assets (_next/static, public files)

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: AWS Lambda + CloudFront
- **IaC**: Terraform

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- AWS Account
- AWS CLI configured
- Terraform installed (optional, for infrastructure automation)

### Local Development

1. **Install dependencies**:
```bash
npm install
```

2. **Run development server**:
```bash
npm run dev
```

3. **Open browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🌐 Deployment to AWS

### Option 1: Automated Deployment with Script

1. **Run the deployment script**:
```bash
cd aws
./deploy.sh
```

2. **Follow prompts** to deploy with Terraform

### Option 2: Manual Deployment

#### Step 1: Build the Application

```bash
npm install
npm run build
```

#### Step 2: Prepare Lambda Package

```bash
# Create Lambda package directory
mkdir -p aws/lambda-package

# Copy standalone build
cp -r .next/standalone/* aws/lambda-package/
cp -r .next/static aws/lambda-package/.next/
cp -r public aws/lambda-package/

# Copy Lambda handler
cp aws/lambda-handler.js aws/lambda-package/

# Install production dependencies
cd aws/lambda-package
npm install --production
cd ../..

# Create deployment zip
cd aws/lambda-package
zip -r ../lambda-deployment-package.zip .
cd ../..
```

#### Step 3: Create AWS Infrastructure

**Using Terraform**:

```bash
cd aws
terraform init
terraform plan
terraform apply
```

**Or manually via AWS Console**:

1. **Create S3 Bucket**:
   - Name: `mfsg-website-static-assets`
   - Enable public access for static files
   - Upload contents of `.next/static` to `/_next/static/`
   - Upload contents of `public/` to root

2. **Create Lambda Function**:
   - Runtime: Node.js 20.x
   - Memory: 1024 MB
   - Timeout: 30 seconds
   - Upload `lambda-deployment-package.zip`
   - Set handler to `lambda-handler.handler`

3. **Create Lambda Function URL**:
   - Auth type: NONE
   - Enable CORS

4. **Create CloudFront Distribution**:
   - Origin 1: Lambda Function URL (for dynamic routes)
   - Origin 2: S3 bucket (for static assets)
   - Behaviors:
     - `/_next/static/*` → S3 (cache: 1 year)
     - `/*` → Lambda Function URL (cache: 0 seconds)

#### Step 4: Upload Static Assets

```bash
aws s3 sync .next/static s3://YOUR_BUCKET_NAME/_next/static --cache-control "public, max-age=31536000, immutable"
aws s3 sync public s3://YOUR_BUCKET_NAME/public
```

## 🛡️ Security & Cost Optimization

### CloudFront Caching

Configure caching policies to reduce Lambda invocations:

```
Static Assets (/_next/static/*):
  - Cache Duration: 1 year
  - No Lambda invocations after first request

Dynamic Pages:
  - Cache Duration: 0-60 seconds (configure based on your needs)
  - Use stale-while-revalidate for better performance
```

### AWS WAF (Recommended)

Add AWS WAF to CloudFront for protection:

1. Create WAF Web ACL
2. Add rate limiting rules (e.g., 2000 requests per 5 minutes per IP)
3. Add AWS Managed Rules for bot control
4. Associate with CloudFront distribution

### Cost Estimates

**With proper caching (90% cache hit rate)**:
- CloudFront: ~$10-30/month
- Lambda: ~$5-20/month
- S3: ~$1-5/month
- **Total: ~$20-60/month for moderate traffic**

**Without caching**:
- Costs could be 10-50x higher due to Lambda invocations

## 📁 Project Structure

```
mfsg-website/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section
│   ├── About.tsx           # About section
│   ├── Mission.tsx         # Mission section
│   ├── Brands.tsx          # Brands section
│   ├── Contact.tsx         # Contact form
│   └── Footer.tsx          # Footer
├── aws/
│   ├── lambda-handler.js   # Lambda handler for Next.js
│   ├── terraform.tf        # Infrastructure as Code
│   └── deploy.sh           # Deployment script
├── public/                 # Static assets
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Dependencies

```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  primary: '#003A70',    // Main blue
  accent: '#E31837',     // Red accent
  navy: '#0A1E42',       // Dark navy
}
```

### Content

Edit components in `/components` directory to update content.

### Sections

Add or remove sections in `app/page.tsx`.

## 🔧 Configuration

### Environment Variables

Create `.env.local` for local development:

```env
# Add any environment variables here
NEXT_PUBLIC_SITE_URL=https://your-cloudfront-url.cloudfront.net
```

### Next.js Configuration

The app is configured for standalone output suitable for Lambda:

```javascript
// next.config.js
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true, // Required for Lambda
  },
}
```

## 📊 Monitoring

Set up CloudWatch dashboards to monitor:
- Lambda invocations and errors
- CloudFront cache hit ratio
- Request latency
- Error rates

Create billing alarms:
```bash
aws cloudwatch put-metric-alarm \
  --alarm-name "MFSG-Website-High-Cost" \
  --alarm-description "Alert when daily cost exceeds threshold" \
  --metric-name EstimatedCharges \
  --namespace AWS/Billing \
  --statistic Maximum \
  --period 86400 \
  --threshold 50 \
  --comparison-operator GreaterThanThreshold
```

## 🐛 Troubleshooting

### Lambda Function Times Out
- Increase timeout in Lambda settings (max 30s for Function URL)
- Optimize Next.js build and reduce dependencies
- Consider using Lambda@Edge for shorter timeouts

### High Costs
- Check CloudFront cache hit ratio (should be >80%)
- Enable CloudWatch logs to see Lambda invocation patterns
- Add AWS WAF rate limiting
- Review CloudFront behaviors and caching policies

### Static Assets Not Loading
- Verify S3 bucket policy allows public access
- Check CloudFront behavior for `/_next/static/*` routes to S3
- Ensure files are uploaded to correct S3 paths

## 📝 License

© 2025 Momentum Financial Services Group. All Rights Reserved.

## 🤝 Support

For issues or questions:
- Check AWS CloudWatch logs
- Review CloudFront access logs
- Contact: support@mfsg.com

---

Built with ❤️ using Next.js, Tailwind CSS, and AWS
