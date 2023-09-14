const express = require("express");
const router = express.Router();
const db = require("../utils/database");

router.get("/", async (req, res) => {
  try {
    const result = await db.execute("SELECT * FROM congviec WHERE status = 0");
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

router.post("/", async (req, res) => {
  const { name, status = 0 } = req.body;
  try {
    const result = await db.execute(
      "INSERT INTO congviec (name, status) VALUES (?, ?)",
      [name, status]
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.execute(
      "UPDATE congviec SET status = 1 WHERE id = ?",
      [id]
    );
    if (result[0].affectedRows === 1) {
      res.json({
        message: "Chuyển trạng thái thành công từ 0 sang 1",
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
  const id = req.params.id; // Lấy ID từ đường dẫn URL

  try {
    // Thực hiện truy vấn SQL để xóa công việc dựa trên ID
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
