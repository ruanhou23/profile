// Ken — ruanhou23 | profile scripts

const projects = [
  {
    name: "Muse AI Batch Studio",
    desc: "Tool làm video AI hàng loạt: nhập ý tưởng, tự chia cảnh, viết prompt, render clip và lồng tiếng clone giọng mình.",
    tags: ["Python", "Flask", "Muse AI"],
    link: "https://github.com/ruanhou23/tool-my-Private"
  },
  {
    name: "Game Beta Test",
    desc: "Game sinh tồn người que: Max làm nhân vật chính, vẽ bằng code trên canvas 2D, vòng buôn vàng 2 thế giới, đêm trăng máu.",
    tags: ["JavaScript", "Canvas 2D"],
    link: "https://github.com/ruanhou23/game-beta-test"
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

// @@more@@
