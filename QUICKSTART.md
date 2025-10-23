# Quick Start Guide - MFSG Website Deployment

## 🎯 Overview

This guide will help you deploy the MFSG website to AWS using Lambda Function URLs and CloudFront.

## Prerequisites Checklist

- [ ] AWS Account with admin access
- [ ] AWS CLI installed and configured (`aws configure`)
- [ ] Node.js 18+ installed
- [ ] Terraform installed (optional, but recommended)

## 🚀 Deployment Steps

### Step 1: Test Locally (5 minutes)

```bash
# Navigate to project directory
cd mfsg-website

# Install dependencies
npm install

# Run development server
npm run dev
```

Open http://localhost:3000 to verify the website works.

### Step 2: Build for Production (2 minutes)

```bash
# Build the Next.js application
npm run build

# Test production build locally
npm start
```

### Step 3: Deploy to AWS (10-15 minutes)

#### Option A: Automated Deployment (Recommended)

```bash
# Run the deployment script
cd aws
./deploy.sh

# Follow the prompts
# The script will:
# 1. Build the application
# 2. Create Lambda deployment package
# 3. (Optional) Deploy infrastructure with Terraform
```

#### Option B: Manual Deployment

**1. Create Lambda Deployment Package:**

```bash
# Build and package
npm run build

# Prepare Lambda package
mkdir -p aws/lambda-package
cp -r .next/standalone/* aws/lambda-package/
cp -r .next/static aws/lambda-package/.next/
cp -r public aws/lambda-package/
cp aws/lambda-handler.js aws/lambda-package/

# Install production dependencies
cd aws/lambda-package
npm install --production

# Create zip file
zip -r ../lambda-deployment-package.zip .
cd ../..
```

**2. Deploy Infrastructure with Terraform:**

```bash
cd aws
terraform init
terraform plan
terraform apply
```

Terraform will create:
- ✅ S3 bucket for static assets
- ✅ Lambda function with Function URL
- ✅ CloudFront distribution
- ✅ IAM roles and policies

**3. Upload Static Assets:**

After Terraform completes, get your S3 bucket name and run:

```bash
# Get bucket name from Terraform output
terraform output s3_bucket_name

# Upload static files
aws s3 sync .next/static s3://YOUR-BUCKET-NAME/_next/static \
  --cache-control "public, max-age=31536000, immutable"

aws s3 sync public s3://YOUR-BUCKET-NAME/public \
  --cache-control "public, max-age=31536000"
```

### Step 4: Access Your Website (1 minute)

```bash
# Get CloudFront URL from Terraform
cd aws
terraform output website_url
```

Visit the URL to see your live website!

## 🔧 Post-Deployment Configuration

### 1. Set Up Custom Domain (Optional)

If you have a custom domain:

1. Add domain to CloudFront distribution
2. Create ACM certificate in `us-east-1`
3. Update Route53 DNS records

```bash
# In terraform.tf, uncomment and configure:
variable "domain_name" {
  default = "www.mfsg.com"
}
```

### 2. Enable AWS WAF (Highly Recommended)

Protect against bots and DDoS:

```bash
# Create WAF Web ACL in AWS Console
# Add rate limiting: 2000 requests per 5 minutes per IP
# Add AWS Managed Rules for bot control
# Associate with CloudFront distribution
```

### 3. Set Up Monitoring

Create CloudWatch dashboard:
- Lambda invocations
- CloudFront cache hit ratio
- Error rates
- Costs

Create billing alarm:
```bash
aws cloudwatch put-metric-alarm \
  --alarm-name "MFSG-Website-Cost-Alert" \
  --metric-name EstimatedCharges \
  --namespace AWS/Billing \
  --statistic Maximum \
  --period 86400 \
  --threshold 50 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 1
```

## 💰 Cost Optimization

### Configure CloudFront Caching

To minimize Lambda costs, configure aggressive caching:

**Static Assets** (`/_next/static/*`):
- Cache: 1 year (31536000 seconds)
- Cost: Nearly $0 after first request

**Dynamic Pages**:
- Cache: 30-60 seconds with stale-while-revalidate
- Reduces Lambda calls by 90%+

### Expected Monthly Costs

With proper caching (assumes 100k page views/month):

| Service | Cost |
|---------|------|
| CloudFront | $8-15 |
| Lambda | $5-10 |
| S3 | $1-3 |
| **Total** | **$15-30/month** |

Without caching: **$200-500/month** ⚠️

## 🐛 Troubleshooting

### Issue: Lambda timeout

**Solution**: 
- Check Lambda logs in CloudWatch
- Increase timeout (max 30s for Function URL)
- Optimize Next.js bundle size

### Issue: Static assets not loading

**Solution**:
- Verify S3 bucket policy allows public access
- Check CloudFront behavior routing
- Confirm files uploaded to correct S3 paths

### Issue: High costs

**Solution**:
- Check CloudFront cache hit ratio (should be >80%)
- Add WAF rate limiting
- Review Lambda invocation patterns in CloudWatch

### Issue: 502/503 errors

**Solution**:
- Check Lambda function logs
- Verify Lambda Function URL is accessible
- Ensure CloudFront origin is correctly configured

## 📊 Monitoring Commands

```bash
# View Lambda logs
aws logs tail /aws/lambda/mfsg-website-server --follow

# Check CloudFront metrics
aws cloudfront get-distribution-config \
  --id YOUR-DISTRIBUTION-ID

# View current costs
aws ce get-cost-and-usage \
  --time-period Start=2025-01-01,End=2025-01-31 \
  --granularity MONTHLY \
  --metrics BlendedCost
```

## 🔄 Updating the Website

When you make changes:

```bash
# 1. Build new version
npm run build

# 2. Create new Lambda package
cd aws
./deploy.sh

# 3. Update Lambda function
aws lambda update-function-code \
  --function-name mfsg-website-server \
  --zip-file fileb://lambda-deployment-package.zip

# 4. Sync static assets
aws s3 sync .next/static s3://YOUR-BUCKET/_next/static

# 5. Invalidate CloudFront cache (if needed)
aws cloudfront create-invalidation \
  --distribution-id YOUR-DIST-ID \
  --paths "/*"
```

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)

## ✅ Deployment Checklist

- [ ] Local development tested
- [ ] Production build successful
- [ ] Lambda function deployed
- [ ] Lambda Function URL created
- [ ] Static assets uploaded to S3
- [ ] CloudFront distribution created
- [ ] Website accessible via CloudFront URL
- [ ] AWS WAF configured (recommended)
- [ ] CloudWatch alarms set up
- [ ] Billing alerts configured
- [ ] Custom domain configured (if applicable)

## 🆘 Need Help?

If you encounter issues:

1. Check CloudWatch logs for errors
2. Verify all AWS resources are created
3. Test Lambda Function URL directly
4. Review CloudFront behaviors and origins
5. Check S3 bucket permissions

---

🎉 **Congratulations!** Your MFSG website is now live on AWS!
