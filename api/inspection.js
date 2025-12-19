import sql from 'mssql';

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

export default async function handler(req, res) {
  const { rid } = req.query;
  if (!rid) return res.status(400).json({ error: 'RID required' });

  try {
    const pool = await sql.connect(config);

    const result = await pool.request()
      .input('rid', sql.VarChar, rid)
      .query(`
        SELECT *
        FROM dv_RM_inspectiondet
        WHERE RID = @rid
      `);

    res.status(200).json(result.recordset);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
