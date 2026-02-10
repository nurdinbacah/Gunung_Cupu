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
// ===== Active nav highlight (berdasarkan nama file) =====
(function(){
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll('a[data-nav]').forEach(a=>{
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("active");
  });
})();

// ===== Gallery Lightbox =====
(function(){
  const items = Array.from(document.querySelectorAll("[data-gallery-item]"));
  if (!items.length) return;

  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbTitle = document.getElementById("lbTitle");
  const lbCaption = document.getElementById("lbCaption");

  const btnClose = document.getElementById("lbClose");
  const btnPrev = document.getElementById("lbPrev");
  const btnNext = document.getElementById("lbNext");

  let idx = 0;

  function openAt(i){
    idx = (i + items.length) % items.length;
    const el = items[idx];
    const src = el.getAttribute("data-full") || el.querySelector("img")?.src;
    const title = el.getAttribute("data-title") || "Foto";
    const cap = el.getAttribute("data-caption") || "";

    lbImg.src = src;
    lbTitle.textContent = title;
    lbCaption.textContent = cap;

    lb.classList.add("open");
    document.documentElement.style.overflow = "hidden";
  }

  function close(){
    lb.classList.remove("open");
    lbImg.src = "";
    document.documentElement.style.overflow = "";
  }

  function next(){ openAt(idx + 1); }
  function prev(){ openAt(idx - 1); }

  items.forEach((el, i)=> el.addEventListener("click", ()=> openAt(i)));
  btnClose?.addEventListener("click", close);
  btnNext?.addEventListener("click", next);
  btnPrev?.addEventListener("click", prev);

  // klik area gelap untuk tutup
  lb?.addEventListener("click", (e)=>{ if (e.target === lb) close(); });

  // keyboard
  window.addEventListener("keydown", (e)=>{
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });
})();
