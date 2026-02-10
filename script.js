(function () {
  // Active nav based on file name
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("active");
  });

  // Lightbox (only if gallery exists on the page)
  const lb = document.getElementById("lightbox");
  if (!lb) return;

  const lbImg = document.getElementById("lbImg");
  const lbCap = document.getElementById("lbCaption");
  const btnClose = document.getElementById("lbClose");
  const btnNext = document.getElementById("lbNext");
  const btnPrev = document.getElementById("lbPrev");

  const items = Array.from(document.querySelectorAll("[data-full]"));
  let idx = 0;

  function openAt(i) {
    idx = (i + items.length) % items.length;
    const el = items[idx];
    const full = el.getAttribute("data-full");
    const cap = el.getAttribute("data-caption") || el.getAttribute("alt") || "Foto galeri";
    lbImg.src = full;
    lbCap.textContent = cap;
    lb.classList.add("open");
    document.documentElement.style.overflow = "hidden";
  }
  function close() {
    lb.classList.remove("open");
    lbImg.src = "";
    document.documentElement.style.overflow = "";
  }

  items.forEach((el, i) => el.addEventListener("click", () => openAt(i)));

  btnClose && btnClose.addEventListener("click", close);
  btnNext && btnNext.addEventListener("click", () => openAt(idx + 1));
  btnPrev && btnPrev.addEventListener("click", () => openAt(idx - 1));

  lb.addEventListener("click", (e) => {
    if (e.target === lb) close();
  });

  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") openAt(idx + 1);
    if (e.key === "ArrowLeft") openAt(idx - 1);
  });
})();
