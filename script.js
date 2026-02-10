(function(){
  // aktifkan highlight menu
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".menu a").forEach(a=>{
    const href = (a.getAttribute("href")||"").toLowerCase();
    if(href === path) a.classList.add("active");
  });

  // Lightbox (hanya berjalan jika ada galeri)
  const galleryImgs = document.querySelectorAll("[data-gallery='true']");
  const lb = document.getElementById("lightbox");
  if(!lb || galleryImgs.length === 0) return;

  const lbImg = document.getElementById("lbImg");
  const lbCaption = document.getElementById("lbCaption");
  const lbTitle = document.getElementById("lbTitle");
  const btnClose = document.getElementById("lbClose");
  const btnNext = document.getElementById("lbNext");
  const btnPrev = document.getElementById("lbPrev");

  let idx = 0;

  function openAt(i){
    idx = (i + galleryImgs.length) % galleryImgs.length;
    const el = galleryImgs[idx];
    const src = el.getAttribute("data-full") || el.getAttribute("src");
    const cap = el.getAttribute("data-caption") || el.getAttribute("alt") || "Foto galeri";
    lbImg.src = src;
    lbImg.alt = cap;
    lbCaption.textContent = cap;
    lbTitle.textContent = `Foto ${idx+1} / ${galleryImgs.length}`;
    lb.classList.add("open");
    document.documentElement.style.overflow = "hidden";
  }

  function close(){
    lb.classList.remove("open");
    lbImg.src = "";
    document.documentElement.style.overflow = "";
  }

  galleryImgs.forEach((el,i)=>{
    el.style.cursor = "zoom-in";
    el.addEventListener("click", ()=>openAt(i));
    el.addEventListener("keydown", (e)=>{
      if(e.key === "Enter") openAt(i);
    });
    el.setAttribute("tabindex","0");
  });

  btnClose.addEventListener("click", close);
  btnNext.addEventListener("click", ()=>openAt(idx+1));
  btnPrev.addEventListener("click", ()=>openAt(idx-1));
  lb.addEventListener("click", (e)=>{ if(e.target === lb) close(); });

  document.addEventListener("keydown", (e)=>{
    if(!lb.classList.contains("open")) return;
    if(e.key === "Escape") close();
    if(e.key === "ArrowRight") openAt(idx+1);
    if(e.key === "ArrowLeft") openAt(idx-1);
  });
})();
