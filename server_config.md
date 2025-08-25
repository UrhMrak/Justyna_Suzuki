# Bluehost Server Configuration Guide

## Required Server Settings

### 1. PHP Configuration

- **PHP Version**: 7.4 or higher (recommended: 8.0+)
- **PHP Extensions**:
  - `json` (enabled by default)
  - `fileinfo` (enabled by default)
  - `mbstring` (enabled by default)

### 2. File Permissions

```bash
# Data directory permissions
chmod 755 data/
chmod 644 data/*.json

# PHP files permissions
chmod 644 *.php

# Configuration files
chmod 644 .htaccess
```

### 3. Directory Structure on Bluehost

```
public_html/
├── index.html
├── styles.css
├── script.js
├── logo.svg
├── *.jpeg
├── save_data.php
├── load_data.php
├── test.php
├── .htaccess
└── data/
    ├── classes.json
    ├── about.json
    ├── pricing.json
    ├── faq.json
    └── calendar.json
```

## Testing Your Setup

### 1. Test PHP Installation

Visit: `yourdomain.com/test.php`
Expected response:

```json
{
  "status": "success",
  "message": "PHP is working correctly",
  "timestamp": "2025-01-XX XX:XX:XX",
  "php_version": "8.x.x",
  "server": "Apache/2.x.x"
}
```

### 2. Test Data Loading

Visit: `yourdomain.com/load_data.php?type=classes`
Expected response:

```json
{
  "success": true,
  "data": [...],
  "type": "classes"
}
```

### 3. Test Admin Login

1. Click the logo in the footer
2. Use credentials: `JustynaSuzukiece` / `qtmc!KetfZT49vG`
3. Navigate to Classes section
4. Try editing a class

## Troubleshooting

### Common Issues

1. **500 Internal Server Error**

   - Check PHP error logs in Bluehost cPanel
   - Verify .htaccess syntax
   - Ensure PHP is enabled

2. **Permission Denied**

   - Set data directory to 755
   - Set JSON files to 644
   - Check file ownership

3. **CORS Errors**

   - Verify .htaccess is uploaded
   - Check browser console for specific errors
   - Ensure PHP headers are working

4. **Data Not Saving**
   - Check data directory permissions
   - Verify PHP write access
   - Check server error logs

### Debug Steps

1. **Check PHP Error Logs**

   - Bluehost cPanel → Error Logs
   - Look for PHP errors or warnings

2. **Browser Developer Tools**

   - Network tab: Check API responses
   - Console tab: Look for JavaScript errors
   - Application tab: Check localStorage

3. **File Permissions**
   ```bash
   ls -la data/
   ls -la *.php
   ```

## Security Considerations

- **Admin Credentials**: Change default password after first login
- **Data Directory**: Protected from direct web access
- **File Uploads**: Not enabled (security feature)
- **HTTPS**: Recommended for production use

## Performance Tips

- **Caching**: Consider enabling browser caching for static files
- **Compression**: Enable GZIP compression in .htaccess
- **CDN**: Consider using CDN for images and static assets

## Support

For Bluehost-specific issues:

1. Check Bluehost Knowledge Base
2. Contact Bluehost Support
3. Check server error logs in cPanel

For website functionality issues:

1. Check browser console
2. Verify PHP installation
3. Test individual PHP endpoints
