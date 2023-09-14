const express = require("express");
const router = express.Router();
const db = require("../utils/database");

router.get("/", async (req, res) => {
  try {
    const result = await db.execute(
      "SELECT name FROM congviec WHERE status = 0"
    );
    let [rows] = result;
    res.json({
      message: "success",
      result: rows,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

router.post('/', async (req, res) => {
    const { name, status = 0 } = req.body;
    try {
      const result = await db.execute(
        'INSERT INTO congviec (name, status) VALUES (?, ?)',
        [name, status]
      );
      let [rows] = result;
      res.json({
        message: 'success',
        result: rows,
      });
    } catch (error) {
      res.json({
        error: error,
      });
    }
  });

module.exports = router;
