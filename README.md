# CultureCompass survey

Trang khảo sát đứng riêng, tách khỏi repo CultureCompass.

- `index.html`: form khảo sát. Câu trả lời được gửi vào Google Sheet qua Apps Script (URL đã điền ở dòng `const SHEET_URL`).
- `apps-script.gs`: code Apps Script đang chạy trong sheet (để lưu lại, phòng khi cần sửa).

## Việc còn lại

1. Mở `index.html`, sửa dòng `const SITE_URL = 'https://YOUR-SITE.vercel.app/';` thành domain thật của CultureCompass.
2. Deploy folder này để có link gửi người dùng. Cách nhanh nhất: kéo cả folder vào <https://app.netlify.com/drop>.
   Hoặc dùng Vercel: tạo project mới từ folder này (`npx vercel` trong folder).
3. Xoá dòng "TEST - delete me" trong sheet trước khi gửi link.

## Sửa Apps Script sau này

Deploy → Manage deployments → ✏️ → Version: **New version** → Deploy. URL giữ nguyên.

## Cột trong sheet

| Cột | Câu hỏi |
| --- | --- |
| age, travel, vietnam | Câu 1–3 |
| tasks | Câu 4 (cách nhau bằng `;`) |
| r_easy … r_enjoy | Câu 5, thang 1–5 |
| more_countries | Câu 6 |
| similar_used, similar_name, similar_compare | Câu 7, 7a, 7b |
| nps | Câu 8 (0–10). NPS = % chọn 9–10 trừ % chọn 0–6 |
| feedback | Câu 9 |
