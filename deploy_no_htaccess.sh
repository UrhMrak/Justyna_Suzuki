#!/bin/bash

# Bluehost Deployment Script (No .htaccess)
# This script copies all website files to the public_html directory without .htaccess

echo "🚀 Deploying to Bluehost (No .htaccess)..."

# Create public_html directory if it doesn't exist
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

echo "✅ Deployment complete (No .htaccess)!"
echo "📂 Files deployed to: public_html/"
echo "🌐 Upload public_html/ contents to your Bluehost hosting"
echo "🔐 Admin login: JustynaSuzukiece / qtmc!KetfZT49vG"
echo "🧪 Test PHP at: yourdomain.com/test.php"
echo "⚠️  No .htaccess file included - PHP should work by default"
echo "💡 This is the safest option for Bluehost compatibility"
