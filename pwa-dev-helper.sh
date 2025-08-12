#!/bin/bash

# PWA Development Helper Script
# This script helps with testing PWA updates during development

echo "🎵 DJ Maitre Sam PWA Development Helper"
echo "======================================"

# Function to serve the app locally
serve_app() {
    echo "🚀 Starting local server..."
    echo "📱 Open http://localhost:8000 in your browser"
    echo "💡 Install the PWA and test updates"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    
    # Try different methods to serve the app
    if command -v python3 &> /dev/null; then
        echo "Using Python 3 HTTP server..."
        python3 -m http.server 8000
    elif command -v python &> /dev/null; then
        echo "Using Python HTTP server..."
        python -m SimpleHTTPServer 8000
    elif command -v npx &> /dev/null; then
        echo "Using Node.js HTTP server..."
        npx http-server -p 8000
    else
        echo "❌ No suitable HTTP server found."
        echo "Please install Python or Node.js to serve the app locally."
        exit 1
    fi
}

# Function to clear PWA cache
clear_cache() {
    echo "🧹 PWA Cache Clearing Instructions:"
    echo ""
    echo "To clear PWA cache in browsers:"
    echo ""
    echo "Chrome/Edge:"
    echo "1. Open DevTools (F12)"
    echo "2. Go to Application tab"
    echo "3. Click 'Storage' in left sidebar"
    echo "4. Click 'Clear site data'"
    echo ""
    echo "Or use the 'Force Update' button in the app (localhost only)"
}

# Function to test PWA features
test_pwa() {
    echo "🧪 PWA Testing Checklist:"
    echo ""
    echo "✅ Basic Tests:"
    echo "1. Install the app (look for install button)"
    echo "2. Test offline functionality (disconnect internet)"
    echo "3. Test touch gestures (swipe in gallery)"
    echo "4. Test keyboard shortcuts (spacebar, arrows)"
    echo ""
    echo "✅ Update Tests:"
    echo "1. Make changes to files"
    echo "2. Refresh browser - should see update notification"
    echo "3. Click update notification"
    echo "4. Verify changes appear"
    echo ""
    echo "✅ Performance Tests:"
    echo "1. Run Lighthouse audit in DevTools"
    echo "2. Check PWA score"
    echo "3. Test on mobile device"
}

# Function to update service worker version
update_version() {
    echo "🔄 Updating service worker version..."
    
    # Get current version from sw.js
    current_version=$(grep "CACHE_NAME = 'djsam-player-v" sw.js | sed 's/.*v\([0-9]*\).*/\1/')
    
    if [ -z "$current_version" ]; then
        echo "❌ Could not find current version in sw.js"
        exit 1
    fi
    
    new_version=$((current_version + 1))
    
    # Update version in sw.js
    sed -i.bak "s/djsam-player-v${current_version}/djsam-player-v${new_version}/g" sw.js
    
    echo "✅ Updated service worker version from v${current_version} to v${new_version}"
    echo "🔄 This will force cache refresh when users reload the app"
    
    # Clean up backup file
    rm -f sw.js.bak
}

# Main menu
echo "Choose an option:"
echo "1. Serve app locally (recommended)"
echo "2. Clear cache instructions"
echo "3. PWA testing checklist"
echo "4. Update service worker version"
echo "5. Exit"
echo ""
read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        serve_app
        ;;
    2)
        clear_cache
        ;;
    3)
        test_pwa
        ;;
    4)
        update_version
        ;;
    5)
        echo "👋 Happy PWA development!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac
