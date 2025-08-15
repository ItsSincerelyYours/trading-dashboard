#!/bin/bash

# This script will push to GitHub and guide you through Vercel deployment

echo "🚀 Quick Deploy Script for Trading Dashboard"
echo "==========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in the trading-dashboard directory"
    echo "Please run this from /Users/chrisblackwell/trading-dashboard"
    exit 1
fi

# Set up git remote
echo "📦 Setting up GitHub remote..."
git remote remove origin 2>/dev/null
git remote add origin https://github.com/ItsSincerelyYours/trading-dashboard.git

# Attempt to push
echo ""
echo "📤 Pushing to GitHub..."
echo "Note: You'll need to enter your GitHub credentials"
echo "Username: ItsSincerelyYours"
echo "Password: Use a Personal Access Token (not your regular password)"
echo ""
echo "To create a token: https://github.com/settings/tokens/new"
echo "Required permission: 'repo' (Full control of private repositories)"
echo ""
echo "Pushing now..."
echo "----------------------------------------"

git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🎯 Your code is now at: https://github.com/ItsSincerelyYours/trading-dashboard"
    echo ""
    echo "📌 FINAL STEP - Deploy to Vercel (takes 2 minutes):"
    echo "===================================================="
    echo ""
    echo "1. Open this link: https://vercel.com/new/import?s=https://github.com/ItsSincerelyYours/trading-dashboard"
    echo ""
    echo "2. Click 'Import' (Vercel will auto-detect Next.js)"
    echo ""
    echo "3. Click 'Deploy'"
    echo ""
    echo "4. Wait 2 minutes... and you're LIVE! 🎉"
    echo ""
    echo "Your app will be available at something like:"
    echo "https://trading-dashboard-[your-vercel-username].vercel.app"
else
    echo ""
    echo "❌ Push failed - likely an authentication issue"
    echo ""
    echo "Quick fix:"
    echo "1. Go to: https://github.com/settings/tokens/new"
    echo "2. Create a token with 'repo' permission"
    echo "3. Run: git push -u origin main"
    echo "4. Use your token as the password"
fi