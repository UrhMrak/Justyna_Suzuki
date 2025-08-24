#!/bin/bash

# Deploy script for Justyna Suzuki website
# This script moves all necessary files to the public_html folder for deployment

echo "🚀 Starting deployment preparation..."

# Create public_html directory if it doesn't exist
mkdir -p public_html

# Copy all website files to public_html
echo "📁 Copying website files to public_html..."
cp index.html public_html/
cp styles.css public_html/
cp script.js public_html/
cp logo.svg public_html/
cp *.jpeg public_html/

# Copy API files to public_html
echo "🔧 Copying API files to public_html..."
cp -r api/ public_html/
cp -r data/ public_html/

# Remove any .DS_Store files (macOS specific)
find public_html -name ".DS_Store" -delete

echo "✅ Deployment preparation complete!"
echo "📂 Files are now in the public_html folder"
echo "🌐 Ready to deploy to Bluehost via GitHub Actions"
echo ""
echo "Next steps:"
echo "1. Commit and push these changes to GitHub"
echo "2. Set up GitHub repository secrets for FTP credentials"
echo "3. The workflow will automatically deploy on push to main branch"
