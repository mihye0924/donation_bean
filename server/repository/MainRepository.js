import { db } from "../db/database.js";

export async function donationData() {
  const sql = `select * from donation`;

  return db.execute(sql).then((row) => row[0]);
}
