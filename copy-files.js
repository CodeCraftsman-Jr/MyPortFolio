import fs from 'fs';
import path from 'path';

// Copy CNAME file
if (fs.existsSync('CNAME')) {
  fs.copyFileSync('CNAME', path.join('dist', 'CNAME'));
  console.log('✓ CNAME copied to dist');
}

// Copy 404.html file
if (fs.existsSync(path.join('public', '404.html'))) {
  fs.copyFileSync(path.join('public', '404.html'), path.join('dist', '404.html'));
  console.log('✓ 404.html copied to dist');
}

// Copy .nojekyll file (essential for GitHub Pages)
if (fs.existsSync(path.join('public', '.nojekyll'))) {
  fs.copyFileSync(path.join('public', '.nojekyll'), path.join('dist', '.nojekyll'));
  console.log('✓ .nojekyll copied to dist');
} else {
  // Create .nojekyll if it doesn't exist
  fs.writeFileSync(path.join('dist', '.nojekyll'), '');
  console.log('✓ .nojekyll created in dist');
}

// Copy .htaccess file
if (fs.existsSync(path.join('public', '.htaccess'))) {
  fs.copyFileSync(path.join('public', '.htaccess'), path.join('dist', '.htaccess'));
  console.log('✓ .htaccess copied to dist');
}

// Copy web.config file for IIS/GitHub Pages MIME type support
if (fs.existsSync(path.join('public', 'web.config'))) {
  fs.copyFileSync(path.join('public', 'web.config'), path.join('dist', 'web.config'));
  console.log('✓ web.config copied to dist');
}

// Note: _headers file removed as GitHub Pages doesn't support it
// GitHub Pages determines MIME types based on file extensions
