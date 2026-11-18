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
  updateNavButtons();
}

let repeatAll = false;

function updateNavButtons() {
  const prev = document.getElementById("prev-track");
  const next = document.getElementById("next-track");
  if (prev) prev.disabled = !repeatAll && currentTrack === 0;
  if (next) next.disabled = !repeatAll && currentTrack === tracks.length - 1;
}

function stepTrack(dir) {
  if (currentTrack < 0) { playTrack(dir > 0 ? 0 : tracks.length - 1); return; }
  let next = currentTrack + dir;
  if (repeatAll) {
    next = (next + tracks.length) % tracks.length;
  } else {
    next = Math.max(0, Math.min(tracks.length - 1, next));
  }
  playTrack(next);
}

const prevBtn = document.getElementById("prev-track");
if (prevBtn) prevBtn.addEventListener("click", function () { stepTrack(-1); });
const nextBtn = document.getElementById("next-track");
if (nextBtn) nextBtn.addEventListener("click", function () { stepTrack(1); });

// Phát ngẫu nhiên: chọn bài khác bài đang phát
const shuffleBtn = document.getElementById("shuffle-track");
if (shuffleBtn) shuffleBtn.addEventListener("click", function () {
  let next = currentTrack;
  while (next === currentTrack && tracks.length > 1) {
    next = Math.floor(Math.random() * tracks.length);
  }
  playTrack(next);
});

// Lặp lại: bật/tắt lặp toàn danh sách (nút trước/sau quay vòng khi bật)
const repeatBtn = document.getElementById("repeat-track");
if (repeatBtn) repeatBtn.addEventListener("click", function () {
  repeatAll = !repeatAll;
  repeatBtn.textContent = repeatAll ? "Lặp lại: Bật" : "Lặp lại: Tắt";
  repeatBtn.setAttribute("aria-pressed", repeatAll ? "true" : "false");
  repeatBtn.classList.toggle("active", repeatAll);
  updateNavButtons();
});

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

// Game bắt sao: sao rơi từ trên xuống, bấm để bắt, chơi 30 giây
(function () {
  const canvas = document.getElementById("game-canvas");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const W = 640, H = 360, DURATION = 30;
  const scoreEl = document.getElementById("game-score");
  const timeEl = document.getElementById("game-time");
  const bestEl = document.getElementById("game-best");
  const msgEl = document.getElementById("game-msg");
  const startBtn = document.getElementById("game-start");
  const restartBtn = document.getElementById("game-restart");
  let best = 0;
  try { best = parseInt(localStorage.getItem("starGameBest") || "0", 10) || 0; } catch (e) {}
  if (bestEl) bestEl.textContent = best;
  let stars = [], score = 0, timeLeft = DURATION, playing = false, raf = null, lastSpawn = 0, lastTick = 0;

  function drawStar(x, y, r, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const rr = i % 2 === 0 ? r : r * 0.45;
      const a = -Math.PI / 2 + i * Math.PI / 5;
      ctx[i === 0 ? "moveTo" : "lineTo"](Math.cos(a) * rr, Math.sin(a) * rr);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  function spawnStar() {
    stars.push({
      x: 24 + Math.random() * (W - 48),
      y: -20,
      r: 12 + Math.random() * 8,
      speed: 60 + Math.random() * 90,
      color: Math.random() < 0.25 ? "#00e5ff" : (Math.random() < 0.2 ? "#ff2d78" : "#ffd94d")
    });
  }
  function draw(now) {
    ctx.clearRect(0, 0, W, H);
    if (!playing) {
      ctx.fillStyle = "rgba(238, 240, 255, 0.7)";
      ctx.font = "20px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Bấm “Chơi” để bắt đầu bắt sao!", W / 2, H / 2);
      return;
    }
    const dt = Math.min((now - lastTick) / 1000, 0.05);
    lastTick = now;
    if (now - lastSpawn > 450) { spawnStar(); lastSpawn = now; }
    stars = stars.filter(function (s) {
      s.y += s.speed * dt;
      return s.y - s.r < H + 10;
    });
    stars.forEach(function (s) { drawStar(s.x, s.y, s.r, s.color); });
    raf = requestAnimationFrame(draw);
  }
  function endGame() {
    playing = false;
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    if (score > best) {
      best = score;
      try { localStorage.setItem("starGameBest", String(best)); } catch (e) {}
      if (bestEl) bestEl.textContent = best;
      if (msgEl) msgEl.textContent = "Hết giờ! Bạn được " + score + " điểm — kỷ lục mới!";
    } else if (msgEl) {
      msgEl.textContent = "Hết giờ! Bạn được " + score + " điểm. Kỷ lục hiện tại: " + best + ".";
    }
    if (startBtn) startBtn.disabled = false;
  }
  function startGame() {
    stars = [];
    score = 0;
    timeLeft = DURATION;
    playing = true;
    if (scoreEl) scoreEl.textContent = "0";
    if (timeEl) timeEl.textContent = String(DURATION);
    if (msgEl) msgEl.textContent = "Đang chơi — bấm vào sao để bắt!";
    if (startBtn) startBtn.disabled = true;
    lastSpawn = performance.now();
    lastTick = performance.now();
    const timer = setInterval(function () {
      if (!playing) { clearInterval(timer); return; }
      timeLeft -= 1;
      if (timeEl) timeEl.textContent = String(Math.max(timeLeft, 0));
      if (timeLeft <= 0) { clearInterval(timer); endGame(); }
    }, 1000);
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(draw);
  }
  canvas.addEventListener("click", function (e) {
    if (!playing) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * W;
    const y = (e.clientY - rect.top) / rect.height * H;
    for (let i = stars.length - 1; i >= 0; i--) {
      const s = stars[i];
      const dx = x - s.x, dy = y - s.y;
      if (dx * dx + dy * dy <= (s.r + 6) * (s.r + 6)) {
        stars.splice(i, 1);
        score += 1;
        if (scoreEl) scoreEl.textContent = String(score);
        break;
      }
    }
  });
  if (startBtn) startBtn.addEventListener("click", startGame);
  if (restartBtn) restartBtn.addEventListener("click", startGame);
  draw(performance.now());
})();
