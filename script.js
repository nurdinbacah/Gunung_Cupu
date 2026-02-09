// Tahun otomatis
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav
const navBtn = document.getElementById("navBtn");
const nav = document.getElementById("nav");

navBtn?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  navBtn.setAttribute("aria-expanded", open ? "true" : "false");
});

// Tutup menu saat klik link (mobile)
document.querySelectorAll('#nav a[href^="#"]').forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});

// Copy link
const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1400);
}

copyBtn?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    showToast("Link tersalin ✅");
  } catch (e) {
    showToast("Gagal salin — salin manual dari address bar");
  }// === LIGHTBOX GALERI ===
document.querySelectorAll('.gallery-grid img').forEach(img => {
  img.addEventListener('click', () => {
    const lightbox = document.getElementById('lightbox');
    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox-caption').innerText =
      img.nextElementSibling.innerText;
    lightbox.classList.add('show');
  });
});

document.getElementById('lightbox').addEventListener('click', () => {
  document.getElementById('lightbox').classList.remove('show');
});// =====================
// LIGHTBOX GALERI
// =====================
(() => {
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbCaption = document.getElementById("lbCaption");
  const lbClose = document.getElementById("lbClose");

  if (!lightbox || !lbImg || !lbCaption) return;

  const open = (imgEl) => {
    lbImg.src = imgEl.src;
    lbImg.alt = imgEl.alt || "";
    lbCaption.textContent = imgEl.dataset.caption || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lbImg.src = "";
  };

  document.querySelectorAll(".gallery-item img").forEach((img) => {
    img.addEventListener("click", () => open(img));
  });

  lbClose?.addEventListener("click", close);

  // klik area gelap untuk tutup
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  // ESC untuk tutup
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) close();
  });
})();
});
