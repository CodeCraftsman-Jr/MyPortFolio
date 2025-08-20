const fs = require('fs');
const path = require('path');

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
