# Fixing 500 Internal Server Error on Bluehost

## 🚨 Immediate Fix

The 500 error is likely caused by the `.htaccess` file. Here are the steps to fix it:

### Option 1: Use Minimal .htaccess (Recommended)

1. Upload the `public_html/` folder to Bluehost
2. If you still get errors, replace `.htaccess` with this minimal version:

```apache
# Enable PHP execution
AddHandler application/x-httpd-php .php

# Set default character encoding
AddDefaultCharset UTF-8
```

### Option 2: Remove .htaccess Temporarily

1. Delete the `.htaccess` file from your Bluehost hosting
2. Test if the website loads
3. If it works, gradually add back features

## 🔍 Step-by-Step Troubleshooting

### 1. Check File Permissions

```bash
# On Bluehost, set these permissions:
chmod 644 .htaccess
chmod 644 *.php
chmod 755 data/
chmod 644 data/*.json
```

### 2. Test PHP Files Individually

Visit these URLs one by one:

- `yourdomain.com/test.php`
- `yourdomain.com/load_data.php?type=classes`

### 3. Check Bluehost Error Logs

1. Log into Bluehost cPanel
2. Go to "Error Logs" or "Logs"
3. Look for specific error messages

### 4. Verify PHP is Enabled

1. Check Bluehost cPanel → "PHP Configuration"
2. Ensure PHP 7.4+ is selected
3. Verify required extensions are enabled

## 🛠️ Alternative Solutions

### Solution A: Use .htaccess_simple

If the minimal version works, try the simple version:

```apache
# Enable PHP execution
AddHandler application/x-httpd-php .php

# Set default character encoding
AddDefaultCharset UTF-8

# Basic security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>

# Enable CORS for PHP files
<Files "*.php">
    <IfModule mod_headers.c>
        Header always set Access-Control-Allow-Origin "*"
        Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS"
        Header always set Access-Control-Allow-Headers "Content-Type"
    </IfModule>
</Files>
```

### Solution B: No .htaccess

If all .htaccess files cause issues:

1. Remove .htaccess completely
2. The website will still work (PHP will execute)
3. You may lose some security headers and CORS support

## 📋 Testing Checklist

- [ ] Website loads without .htaccess
- [ ] PHP files execute (test.php works)
- [ ] Data loading works (load_data.php works)
- [ ] Admin login works
- [ ] Content editing works
- [ ] Data saving works

## 🚨 Emergency Recovery

If nothing works:

1. **Backup your data files** (`data/*.json`)
2. **Remove all .htaccess files**
3. **Upload only essential files:**
   - `index.html`
   - `styles.css`
   - `script.js`
   - `*.php` files
   - `data/` folder
4. **Test basic functionality**
5. **Add features back gradually**

## 📞 Getting Help

### Bluehost Support

- Contact Bluehost support for server-specific issues
- Ask about PHP configuration and .htaccess support

### Common Issues

- **mod_rewrite disabled**: Remove RewriteEngine lines
- **mod_headers disabled**: Remove Header lines
- **PHP version too old**: Upgrade to PHP 7.4+

## ✅ Success Indicators

Your website is working correctly when:

- ✅ Main page loads without errors
- ✅ `test.php` returns JSON response
- ✅ Admin can log in and edit content
- ✅ Changes are saved to server files
- ✅ No 500 errors in browser console

## 🔄 Next Steps After Fix

1. **Test all functionality**
2. **Change admin password**
3. **Add content through admin panel**
4. **Monitor error logs**
5. **Consider adding .htaccess features back gradually**
