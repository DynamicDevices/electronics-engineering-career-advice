# Deployment Guide

## Automatic Deployment

This project uses GitHub Actions to automatically deploy to GitHub Pages when changes are pushed to the main branch.

### How it works:

1. **Push to main branch** - Any commit to `main` or `master` triggers the deployment
2. **Automatic validation** - The workflow validates HTML structure and file organization
3. **Deploy to gh-pages** - Files are automatically deployed to the `gh-pages` branch
4. **GitHub Pages serves** - GitHub Pages serves the site from the `gh-pages` branch

### Setup Instructions:

1. **Enable GitHub Pages:**
   - Go to your repository Settings
   - Scroll down to "Pages" section
   - Under "Source", select "Deploy from a branch"
   - Choose "gh-pages" branch and "/ (root)" folder
   - Click "Save"

2. **Your site will be live at:**
   - `https://yourusername.github.io/repository-name`

### File Structure:

```
electronics-career-guide/
├── index.html              # Main website file
├── css/
│   └── styles.css         # Modern CSS styling
├── js/
│   └── script.js          # Interactive JavaScript
├── README.md              # Comprehensive career guide
├── CONTEXT.md             # Project context and usage guide
├── LICENSE                # Creative Commons license
├── .github/workflows/
│   └── deploy.yml         # Automatic deployment workflow
└── DEPLOYMENT.md          # This deployment guide
```

### Manual Deployment (if needed):

If you need to deploy manually:

1. **Create gh-pages branch:**
   ```bash
   git checkout --orphan gh-pages
   git add .
   git commit -m "Initial deployment"
   git push origin gh-pages
   ```

2. **Configure GitHub Pages:**
   - Go to repository Settings → Pages
   - Select "gh-pages" branch as source
   - Save settings

### Troubleshooting:

- **Site not updating:** Check the Actions tab in your repository for deployment status
- **Build errors:** Review the workflow logs in the Actions tab
- **File not found errors:** Ensure all files are in the correct locations (css/, js/, etc.)

### Copyright and License:

**Copyright © 2025 Dynamic Devices Ltd**  
**Licensed under Creative Commons Attribution-NonCommercial 4.0 International License**

This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License. To view a copy of this license, visit: https://creativecommons.org/licenses/by-nc/4.0/ 