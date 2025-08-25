#!/bin/bash

# Deployment Verification Script
# This script verifies that all necessary files are present and properly organized

echo "🔍 Verifying deployment for Bluehost upload..."
echo ""

# Check if public_html directory exists
if [ ! -d "public_html" ]; then
    echo "❌ ERROR: public_html directory not found!"
    echo "   Run ./deploy_with_minimal_htaccess.sh first"
    exit 1
fi

echo "✅ public_html directory found"
echo ""

# Check essential files
echo "📁 Checking essential files..."

# Main website files
files=(
    "index.html"
    "styles.css"
    "script.js"
    "logo.svg"
)

for file in "${files[@]}"; do
    if [ -f "public_html/$file" ]; then
        size=$(du -h "public_html/$file" | cut -f1)
        echo "✅ $file ($size)"
    else
        echo "❌ MISSING: $file"
    fi
done

echo ""

# Check images
echo "🖼️  Checking image files..."
images=(
    "Justyna.jpeg"
    "hero_img.jpeg"
    "hero_img2.jpeg"
    "hero_img3.jpeg"
    "hero_img4.jpeg"
    "about_us_img1.jpeg"
)

for image in "${images[@]}"; do
    if [ -f "public_html/$image" ]; then
        size=$(du -h "public_html/$image" | cut -f1)
        echo "✅ $image ($size)"
    else
        echo "❌ MISSING: $image"
    fi
done

echo ""

# Check PHP files
echo "🔧 Checking PHP backend files..."
php_files=(
    "save_data.php"
    "load_data.php"
    "test.php"
    "test_write.php"
)

for php_file in "${php_files[@]}"; do
    if [ -f "public_html/$php_file" ]; then
        size=$(du -h "public_html/$php_file" | cut -f1)
        echo "✅ $php_file ($size)"
    else
        echo "❌ MISSING: $php_file"
    fi
done

echo ""

# Check .htaccess
echo "⚙️  Checking configuration files..."
if [ -f "public_html/.htaccess" ]; then
    size=$(du -h "public_html/.htaccess" | cut -f1)
    echo "✅ .htaccess ($size)"
    
    # Check .htaccess content
    if grep -q "AddHandler application/x-httpd-php" "public_html/.htaccess"; then
        echo "✅ .htaccess contains PHP handler"
    else
        echo "❌ .htaccess missing PHP handler"
    fi
else
    echo "❌ MISSING: .htaccess (CRITICAL!)"
fi

echo ""

# Check data directory
echo "📊 Checking data storage..."
if [ -d "public_html/data" ]; then
    echo "✅ data/ directory exists"
    
    # Check JSON files
    json_files=(
        "classes.json"
        "about.json"
        "pricing.json"
        "faq.json"
        "calendar.json"
    )
    
    for json_file in "${json_files[@]}"; do
        if [ -f "public_html/data/$json_file" ]; then
            size=$(du -h "public_html/data/$json_file" | cut -f1)
            echo "✅ data/$json_file ($size)"
        else
            echo "❌ MISSING: data/$json_file"
        fi
    done
    
    # Check permissions
    if [ -w "public_html/data" ]; then
        echo "✅ data/ directory is writable"
    else
        echo "⚠️  data/ directory permissions may need adjustment"
    fi
else
    echo "❌ MISSING: data/ directory (CRITICAL!)"
fi

echo ""

# Final summary
echo "🎯 DEPLOYMENT VERIFICATION COMPLETE"
echo ""

# Count total files
total_files=$(find public_html -type f | wc -l)
total_dirs=$(find public_html -type d | wc -l)

echo "📊 Summary:"
echo "   Total files: $total_files"
echo "   Total directories: $total_dirs"
echo "   Total size: $(du -sh public_html | cut -f1)"
echo ""

# Check for any missing critical files
missing_critical=false
critical_files=(".htaccess" "index.html" "save_data.php" "load_data.php")

for critical in "${critical_files[@]}"; do
    if [ ! -f "public_html/$critical" ]; then
        missing_critical=true
        break
    fi
done

if [ "$missing_critical" = true ]; then
    echo "❌ CRITICAL FILES MISSING - Deployment incomplete!"
    echo "   Please run the deployment script again"
    exit 1
else
    echo "✅ ALL CRITICAL FILES PRESENT - Ready for Bluehost upload!"
    echo ""
    echo "🚀 Next steps:"
    echo "   1. Upload the ENTIRE public_html/ folder to Bluehost"
    echo "   2. Upload to the public_html folder on Bluehost (not root)"
    echo "   3. Test yourdomain.com/test.php (should return JSON, not download)"
    echo "   4. Test admin login and adding classes"
fi
