# Justyna Bidler - Suzuki Teaching Website

A beautiful, responsive website for Justyna Bidler's Suzuki teaching classes. This is a one-page design with smooth scrolling navigation and modern UI/UX.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Scrolling**: One-page design with smooth navigation between sections
- **Modern UI**: Clean, elegant design with beautiful animations and hover effects
- **Interactive Elements**: FAQ accordion, contact form, and mobile navigation
- **SEO Friendly**: Proper HTML structure and meta tags

## Sections

1. **Home**: Hero section with introduction and call-to-action
2. **About Us**: Information about Justyna Bidler with statistics
3. **Classes**: Three class offerings with details and enrollment buttons
4. **FAQ**: Six frequently asked questions with expandable answers
5. **Contact**: Contact form and contact information
6. **Footer**: Links, social media, and additional information

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
├── logo.png           # Justyna's logo
└── README.md          # This file
```

## Customization Guide

### Colors

The website uses a sophisticated color scheme:

- Primary: `#8B5CF6` (Purple)
- Secondary: `#667eea` (Blue)
- Background: `#f8fafc` (Light gray)
- Text: `#333` (Dark gray)

### Content Updates

#### Text Content

Replace all "Lorem ipsum" text with your actual content:

- Hero section introduction
- About Justyna section
- Class descriptions
- FAQ questions and answers
- Contact information

#### Contact Information

Update the following in `index.html`:

- Email: `justyna@suzukiteaching.com`
- Phone: `+1 (555) 123-4567`
- Address: `123 Music Street, Downtown`

#### Social Media Links

Update the Facebook and Instagram links in the footer:

```html
<a href="YOUR_FACEBOOK_URL" class="social-link"
  ><i class="fab fa-facebook"></i
></a>
<a href="YOUR_INSTAGRAM_URL" class="social-link"
  ><i class="fab fa-instagram"></i
></a>
```

#### Class Information

Update the class details in the Classes section:

- Class names and levels
- Schedule (days and times)
- Location
- Descriptions

### Images

- Replace `logo.png` with your actual logo
- Add additional images as needed
- Optimize images for web (recommended size: under 500KB)

### Form Functionality

The contact form currently shows a success message. To make it functional:

1. Set up a backend service (e.g., Netlify Forms, Formspree)
2. Update the form action and method in `index.html`
3. Or integrate with your preferred email service

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Performance

- Optimized images
- Minified CSS and JS (recommended for production)
- Fast loading times
- Mobile-optimized

## Deployment

You can deploy this website to:

- GitHub Pages
- Netlify
- Vercel
- Any web hosting service

## Maintenance

- Keep content updated
- Test on different devices regularly
- Monitor form submissions
- Update social media links as needed

## Credits

- Font: Inter (Google Fonts)
- Icons: Font Awesome
- Design: Custom responsive design

---

For any questions or customizations, feel free to modify the code according to your needs!
