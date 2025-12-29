// Studio Apposite — shared JS
// Keep this file in /assets/site.js

// Set year wherever #y exists
(function(){
  const y = document.getElementById("y");
  if (y) y.textContent = new Date().getFullYear();
})();

// Animate dashed rules on first view
(function(){
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ruleEls = Array.from(document.querySelectorAll(".rule"));
  if (!ruleEls.length) return;

  if (prefersReduced || !("IntersectionObserver" in window)) {
    ruleEls.forEach(el => { el.style.transform = "scaleX(1)"; });
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.style.transform = "scaleX(1)";
      io.unobserve(el);
    });
  }, { root: null, rootMargin: "0px 0px -12% 0px", threshold: 0.01 });

  ruleEls.forEach(el => io.observe(el));
})();
