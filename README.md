# andressamper.com

Personal website of **Andres Samper** — Offensive Security Consultant & penetration tester.

Static site (HTML / CSS / vanilla JS), no build step, served via GitHub Pages at
[andressamper.com](https://andressamper.com).

## Structure

```
index.html               # About (intro + simulated terminal)
experience/index.html    # /experience
certifications/index.html# /certifications
background/index.html    # /background  (Competition & Education)
404.html                 # custom not-found page
assets/css/style.css     # all styling — plain academic theme
assets/js/main.js        # simulated terminal (About page only)
assets/Andres_Samper_Resume.pdf
CNAME                    # andressamper.com
.nojekyll                # serve files as-is (no Jekyll processing)
```

Each section is its own page sharing one top-bar nav and stylesheet.
Links use root-absolute paths so they resolve from any subdirectory.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Design language: a plain, document-style academic page — near-white background,
dark-red (maroon) accents, Lora serif body type, and a small simulated terminal.
Inspired by the minimalist researcher-page aesthetic of nicholas.carlini.com.
