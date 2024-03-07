import * as MainRepository from "../repository/MainRepository.js";

export async function getDonation(req, res) {
  const result = await MainRepository.donationData();
  if (result) {
    res.json({ ok: true, result });
  } else {
    res.json({ ok: false, result });
  }
}

export async function getLike(req, res) {
  const {user_id, donation_no} = req.query;
  const result = await MainRepository.getLike(user_id, donation_no);
  if (result) {
    res.json({ ok: true, result });
  } else {
    res.json({ ok: false, result });
  }
}

export async function insertLike(req, res) {
  const {user_id, donation_no} = req.query;
  const result = await MainRepository.insertLike(user_id, donation_no);
  if(result === "ok") { 
    res.json({ ok: true });
  }else{
      res.json({ ok: false }); 
  }  
}
