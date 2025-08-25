#!/bin/bash

# Bluehost Deployment Script (With Debug Tools)
# This script creates a deployment with minimal .htaccess and debug tools

echo "🚀 Deploying to Bluehost (With Debug Tools)..."

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
cp test_write.php public_html/

# Copy debug file
echo "🔍 Copying debug tools..."
cp debug_login.html public_html/

# Create data directory and copy initial data
echo "📊 Setting up data storage..."
mkdir -p public_html/data
cp data/*.json public_html/data/

# Set proper permissions for data directory
chmod 755 public_html/data
chmod 644 public_html/data/*.json

# Copy minimal .htaccess file
echo "⚙️ Adding minimal .htaccess for PHP execution..."
cp .htaccess_minimal_working public_html/.htaccess

echo "✅ Deployment complete (With Debug Tools)!"
echo "📂 Files deployed to: public_html/"
echo "🌐 Upload public_html/ contents to your Bluehost hosting"
echo "🔐 Admin login: JustynaSuzukiece / qtmc!KetfZT49vG"
echo "🧪 Test PHP at: yourdomain.com/test.php"
echo "🔧 Test file permissions at: yourdomain.com/test_write.php"
echo "🔍 Debug login at: yourdomain.com/debug_login.html"
echo "⚠️  Using minimal .htaccess to enable PHP execution"
echo "💡 Debug file will help identify login issues"
