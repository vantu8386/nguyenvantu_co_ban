const express = require("express");
const router = express.Router();
const db = require("../utils/database");

router.get("/", async (req, res) => {
  try {
    const result = await db.execute(
      "SELECT name FROM congviec WHERE status = 1"
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


module.exports = router;
