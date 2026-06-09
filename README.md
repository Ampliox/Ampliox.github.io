# andressamper.com

Personal website of **Andres Samper** — Offensive Security Consultant & penetration tester.

Static site (HTML / CSS / vanilla JS), no build step, served via GitHub Pages at
[andressamper.com](https://andressamper.com).

## Structure

```
index.html              # single-page portfolio
404.html                # custom not-found page
assets/css/style.css    # all styling — "Phosphor" dark/terminal theme
assets/js/main.js       # terminal animation, scroll reveals, nav state
assets/Andres_Samper_Resume.pdf
CNAME                   # andressamper.com
.nojekyll               # serve files as-is (no Jekyll processing)
```

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Design language: near-black canvas, cosmic-orange phosphor accent, Bricolage
Grotesque display / Hanken Grotesk body / JetBrains Mono technical type.
Inspired by the substance of academic researcher pages and the cinematic polish
of premium product sites.
