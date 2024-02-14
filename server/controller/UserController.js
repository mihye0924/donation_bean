import * as DetailRepository from "../repository/DetailRepository.js";

export async function getDetail(req, res) {
  const { isbn } = req.params;
  const result = await DetailRepository.getDetail(isbn);
  res.json(result);
}

export async function insertReview(req, res) {
  let { uid, isbn, title, content, point } = req.body;
  console.log(req.body);
  const row = await DetailRepository.insertReview(
    uid,
    isbn,
    title,
    content,
    point
  );
  if (row === "ok") {
    res.json(row);
  }
}

export async function getReview(req, res) {
  const result = await DetailRepository.getReview(req.params.isbn);
  res.json(result);
}
