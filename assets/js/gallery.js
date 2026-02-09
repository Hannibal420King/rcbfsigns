
(() => {
  // Simple lightbox using Bootstrap modal
  const modalEl = document.getElementById("lightboxModal");
  if (!modalEl) return;

  const imgEl = modalEl.querySelector("[data-lightbox-img]");
  const titleEl = modalEl.querySelector("[data-lightbox-title]");

  document.querySelectorAll("[data-gallery-item]").forEach(item => {
    item.addEventListener("click", () => {
      const src = item.getAttribute("data-src");
      const title = item.getAttribute("data-title") || "RCBF Signs – Project";
      if (imgEl) imgEl.setAttribute("src", src);
      if (titleEl) titleEl.textContent = title;
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    });
  });
})();
