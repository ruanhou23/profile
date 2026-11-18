# profile — Ken

Trang profile cá nhân của Ken — lập trình viên, làm video AI, fan anime.

## Xem web

Mở `index.html` trực tiếp, hoặc bật GitHub Pages: repo **Settings → Pages →
Deploy from a branch → main → / (root)**.

## Tech stack

- HTML + CSS + JavaScript thuần (không framework, không phụ thuộc ngoài)
- Dark theme, neon hồng `#ff2d78` + cyan `#00e5ff`
- Avatar vẽ bằng SVG (`avatar.svg`)
- Responsive: mobile / tablet / desktop
- Nền sao nhấp nháy (canvas), vệt sáng aurora, card kính mờ, chữ gradient động

## Cấu trúc

- `index.html` — khung trang + các mục Hero / About / Skills / Projects / Anime / Music / Contact
- `style.css` — theme, layout, animation
- `script.js` — render dự án và playlist nhạc từ dữ liệu, hiệu ứng gõ chữ, hiện khi cuộn, thanh kỹ năng, nền sao nhấp nháy
- `avatar.svg` — avatar chibi tóc nhọn

## Đổi anime yêu thích

Sửa danh sách trong mục Anime của `index.html` (mục `id="anime"`) — hiện là
danh sách mẫu: One Piece, Naruto, Attack on Titan, Demon Slayer, Jujutsu
Kaisen, Spirited Away.

## Nghe nhạc yêu thích

Mục Music có khung phát 16:9 và danh sách 6 bài nhạc Hoa: Nan Khước, Tỳ Bà
Khúc, Du Sơn Luyến (Remix), Quan Sơn Tửu, Thập Niên Nhân Gian, Tứ Ngã.
Bấm vào bài để phát (YouTube embed, autoplay), nút Bài trước / Bài sau để
chuyển bài. Thẻ đang phát có nhãn "Đang phát" và vạch equalizer nhảy.
Đổi danh sách trong mảng `tracks` ở `script.js` (mục "Nhạc yêu thích").
