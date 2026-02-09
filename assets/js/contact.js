
(() => {
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("contactStatus");
  if (!form) return;

  // Option A (recommended if you don't have a backend): Formspree (or similar)
  // 1) create a form endpoint at https://formspree.io/ then paste below
  const FORMSPREE_ENDPOINT = ""; // e.g. https://formspree.io/f/xxxxxxx

  // Option B (custom backend): set your endpoint here
  const API_ENDPOINT = ""; // e.g. https://api.rcbfsigns.co.za/contact

  function setStatus(ok, msg) {
    if (!statusEl) return;
    statusEl.className = "alert " + (ok ? "alert-success" : "alert-danger");
    statusEl.textContent = msg;
    statusEl.classList.remove("d-none");
  }

  async function send(payload) {
    const endpoint = FORMSPREE_ENDPOINT || API_ENDPOINT;
    if (!endpoint) {
      // Fallback: mailto
      const subject = encodeURIComponent(`Website enquiry: ${payload.subject || "Signage quote"}`);
      const body = encodeURIComponent(
        `Name: ${payload.name}\nEmail: ${payload.email}\nPhone: ${payload.phone}\n\nMessage:\n${payload.message}\n\nPreferred contact: ${payload.preferredContact}`
      );
      window.location.href = `mailto:hello@rcbfsigns.co.za?subject=${subject}&body=${body}`;
      return { ok: true, via: "mailto" };
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(txt || `Request failed (${res.status})`);
    }
    return { ok: true, via: "http" };
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const payload = {
      name: (data.get("name") || "").toString().trim(),
      email: (data.get("email") || "").toString().trim(),
      phone: (data.get("phone") || "").toString().trim(),
      subject: (data.get("subject") || "").toString().trim(),
      preferredContact: (data.get("preferredContact") || "WhatsApp").toString(),
      message: (data.get("message") || "").toString().trim(),
      website: window.location.href,
      ts: new Date().toISOString(),
    };

    if (!payload.name || !payload.message || (!payload.email && !payload.phone)) {
      setStatus(false, "Please enter your name, a message, and at least an email or phone number.");
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const old = btn ? btn.innerHTML : "";
    if (btn) { btn.disabled = true; btn.innerHTML = "Sending…"; }

    try {
      await send(payload);
      setStatus(true, "Thanks! We received your message and will get back to you.");
      form.reset();
    } catch (err) {
      setStatus(false, "Sorry — something went wrong sending your message. Please try WhatsApp instead.");
      console.error(err);
    } finally {
      if (btn) { btn.disabled = false; btn.innerHTML = old; }
    }
  });
})();
