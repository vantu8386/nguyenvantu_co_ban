const express = require("express");
const router = express.Router();
const db = require("../utils/database");

router.get("/", async (req, res) => {
  try {
    const result = await db.execute("SELECT * FROM congviec WHERE status = 1");
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.execute(
      "UPDATE congviec SET status = 0 WHERE id = ?",
      [id]
    );
    if (result[0].affectedRows === 1) {
      res.json({
        message: "Chuyển trạng thái thành công từ 1 sang 0",
      });
    } else {
      res.status(404).json({
        error: "Không tìm thấy công việc với ID đã cho",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.execute("DELETE FROM congviec WHERE id = ?", [id]);

    if (result[0].affectedRows > 0) {
      res.json({
        message: "Công việc đã được xóa thành công",
      });
    } else {
      res.status(404).json({
        message: "Không tìm thấy công việc với ID đã cung cấp",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

module.exports = router;
