# RCBF Signs – Custom Static Site (Dark Theme)

This is a custom, no-WordPress static site scaffold for **rcbfsigns.co.za**.

## Pages
- index.html (Home)
- services.html
- gallery.html (with lightbox)
- about.html
- contact.html (contact form + map)
- privacy.html
- 404.html
- robots.txt
- sitemap.xml

## Key settings to update
1) WhatsApp number + message:
- `assets/js/main.js` → `WHATSAPP_NUMBER`, `WHATSAPP_MESSAGE`

2) Contact form delivery
- `assets/js/contact.js`
  - Set `FORMSPREE_ENDPOINT` (recommended, no backend)
  - OR set `API_ENDPOINT` (your custom backend)

3) Google Analytics
- Replace `GA_MEASUREMENT_ID` in each page’s `<head>`.

4) Google Map
- Update the iframe `src` in `contact.html` to your business location.

## Bootstrap + jQuery
Currently loaded via CDN for simplicity. If you want fully offline/self-contained:
- Download `bootstrap.min.css` + `bootstrap.bundle.min.js` into `assets/vendor/bootstrap/`
- Download `jquery.min.js` into `assets/vendor/jquery/`
- Update the `<link>` and `<script>` tags in each page accordingly.

## Gallery
Replace placeholder SVGs in:
- `assets/img/gallery/`

## Deploy
Upload these files to your web host’s public directory.
