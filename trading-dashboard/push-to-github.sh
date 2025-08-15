#!/bin/bash

echo "🚀 Pushing Trading Dashboard to GitHub..."

# Set the remote (in case it's not set)
git remote remove origin 2>/dev/null
git remote add origin https://github.com/ItsSincerelyYours/trading-dashboard.git

# Push to GitHub
echo "📦 Pushing code to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo "🔗 Repository: https://github.com/ItsSincerelyYours/trading-dashboard"
    echo ""
    echo "📌 Next Steps:"
    echo "1. Go to https://vercel.com/new"
    echo "2. Import your GitHub repository: ItsSincerelyYours/trading-dashboard"
    echo "3. Click 'Deploy' (Vercel will auto-detect Next.js)"
    echo "4. Your app will be live in ~2 minutes!"
else
    echo "❌ Push failed. You may need to authenticate with GitHub."
    echo ""
    echo "Try this command manually:"
    echo "git push -u origin main"
    echo ""
    echo "If it asks for authentication:"
    echo "- Username: Your GitHub username"
    echo "- Password: Your GitHub Personal Access Token (not your password)"
    echo ""
    echo "To create a token: GitHub Settings → Developer settings → Personal access tokens"
fi