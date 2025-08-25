#!/bin/bash

# Production Deployment Script for Justyna Suzuki Website
# This script helps deploy the website to a production server with Node.js support

echo "🚀 Starting production deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are available"

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create data directory if it doesn't exist
echo "📁 Setting up data directory..."
mkdir -p data

# Set proper permissions
chmod 755 data
chmod 644 data/*.json 2>/dev/null || true

echo "✅ Data directory configured"

# Create PM2 ecosystem file for production
echo "⚙️ Creating PM2 configuration..."
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'justyna-suzuki-website',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
EOF

echo "✅ PM2 configuration created"

# Instructions for the user
echo ""
echo "🎉 Deployment preparation completed!"
echo ""
echo "📋 Next steps:"
echo "1. Upload all files to your production server"
echo "2. SSH into your server and navigate to the project directory"
echo "3. Install PM2 globally: npm install -g pm2"
echo "4. Start the application: pm2 start ecosystem.config.js"
echo "5. Save PM2 configuration: pm2 save"
echo "6. Set up PM2 to start on boot: pm2 startup"
echo ""
echo "🌐 Your website will be available on the configured port (default: 3000)"
echo "📊 Monitor with: pm2 status"
echo "📝 View logs with: pm2 logs"
echo ""
echo "🔧 For development, use: npm run dev"
echo "🚀 For production, use: pm2 start ecosystem.config.js"
