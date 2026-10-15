// Theme toggle (remembers the choice per browser)
(function () {
  const root = document.documentElement;
  const btn = document.querySelector(".theme-toggle");
  const isDark = () =>
    root.dataset.theme ? root.dataset.theme === "dark"
                       : matchMedia("(prefers-color-scheme: dark)").matches;
  btn.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();

// Highlight the nav link of the section in view
(function () {
  const links = [...document.querySelectorAll(".nav a")];
  const byId = new Map(links.map(a => [a.getAttribute("href").slice(1), a]));
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => a.classList.remove("active"));
      const a = byId.get(e.target.id);
      if (a) a.classList.add("active");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  byId.forEach((_, id) => { const s = document.getElementById(id); if (s) obs.observe(s); });
})();

document.getElementById("year").textContent = new Date().getFullYear();

// Build mailto links at runtime so the address isn't sitting in the HTML for scrapers
document.querySelectorAll(".js-mail").forEach(a => {
  a.href = "mailto:" + a.dataset.u + "@" + a.dataset.d;
});
