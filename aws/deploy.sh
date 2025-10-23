#!/bin/bash

# MFSG Website Deployment Script
# This script builds the Next.js app and deploys it to AWS Lambda + CloudFront

set -e

echo "🚀 Starting MFSG Website Deployment..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Install dependencies
echo -e "${BLUE}📦 Installing dependencies...${NC}"
npm install

# Step 2: Build Next.js app
echo -e "${BLUE}🔨 Building Next.js application...${NC}"
npm run build

# Step 3: Copy standalone build
echo -e "${BLUE}📁 Preparing Lambda package...${NC}"
mkdir -p aws/lambda-package
cp -r .next/standalone/* aws/lambda-package/
cp -r .next/static aws/lambda-package/.next/
cp -r public aws/lambda-package/

# Step 4: Copy Lambda handler
cp aws/lambda-handler.js aws/lambda-package/

# Step 5: Install production dependencies in Lambda package
echo -e "${BLUE}📦 Installing production dependencies for Lambda...${NC}"
cd aws/lambda-package
npm install --production
cd ../..

# Step 6: Create deployment zip
echo -e "${BLUE}📦 Creating deployment package...${NC}"
cd aws/lambda-package
zip -r ../lambda-deployment-package.zip . -x "*.git*" -x "node_modules/.cache/*"
cd ../..

echo -e "${GREEN}✅ Deployment package created: aws/lambda-deployment-package.zip${NC}"

# Step 7: Upload static assets to S3 (if bucket name provided)
if [ ! -z "$S3_BUCKET" ]; then
    echo -e "${BLUE}☁️  Uploading static assets to S3...${NC}"
    aws s3 sync .next/static s3://$S3_BUCKET/_next/static --cache-control "public, max-age=31536000, immutable"
    aws s3 sync public s3://$S3_BUCKET/public --cache-control "public, max-age=31536000"
    echo -e "${GREEN}✅ Static assets uploaded to S3${NC}"
fi

# Step 8: Deploy with Terraform (optional)
read -p "Do you want to deploy infrastructure with Terraform? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${BLUE}🏗️  Deploying infrastructure with Terraform...${NC}"
    cd aws
    terraform init
    terraform plan
    terraform apply -auto-approve
    cd ..
    echo -e "${GREEN}✅ Infrastructure deployed successfully!${NC}"
fi

echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo -e "${BLUE}Next steps:${NC}"
echo -e "1. If you didn't run Terraform, manually upload aws/lambda-deployment-package.zip to Lambda"
echo -e "2. Configure CloudFront distribution to point to Lambda Function URL"
echo -e "3. Upload static assets to S3 bucket"
echo -e "4. Test your website!"
