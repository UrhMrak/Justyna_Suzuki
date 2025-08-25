#!/bin/bash

# Bluehost Deployment Script (Clean - No .htaccess)
# This script creates a completely clean deployment without any .htaccess files

echo "🚀 Deploying to Bluehost (Clean - No .htaccess)..."

# Remove existing public_html directory
echo "🧹 Cleaning existing deployment..."
rm -rf public_html

# Create fresh public_html directory
mkdir -p public_html

# Copy main website files
echo "📁 Copying main website files..."
cp index.html public_html/
cp styles.css public_html/
cp script.js public_html/
cp logo.svg public_html/
cp *.jpeg public_html/

# Copy PHP backend files
echo "🔧 Copying PHP backend files..."
cp save_data.php public_html/
cp load_data.php public_html/
cp test.php public_html/

# Create data directory and copy initial data
echo "📊 Setting up data storage..."
mkdir -p public_html/data
cp data/*.json public_html/data/

# Set proper permissions for data directory
chmod 755 public_html/data
chmod 644 public_html/data/*.json

# Verify no .htaccess file exists
if [ -f "public_html/.htaccess" ]; then
    echo "⚠️  Removing .htaccess file..."
    rm public_html/.htaccess
fi

echo "✅ Clean deployment complete!"
echo "📂 Files deployed to: public_html/"
echo "🌐 Upload public_html/ contents to your Bluehost hosting"
echo "🔐 Admin login: JustynaSuzukiece / qtmc!KetfZT49vG"
echo "🧪 Test PHP at: yourdomain.com/test.php"
echo "✅ No .htaccess file - PHP will work by default on Bluehost"
echo "💡 This is the safest option for maximum compatibility"
