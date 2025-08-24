# Bluehost Deployment Guide for Suzuki Website

## 🚀 **Overview**

This guide explains how to deploy the Suzuki website with server-side storage on Bluehost. The website now uses PHP APIs to store class data permanently on the server instead of just in the browser's localStorage.

## 📁 **File Structure**

After deployment, your Bluehost directory should look like this:

```
public_html/
├── index.html
├── script.js
├── styles.css
├── images/
├── api/
│   ├── classes.php
│   └── auth.php
└── data/
    ├── .htaccess
    └── classes.json
```

## 🔧 **Setup Steps**

### 1. **Upload Files to Bluehost**

1. Upload all your website files to the `public_html` directory
2. Create the `api` folder and upload the PHP files
3. Create the `data` folder and upload the JSON and .htaccess files

### 2. **Configure File Permissions**

Set the following permissions on your Bluehost server:

```bash
# Data directory (readable/writable by PHP)
chmod 755 data/
chmod 644 data/classes.json
chmod 644 data/.htaccess

# API directory (executable by web server)
chmod 755 api/
chmod 644 api/*.php
```

### 3. **Update Security Settings**

**IMPORTANT**: Change the secret keys in these files:

#### In `api/auth.php`:

```php
private $secretKey = 'your_super_secret_key_change_this_in_production';
```

#### In `api/classes.php`:

```php
// Update the secret key to match auth.php
```

### 4. **Test the Setup**

1. Visit your website
2. Click the footer logo to open the login modal
3. Login with:
   - Username: `JustynaSuzukiece`
   - Password: `qtmc!KetfZT49vG`
4. Try editing a class and saving
5. Refresh the page to verify changes persist

## 🔒 **Security Features**

- **Token-based Authentication**: JWT tokens for secure API access
- **Protected Data Directory**: .htaccess prevents direct access to JSON files
- **Input Validation**: All data is validated before saving
- **CORS Protection**: API endpoints are properly configured

## 📊 **How It Works**

### **Data Flow**:

1. **Login**: User authenticates and receives JWT token
2. **Load Classes**: Website fetches classes from server API
3. **Edit Classes**: User makes changes in the browser
4. **Save Changes**: Changes are sent to server API with auth token
5. **Persist Data**: Server saves data to JSON file
6. **Load on Refresh**: Data is restored from server on page reload

### **API Endpoints**:

- `GET /api/classes.php` - Load all classes
- `POST /api/classes.php` - Save/update classes (requires auth)
- `PUT /api/classes.php` - Update specific class (requires auth)
- `DELETE /api/classes.php?id=X` - Delete class (requires auth)
- `POST /api/auth.php` - Login and get token
- `GET /api/auth.php?validate=1&token=X` - Validate token

## 🛠️ **Troubleshooting**

### **Common Issues**:

1. **"Failed to save" errors**:

   - Check file permissions on `data/` directory
   - Verify PHP has write access
   - Check error logs in Bluehost cPanel

2. **Login not working**:

   - Verify API files are uploaded correctly
   - Check browser console for errors
   - Ensure PHP is enabled on Bluehost

3. **Classes not loading**:
   - Check if `data/classes.json` exists
   - Verify file permissions
   - Check API endpoint URLs

### **Debug Mode**:

Add this to the top of `api/classes.php` for debugging:

```php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

## 🔄 **Backup & Maintenance**

### **Regular Backups**:

- The `data/classes.json` file contains all your class data
- Download this file regularly as a backup
- Use the Export/Import features in the admin panel

### **Data Migration**:

- If you need to move to a different server, just copy the `data/` folder
- The API will automatically handle data format changes

## 📱 **Mobile Compatibility**

The website works on all devices:

- **Desktop**: Full admin features
- **Mobile**: Responsive design with touch-friendly controls
- **Tablet**: Optimized layout for medium screens

## 🚀 **Performance Tips**

1. **Enable Caching**: Use Bluehost's caching features
2. **Compress Images**: Optimize your image files
3. **Minify CSS/JS**: Use minified versions in production
4. **CDN**: Consider using a CDN for static assets

## 📞 **Support**

If you encounter issues:

1. Check the browser console for error messages
2. Verify file permissions and server configuration
3. Check Bluehost error logs in cPanel
4. Ensure PHP version is 7.4 or higher

## 🔮 **Future Enhancements**

Potential improvements you could add:

- **Database Storage**: Move from JSON files to MySQL
- **User Management**: Multiple admin accounts
- **Activity Logging**: Track who made what changes
- **Backup Automation**: Automatic daily backups
- **Email Notifications**: Alerts for important changes

---

**Note**: This setup provides a robust, secure foundation for your Suzuki website. The data will persist across all devices and browser sessions, making it much more practical for day-to-day management.
