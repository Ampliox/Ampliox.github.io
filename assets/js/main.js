/* =====================================================================
   ANDRES SAMPER — minimal interactions
   ===================================================================== */
(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Simulated terminal ---------- */
  const term = document.getElementById("term");
  if (term) {
    const lines = [
      { t: "whoami", kind: "cmd" },
      { t: "andres samper — offensive security consultant", kind: "out" },
      { t: "cat ./focus.txt", kind: "cmd" },
      { t: "full-scope penetration testing · red teaming", kind: "out" },
      { t: "ls ./certifications", kind: "cmd" },
      { t: "OSCP   CPTS   PIPA   Security+   InsightVM", kind: "out" },
    ];

    const esc = (s) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const lineHTML = (kind, text) => {
      if (kind === "cmd")
        return `<div><span class="prompt">$</span> <span class="path">~</span> ${esc(text)}</div>`;
      return `<div class="out">${esc(text)}</div>`;
    };

    const render = (done, partial, showCursor) => {
      let html = done.map((l) => lineHTML(l.kind, l.t)).join("");
      if (partial) html += lineHTML(partial.kind, partial.t);
      if (showCursor) html += '<span class="cursor"></span>';
      term.innerHTML = html;
    };

    if (reduce) {
      render(lines, null, false);
    } else {
      let li = 0;
      const done = [];
      const typeLine = () => {
        if (li >= lines.length) {
          render(done, null, true);
          return;
        }
        const line = lines[li];
        if (line.kind !== "cmd") {
          done.push(line);
          render(done, null, true);
          li++;
          setTimeout(typeLine, 480);
          return;
        }
        let ci = 0;
        const tick = () => {
          render(done, { kind: line.kind, t: line.t.slice(0, ci) }, true);
          ci++;
          if (ci <= line.t.length) {
            setTimeout(tick, 40 + Math.random() * 45);
          } else {
            done.push(line);
            li++;
            setTimeout(typeLine, 340);
          }
        };
        tick();
      };
      setTimeout(typeLine, 600);
    }
  }

  /* ---------- Smooth anchor scrolling with sticky-bar offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id === "#" || id === "#top") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
    });
  });
})();
