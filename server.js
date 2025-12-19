import express from 'express';
import sql from 'mssql';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

sql.connect(config);

app.get('/', (req, res)=> res.send('Hello, world !'))

app.get('/inspection/:rid', async (req, res) => {
  const { rid } = req.params;

  try {
    const result = await sql.query`
      SELECT DISTINCT
        d.RID_no,
        d.RI_no,
        i.ERP_po_no
      FROM dv_RM_inspectiondet d
      JOIN dv_RM_inspection i
        ON d.RI_no = i.RI_no
      WHERE d.RID_no = ${rid}
    `;

    res.json(result.recordset[0] || null);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(+process.env.PORT, '0.0.0.0', () =>
  console.log('API running')
);
