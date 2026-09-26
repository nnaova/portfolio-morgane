Portfolio source snapshot — tray-memory-22006462.figma.site
Downloaded on 2026-09-26T07:43:45.506Z

WHAT THIS IS
- index.html: the HTML shell served by Figma Sites (mostly empty divs + script tags)
- _runtimes/: the Figma Sites JS runtime engine that renders the page
- _components/: the compiled JS + CSS bundle for this specific site's components
- _json/: the content/layout data (text, positions, structure) that the runtime reads to build the page
- _assets/: all images used on the site
- _woff/: web fonts (Inter)

IMPORTANT
This is NOT clean, hand-editable HTML/CSS. Figma Sites renders everything
client-side from the runtime + JSON data above, so there is no simple
"page markup" to edit directly in a text editor. To reuse this content,
you have two realistic paths:
1. Open index.html locally in a browser (may not render correctly since it
   depends on Figma's own servers / relative asset paths).
2. Rebuild the layout by hand in plain HTML/CSS using the images and text
   pulled out of the _json/_index.json file as reference — this is usually
   less work than reverse-engineering the runtime.
