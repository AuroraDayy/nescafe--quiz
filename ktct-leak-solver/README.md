# KTCT Leak Solver

Website tĩnh để ôn nhanh Kinh tế chính trị Mác - Lênin dựa trên file leak và bài giảng nguồn.

## Cách chạy local

Mở `index.html` bằng trình duyệt, hoặc chạy:

```bash
python3 -m http.server 8080
```

Sau đó mở http://localhost:8080

## Cách thêm môn/đề khác

Thêm object mới vào `data/questions.js` theo schema:

```js
{
  id: 'subject-q1',
  exam: 'Đề 1',
  chapter: 'Chương 2',
  difficulty: 'Dễ nhầm',
  sourceFile: 'Tên file nguồn',
  question: 'Câu hỏi?',
  options: ['A', 'B', 'C', 'D'],
  correctIndex: 0,
  answer: 'Kết luận ngắn',
  correctExplain: 'Vì sao đúng',
  wrongExplain: ['', 'Vì sao B sai', 'Vì sao C sai', 'Vì sao D sai'],
  sourceQuote: 'Ý nguồn dùng để giải thích',
  tags: ['keyword']
}
```

## Ghi chú dữ liệu

File `Kinh tế chính trị.pdf` hiện chỉ trích xuất được một phần nội dung. Website đã nhập sẵn các câu/cụm đáp án đọc được và đối chiếu theo bài giảng Chương 3, Chương 4, Chương 5. Khi có PDF/ảnh rõ hơn, chỉ cần bổ sung vào `data/questions.js`.
