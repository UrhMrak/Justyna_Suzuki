# Suzuki Early Childhood Education Website

A modern, responsive website for Suzuki Early Childhood Education classes, featuring admin functionality for managing class information and calendar data.

## Features

- **Responsive Design**: Mobile-first approach with modern UI/UX
- **Admin Panel**: Secure login system for content management
- **Editable Classes**: Admin can add, edit, and delete class information
- **Calendar Management**: Editable calendar popup for class schedules
- **Server-side Data Persistence**: All editable data is saved to the server
- **Contact Form**: Integrated contact form with EmailJS
- **FAQ Section**: Expandable FAQ with smooth animations

## Admin Features

When logged in, administrators can:

- Edit class titles, dates, times, locations, and descriptions
- Add new classes
- Delete existing classes
- Edit calendar entries for each month
- All changes are automatically saved to the server

## Installation & Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Setup Steps

1. **Clone or download the project files**

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the server**

   ```bash
   npm start
   ```

   For development with auto-restart:

   ```bash
   npm run dev
   ```

4. **Access the website**
   - Open your browser and go to `http://localhost:3000`
   - The server will automatically create the necessary data files

## Admin Login

To access admin features:

1. Click on the logo in the footer
2. Use these credentials:
   - **Username**: `JustynaSuzukiece`
   - **Password**: `qtmc!KetfZT49vG`

## Data Storage

The website now uses a Node.js/Express server to persist data:

- **Classes Data**: Stored in `data/classes.json`
- **Calendar Data**: Stored in `data/calendar.json`
- **Automatic Backup**: Data is automatically saved whenever changes are made

## File Structure

```
Justyna_Suzuki/
├── server.js              # Express server for data persistence
├── package.json           # Node.js dependencies
├── index.html            # Main HTML file
├── styles.css            # CSS styles
├── script.js             # JavaScript functionality
├── data/                 # Data storage directory (auto-created)
│   ├── classes.json     # Classes data
│   └── calendar.json    # Calendar data
└── [image files]         # Various images and assets
```

## API Endpoints

The server provides these REST endpoints:

- `GET /api/classes` - Retrieve all classes
- `POST /api/classes` - Save all classes
- `GET /api/calendar` - Retrieve calendar data
- `POST /api/calendar` - Save calendar data

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Data Storage**: JSON files with automatic persistence
- **Styling**: Custom CSS with responsive design
- **Icons**: Font Awesome
- **Fonts**: Metropolis (Google Fonts)
- **Email**: EmailJS for contact form

## Development

### Making Changes

- Edit `index.html` for structure changes
- Modify `styles.css` for styling updates
- Update `script.js` for functionality changes
- Server changes go in `server.js`

### Data Persistence

- All editable content is automatically saved to the server
- Data is stored in JSON format for easy backup and migration
- The server automatically creates data files if they don't exist

## Deployment

To deploy this website:

1. **Upload all files** to your web server
2. **Install Node.js** on your server
3. **Run `npm install`** to install dependencies
4. **Start the server** with `npm start`
5. **Set up a process manager** (like PM2) for production use

## Security Notes

- Admin credentials are hardcoded in the frontend (consider moving to environment variables for production)
- The server includes CORS support for cross-origin requests
- All data is stored locally on the server

## Support

For technical support or questions about the website functionality, please contact the developer.

---

**Developed by Urh Mrak**  
**For Justyna Bidler - Suzuki Early Childhood Education**
