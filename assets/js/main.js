/* =====================================================================
   ANDRES SAMPER — interactions
   ===================================================================== */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Nav scroll state ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Scroll reveals ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => {
      if (!el.classList.contains("in")) io.observe(el);
    });
  }

  /* ---------- Statement: light words on scroll ---------- */
  const stmt = document.querySelector("[data-statement]");
  if (stmt) {
    const text = stmt.textContent.trim();
    const hot = new Set(["defending", "offensive"]);
    stmt.innerHTML = text
      .split(/(\s+)/)
      .map((tok) => {
        if (!tok.trim()) return tok;
        const clean = tok.toLowerCase().replace(/[^a-z]/g, "");
        const cls = hot.has(clean) ? "word hl" : "word";
        return `<span class="${cls}">${tok}</span>`;
      })
      .join("");
    const words = stmt.querySelectorAll(".word:not(.hl)");
    if (reduce) {
      words.forEach((w) => w.classList.add("lit"));
    } else {
      const sio = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const ws = e.target.querySelectorAll(".word:not(.hl)");
              ws.forEach((w, i) => setTimeout(() => w.classList.add("lit"), i * 45));
              sio.unobserve(e.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      sio.observe(stmt);
    }
  }

  /* ---------- Hero terminal typing ---------- */
  const term = document.getElementById("term");
  if (term) {
    const lines = [
      { t: 'whoami', kind: "cmd" },
      { t: "andres samper — offensive security consultant", kind: "out" },
      { t: "cat ./focus.txt", kind: "cmd" },
      { t: "full-scope penetration testing · red teaming", kind: "out" },
      { t: "ls ./certifications", kind: "cmd" },
      { t: "OSCP   CPTS   PIPA   Security+   InsightVM", kind: "out" },
    ];

    const render = (done, partial, showCursor) => {
      let html = "";
      done.forEach((l) => {
        html += lineHTML(l.kind, l.t);
      });
      if (partial) html += lineHTML(partial.kind, partial.t, false);
      if (showCursor) html += '<span class="cursor"></span>';
      term.innerHTML = html;
    };

    const lineHTML = (kind, text, nl = true) => {
      if (kind === "cmd")
        return `<div><span class="prompt">➜</span> <span class="path">~</span> ${esc(text)}</div>`;
      if (kind === "ok")
        return `<div class="out" style="color:var(--ok)">${esc(text)}</div>`;
      return `<div class="out">${esc(text)}</div>`;
    };

    const esc = (s) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    if (reduce) {
      render(lines, null, false);
      return;
    }

    let li = 0;
    const done = [];
    const typeLine = () => {
      if (li >= lines.length) {
        render(done, null, true);
        return;
      }
      const line = lines[li];
      if (line.kind !== "cmd") {
        // print output instantly after a beat
        done.push(line);
        render(done, null, true);
        li++;
        setTimeout(typeLine, 520);
        return;
      }
      let ci = 0;
      const tick = () => {
        const partial = { kind: line.kind, t: line.t.slice(0, ci) };
        render(done, partial, true);
        ci++;
        if (ci <= line.t.length) {
          setTimeout(tick, 38 + Math.random() * 45);
        } else {
          done.push(line);
          li++;
          setTimeout(typeLine, 360);
        }
      };
      tick();
    };
    setTimeout(typeLine, 650);
  }

  /* ---------- Smooth anchor offset for fixed nav ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id === "#" || id === "#top") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
    });
  });
})();
