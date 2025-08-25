# 🔧 Fixing "Failed to add new class" Error on Bluehost

## 🚨 **The Problem**

Your website loads and you can log in, but when you try to add a new class, you get:

> "Failed to add new class. Please try again."

This means the PHP backend can't write to the `data` directory on Bluehost.

## ✅ **What I've Fixed**

1. **Enhanced `save_data.php`** with better error handling and debugging
2. **Created `test_write.php`** to diagnose file system permissions
3. **Updated deployment script** to include all necessary files

## 🚀 **Steps to Fix**

### **Step 1: Upload the New Files**

1. **Run the updated deployment:**
   ```bash
   ./deploy_clean.sh
   ```
2. **Upload the new `public_html/` folder** to Bluehost
3. **Make sure the `data/` folder is included**

### **Step 2: Test File Permissions**

Visit: `yourdomain.com/test_write.php`

This will show you:

- ✅ Current directory permissions
- ✅ Whether data directory can be created
- ✅ Whether files can be written
- ✅ PHP user and configuration

### **Step 3: Check the Results**

The test will output detailed information about what's working and what's not.

## 🔍 **Common Issues & Solutions**

### **Issue 1: Data Directory Doesn't Exist**

**Symptoms:** Test shows "Failed to create data directory"
**Solution:**

1. Check if you uploaded the `data/` folder
2. Verify folder permissions on Bluehost
3. Try creating it manually via FTP

### **Issue 2: Permission Denied**

**Symptoms:** Test shows "Data directory is not writable"
**Solution:**

1. **Via Bluehost cPanel:**

   - Go to File Manager
   - Navigate to `public_html/data/`
   - Right-click → Change Permissions → Set to 755

2. **Via FTP:**
   ```bash
   chmod 755 data/
   chmod 644 data/*.json
   ```

### **Issue 3: Wrong Upload Location**

**Symptoms:** Test shows wrong current directory
**Solution:**

1. Make sure you're uploading to `public_html/` on Bluehost
2. Not to the root directory
3. Not to a subdirectory

## 🧪 **Testing Checklist**

After uploading, test these in order:

- [ ] **Website loads** (`yourdomain.com`)
- [ ] **PHP works** (`yourdomain.com/test.php`)
- [ ] **File permissions test** (`yourdomain.com/test_write.php`)
- [ ] **Admin login works** (click footer logo)
- [ ] **Add new class works** (after login)

## 📋 **Expected Test Output**

A successful `test_write.php` should show:

```
Testing file system permissions on Bluehost...

Current directory: /home/username/public_html
Current directory permissions: 0755
Current directory writable: YES

Attempting to create data directory: data
Data directory already exists
Data directory permissions: 0755
Data directory writable: YES

Testing file write...
Test file written successfully: data/test_write.json
Bytes written: 45
Test file read successfully
Content: {"test":"data","timestamp":"2025-01-XX XX:XX:XX"}
Test file cleaned up

PHP version: 8.3.x
PHP user: username
PHP temp directory: /tmp

Test complete!
```

## 🚨 **If Test Fails**

### **Check Bluehost Error Logs**

1. **cPanel → Error Logs**
2. Look for PHP errors or permission denied messages
3. Share any error messages you find

### **Contact Bluehost Support**

Ask about:

- File permissions for PHP scripts
- Data directory creation
- PHP user permissions

## 💡 **Alternative Solutions**

### **Solution 1: Use Different Directory**

If `data/` doesn't work, try:

```php
$dataDir = 'storage';  // or 'files' or 'content'
```

### **Solution 2: Use Absolute Paths**

```php
$dataDir = '/home/username/public_html/data';
```

### **Solution 3: Use Temporary Directory**

```php
$dataDir = sys_get_temp_dir() . '/suzuki_data';
```

## 🔧 **Manual Fix on Bluehost**

1. **Via File Manager:**

   - Create `data` folder in `public_html`
   - Set permissions to 755
   - Upload initial JSON files

2. **Via FTP:**
   - Create `data` directory
   - Set permissions: `chmod 755 data/`
   - Upload JSON files with `chmod 644`

## ✅ **Success Indicators**

Your file writing is working when:

- ✅ `test_write.php` completes without errors
- ✅ You can add new classes
- ✅ Classes are saved and persist
- ✅ No "Failed to add new class" errors

---

**Try the new deployment and test with `test_write.php` first!** This will tell us exactly what's wrong with the file permissions.
