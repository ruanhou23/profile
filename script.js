// Ken | profile scripts

const projects = [
  {
    name: "Muse AI Batch Studio",
    category: "video",
    desc: "Tool làm video AI hàng loạt: nhập ý tưởng, tự chia cảnh, viết prompt, render clip và lồng tiếng clone giọng mình.",
    tags: ["Python", "Flask", "Muse AI"],
    link: "#projects"
  },
  {
    name: "Game Beta Test",
    category: "game",
    desc: "Game sinh tồn người que: Max làm nhân vật chính, vẽ bằng code trên canvas 2D, vòng buôn vàng 2 thế giới, đêm trăng máu.",
    tags: ["JavaScript", "Canvas 2D"],
    link: "#projects"
  },
  {
    name: "Chibi Explainer Videos",
    category: "video",
    desc: "Video giải thích 1 phút dọc: phong cách chibi khóa cứng, 1 cảnh = 1 hành động = 1 cảm xúc, thoại tiếng Việt.",
    tags: ["AI Video", "Chibi", "9:16"],
    link: "#projects"
  },
  {
    name: "Bức thư lúc nửa đêm",
    category: "video",
    desc: "Phim ngắn Gothic 1 phút, 6 cảnh x 10 giây: phong cách paparazzi rapid cuts, ASMR, nhân vật nữ Gothic.",
    tags: ["Gothic", "AI Video", "16:9"],
    link: "#projects"
  }
];

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  grid.innerHTML = projects.map(function (p) {
    return '<article class="project-card" data-category="' + p.category + '">'
      + '<h3>' + p.name + '</h3>'
      + '<p>' + p.desc + '</p>'
      + '<p class="tags">' + p.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</p>'
      + '<a class="project-link" href="' + p.link + '" target="_blank" rel="noopener">Xem thêm →</a>'
      + '</article>';
  }).join('');
}

renderProjects();

// Lọc dự án theo nhóm + tìm kiếm theo tên/mô tả
let projectFilter = "all";
let projectQuery = "";
function applyProjectFilter() {
  document.querySelectorAll(".project-card").forEach(function (card) {
    const okCat = projectFilter === "all" || card.getAttribute("data-category") === projectFilter;
    const text = (card.textContent || "").toLowerCase();
    const okQuery = !projectQuery || text.indexOf(projectQuery) !== -1;
    card.style.display = okCat && okQuery ? "" : "none";
  });
}
const projectFilters = document.getElementById("project-filters");
if (projectFilters) {
  projectFilters.addEventListener("click", function (e) {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    projectFilters.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("active"); });
    btn.classList.add("active");
    projectFilter = btn.getAttribute("data-filter");
    applyProjectFilter();
  });
}
const projectSearch = document.getElementById("project-search");
if (projectSearch) {
  projectSearch.addEventListener("input", function () {
    projectQuery = projectSearch.value.trim().toLowerCase();
    applyProjectFilter();
  });
}

// Typing effect in hero
const typingLines = [
  "Lập trình viên.",
  "Làm video AI.",
  "Fan anime.",
  "Dùng Linux Mint.",
  "Kể chuyện bằng chibi."
];
const typingEl = document.getElementById("typing");
if (typingEl) {
  let line = 0, char = 0, deleting = false;
  function tick() {
    const current = typingLines[line];
    typingEl.textContent = current.slice(0, char);
    let delay = 90;
    if (!deleting && char === current.length) { delay = 1600; deleting = true; }
    else if (deleting && char === 0) { deleting = false; line = (line + 1) % typingLines.length; delay = 400; }
    else if (deleting) { char--; delay = 35; }
    else { char++; }
    setTimeout(tick, delay);
  }
  tick();
}

// Scroll reveal: hiện dần các mục khi cuộn tới
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(function (el) { revealObserver.observe(el); });

// Skill bars: chạy tới % khi cuộn tới
const bars = document.querySelectorAll(".bar i");
const barObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.width = el.getAttribute("data-w") + "%";
      barObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });
bars.forEach(function (el) { barObserver.observe(el); });

// Nhạc yêu thích: 6 bài, bấm thẻ để phát trong khung player
const tracks = [
  { title: "Nan Khước", artist: "Bình Sinh Bất Vãn", id: "euMLGsZxCPU" },
  { title: "Tỳ Bà Khúc", artist: "Lan Âm Reine", id: "oByCpSJKhjM" },
  { title: "Du Sơn Luyến (Remix)", artist: "Hải Luân", id: "uNhVovkgvnY" },
  { title: "Quan Sơn Tửu", artist: "Đẳng Thập Yêu Quân", id: "M6KC0C4aWbA" },
  { title: "Thập Niên Nhân Gian", artist: "Lý Thường Siêu", id: "9O_qeWoOKSA" },
  { title: "Tứ Ngã", artist: "Nhất Chỉ Bạch Dương", id: "WQDgDHIrzUI" }
];
let currentTrack = -1;

