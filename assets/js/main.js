
(() => {
  // --- Settings you should update ---
  const WHATSAPP_NUMBER = "+27000000000"; // TODO: replace with your real number e.g. +27821234567
  const WHATSAPP_MESSAGE = "Hi RCBF Signs, I need signage. Can you help?";

  // Build a WhatsApp deep link
  function waLink() {
    const digits = (WHATSAPP_NUMBER || "").replace(/[^\d]/g, "");
    const msg = encodeURIComponent(WHATSAPP_MESSAGE || "");
    return `https://wa.me/${digits}?text=${msg}`;
  }

  // Set year in footer
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Apply WhatsApp links
  document.querySelectorAll("[data-whatsapp-link]").forEach(a => {
    a.setAttribute("href", waLink());
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
  });

  // Active nav link
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".navbar .nav-link").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("active");
  });

  // Smooth scroll for local anchors (optional)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", id);
    });
  });
})();
