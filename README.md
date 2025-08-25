# Justyna Suzuki Website

This repository contains the website for Justyna Suzuki, configured for automatic deployment to Bluehost via GitHub Actions.

## 🚀 Deployment Setup

### 1. GitHub Repository Secrets

You need to set up the following secrets in your GitHub repository:

1. Go to your GitHub repository
2. Click on "Settings" → "Secrets and variables" → "Actions"
3. Add the following repository secrets:

- `FTP_SERVER`: Your Bluehost FTP server (e.g., `yourdomain.com`)
- `FTP_USERNAME`: Your Bluehost FTP username
- `FTP_PASSWORD`: Your Bluehost FTP password

### 2. Automatic Deployment

The website will automatically deploy to Bluehost whenever you push to the `main` branch.

### 3. Manual Deployment

If you need to deploy manually:

```bash
# Run the deployment script
./deploy.sh

# Or manually copy files to public_html folder
cp index.html public_html/
cp styles.css public_html/
cp script.js public_html/
cp logo.svg public_html/
cp *.jpeg public_html/
```

## 📁 Project Structure

```
Justyna_Suzuki/
├── .github/workflows/     # GitHub Actions deployment workflow
├── public_html/           # Files that get deployed to Bluehost
├── index.html            # Main website file
├── styles.css            # CSS styles
├── script.js             # JavaScript functionality
├── logo.svg              # Logo file
├── *.jpeg                # Image files
├── deploy.sh             # Deployment script
└── README.md             # This file
```

## 🔧 Workflow Details

The GitHub Actions workflow:

1. Triggers on push to `main` branch
2. Sets up Node.js environment
3. Installs dependencies (if any)
4. Builds the project (if needed)
5. Deploys to Bluehost via FTP
6. Excludes unnecessary files (.git, node_modules, .DS_Store)

## 📝 Notes

- The `public_html/` folder contains only the files needed for the website
- Source files remain in the root directory for development
- All deployments go through the `main` branch
- FTP credentials are stored securely as GitHub secrets

# Test deployment
