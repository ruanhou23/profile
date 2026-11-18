// Ken | profile scripts

const projects = [
  {
    name: "Muse AI Batch Studio",
    desc: "Tool làm video AI hàng loạt: nhập ý tưởng, tự chia cảnh, viết prompt, render clip và lồng tiếng clone giọng mình.",
    tags: ["Python", "Flask", "Muse AI"],
    link: "#projects"
  },
  {
    name: "Game Beta Test",
    desc: "Game sinh tồn người que: Max làm nhân vật chính, vẽ bằng code trên canvas 2D, vòng buôn vàng 2 thế giới, đêm trăng máu.",
    tags: ["JavaScript", "Canvas 2D"],
    link: "#projects"
  },
  {
    name: "Chibi Explainer Videos",
    desc: "Video giải thích 1 phút dọc: phong cách chibi khóa cứng, 1 cảnh = 1 hành động = 1 cảm xúc, thoại tiếng Việt.",
    tags: ["AI Video", "Chibi", "9:16"],
    link: "#projects"
  },
  {
    name: "Bức thư lúc nửa đêm",
    desc: "Phim ngắn Gothic 1 phút, 6 cảnh x 10 giây: phong cách paparazzi rapid cuts, ASMR, nhân vật nữ Gothic.",
    tags: ["Gothic", "AI Video", "16:9"],
    link: "#projects"
  }
];

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;
  grid.innerHTML = projects.map(function (p) {
    return '<article class="project-card">'
      + '<h3>' + p.name + '</h3>'
      + '<p>' + p.desc + '</p>'
      + '<p class="tags">' + p.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</p>'
      + '<a class="project-link" href="' + p.link + '" target="_blank" rel="noopener">Xem thêm →</a>'
      + '</article>';
  }).join('');
}

renderProjects();

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
