// Studio Apposite — shared behavior
(function(){
  // Year stamp (supports multiple instances safely)
  const ys = document.querySelectorAll("#y");
  const year = String(new Date().getFullYear());
  ys.forEach(el => { el.textContent = year; });

  // Animate dashed rules on first view
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ruleEls = Array.from(document.querySelectorAll(".rule"));

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
