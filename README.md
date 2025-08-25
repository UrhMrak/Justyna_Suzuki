# Suzuki Early Childhood Education Website

A modern, responsive website for Suzuki Early Childhood Education classes, featuring a comprehensive file-based storage system for editable content.

## Features

- **Responsive Design**: Mobile-first approach with modern UI/UX
- **File-Based Storage**: All editable content is stored in JSON files on the server
- **Admin Panel**: Secure login system for content management
- **Real-time Editing**: In-place editing of classes, about sections, pricing, and FAQ
- **Calendar Management**: Interactive calendar for class scheduling
- **Contact Form**: Integrated EmailJS for form submissions
- **Bluehost Compatible**: Designed to work seamlessly on Bluehost hosting

## File Structure

```
Justyna_Suzuki/
├── index.html              # Main website HTML
├── styles.css              # CSS styling
├── script.js               # JavaScript functionality
├── save_data.php           # PHP backend for saving data
├── load_data.php           # PHP backend for loading data
├── test.php                # PHP test file
├── .htaccess               # Apache configuration
├── data/                   # Data storage directory
│   ├── classes.json        # Class information
│   ├── about.json          # About section content
│   ├── pricing.json        # Pricing information
│   ├── faq.json            # FAQ content
│   └── calendar.json       # Calendar entries
└── README.md               # This file
```

## Setup Instructions

### 1. Upload to Bluehost

1. Upload all files to your Bluehost hosting account
2. Ensure the `data/` directory has write permissions (755)
3. Verify PHP is enabled on your hosting plan

### 2. Test PHP Installation

Visit `yourdomain.com/test.php` to verify PHP is working correctly.

### 3. Admin Access

- **Username**: `JustynaSuzukiece`
- **Password**: `qtmc!KetfZT49vG`
- Click the logo in the footer to access the login modal

## How to Use

### Editing Classes

1. Log in as admin
2. Navigate to the Classes section
3. Click "Edit" on any class card
4. Make changes to the editable fields
5. Click "Save" to store changes
6. Use "Add New Class" to create additional classes
7. Use "Delete" to remove classes

### Managing Content

The system automatically saves all changes to JSON files on the server:

- **Classes**: Stored in `data/classes.json`
- **About Section**: Stored in `data/about.json`
- **Pricing**: Stored in `data/pricing.json`
- **FAQ**: Stored in `data/faq.json`
- **Calendar**: Stored in `data/calendar.json`

### Calendar Management

1. Log in as admin
2. Click "More calendar info" on any class
3. Click "Edit" in the calendar modal
4. Click on any date field to edit
5. Changes are automatically saved

## Technical Details

### Backend Architecture

- **PHP Backend**: Handles file I/O operations
- **JSON Storage**: All data stored in human-readable JSON format
- **CORS Support**: Cross-origin requests enabled for development
- **Error Handling**: Comprehensive error handling and user feedback

### Security Features

- **Admin Authentication**: Secure login system
- **File Permissions**: Data directory protected from direct web access
- **Input Validation**: Server-side validation of all data
- **HTTPS Ready**: Secure headers configured

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-responsive design
- Progressive enhancement approach

## Troubleshooting

### Common Issues

1. **PHP Not Working**: Ensure PHP is enabled on your hosting plan
2. **Permission Errors**: Set `data/` directory permissions to 755
3. **Save Failures**: Check server error logs for detailed information
4. **Login Issues**: Verify username/password are correct

### Debug Mode

Check browser console for JavaScript errors and network tab for API responses.

## Support

For technical support or questions about the website functionality, contact the developer.

## Credits

- **Website Design & Development**: Urh Mrak
- **Content**: Justyna Bidler
- **Photography**: Árni Árnason (Justyna's portrait)

---

_This website uses a file-based storage system that works seamlessly on Bluehost hosting, providing a simple and reliable way to manage content without requiring a database._
