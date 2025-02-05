const mix = require('laravel-mix');

mix
  .js('src/app.js', 'app.js') // Output JS directly to public
  .sass('src/style.scss', 'style.css') // Output CSS directly to public
  .copy('src/index.html', 'index.html') // Copy HTML directly to public
  .options({
    processCssUrls: false, // Avoid processing CSS URLs
  });
