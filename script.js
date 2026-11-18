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