function renderMusic() {
  const grid = document.getElementById("music-grid");
  if (!grid) return;
  grid.innerHTML = tracks.map(function (t, i) {
    return '<article class="music-card" data-i="' + i + '" tabindex="0" role="button" aria-label="Phát ' + t.title + '">'
      + '<span class="music-num">' + (i + 1) + '</span>'
      + '<div class="music-info"><h3>' + t.title + '</h3><p>' + t.artist + '</p></div>'
      + '<span class="music-play" aria-hidden="true">▶</span>'
      + '<span class="music-badge">Đang phát</span>'
      + '<span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>'
      + '</article>';
  }).join('');
  grid.querySelectorAll(".music-card").forEach(function (card) {
    card.addEventListener("click", function () { playTrack(parseInt(card.getAttribute("data-i"), 10)); });
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); playTrack(parseInt(card.getAttribute("data-i"), 10)); }
    });
  });
}

function playTrack(i) {
  currentTrack = (i + tracks.length) % tracks.length;
  const t = tracks[currentTrack];
  const player = document.getElementById("player");
  if (player) {
    player.innerHTML = '<iframe src="https://www.youtube.com/embed/' + t.id + '?autoplay=1&rel=0" title="' + t.title + ' — ' + t.artist + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  }
  const now = document.getElementById("now-playing");
  if (now) now.textContent = "Đang phát: " + t.title + " — " + t.artist;
  document.querySelectorAll(".music-card").forEach(function (card, idx) {
    card.classList.toggle("active", idx === currentTrack);
  });
}

const prevBtn = document.getElementById("prev-track");
if (prevBtn) prevBtn.addEventListener("click", function () { playTrack(currentTrack < 0 ? tracks.length - 1 : currentTrack - 1); });
const nextBtn = document.getElementById("next-track");
if (nextBtn) nextBtn.addEventListener("click", function () { playTrack(currentTrack < 0 ? 0 : currentTrack + 1); });

renderMusic();

// Starfield: nền sao nhấp nháy (~120 sao, tôn trọng prefers-reduced-motion)
(function () {
  const canvas = document.getElementById("stars");
  if (!canvas || !canvas.getContext) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ctx = canvas.getContext("2d");
  const COUNT = 120;
  let stars = [], w = 0, h = 0;
  function makeStar() {
    return { x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.4 + 0.4, p: Math.random() * Math.PI * 2, s: 0.008 + Math.random() * 0.02 };
  }
  function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < COUNT; i++) stars.push(makeStar());
  }
  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < stars.length; i++) {
      const st = stars[i];
      st.p += st.s;
      const a = 0.35 + 0.65 * Math.abs(Math.sin(st.p));
      ctx.globalAlpha = a;
      ctx.fillStyle = i % 5 === 0 ? "#00e5ff" : (i % 7 === 0 ? "#ff2d78" : "#ffffff");
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(tick);
  }
  window.addEventListener("resize", init);
  init();
  requestAnimationFrame(tick);
})();

// Chuyển giao diện sáng/tối (lưu vào localStorage, mặc định tối)
const themeBtn = document.getElementById("theme-toggle");
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try { localStorage.setItem("theme", theme); } catch (e) {}
  if (themeBtn) {
    themeBtn.textContent = theme === "light" ? "☾ Tối" : "☀ Sáng";
    themeBtn.setAttribute("aria-label", theme === "light" ? "Chuyển sang giao diện tối" : "Chuyển sang giao diện sáng");
  }
}
if (themeBtn) {
  themeBtn.addEventListener("click", function () {
    const cur = document.documentElement.getAttribute("data-theme") || "dark";
    applyTheme(cur === "light" ? "dark" : "light");
  });
}
let savedTheme = "dark";
try { savedTheme = localStorage.getItem("theme") || "dark"; } catch (e) {}
applyTheme(savedTheme === "light" ? "light" : "dark");

// Thanh tiến trình cuộn + nút về đầu trang (hiện sau 600px)
const progressBar = document.getElementById("progress-bar");
const backToTopBtn = document.getElementById("back-to-top");
function onScrollProgress() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
  if (progressBar) progressBar.style.width = pct + "%";
  if (backToTopBtn) backToTopBtn.classList.toggle("show", doc.scrollTop > 600);
}
window.addEventListener("scroll", onScrollProgress, { passive: true });
onScrollProgress();
if (backToTopBtn) {
  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Con số: đếm tăng dần khi cuộn tới
const statNums = document.querySelectorAll(".stat-num");
const statObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    statObserver.unobserve(el);
    const target = parseInt(el.getAttribute("data-target"), 10) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1200;
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}, { threshold: 0.4 });
statNums.forEach(function (el) { statObserver.observe(el); });

// Lọc anime theo thể loại
const animeFilters = document.getElementById("anime-filters");
if (animeFilters) {
  animeFilters.addEventListener("click", function (e) {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    animeFilters.querySelectorAll(".chip").forEach(function (c) { c.classList.remove("active"); });
    btn.classList.add("active");
    const f = btn.getAttribute("data-filter");
    document.querySelectorAll(".anime-card").forEach(function (card) {
      card.classList.toggle("hidden", f !== "all" && card.getAttribute("data-genre") !== f);
    });
  });
}
