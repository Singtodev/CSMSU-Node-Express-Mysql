import express, { Request, Response } from "express";
import { connectDB } from "../utils/dbconnect";

export const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  try {
    const sql = "select * from trip";
    connectDB.query(sql, (err, result, fields) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json(result);
    });
  } catch (err) {
    return res.send("Something went wrong! " + err);
  }
});

router.get("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send("param id required!");

    const sql = `SELECT * FROM trip WHERE idx = ?`;
    connectDB.query(sql, [id], (err, result, fields) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      return res.status(200).json(result);
    });
  } catch (err) {
    return res.status(500).send("Something went wrong! " + err);
  }
});

router.get("/search/fields", (req: Request, res: Response) => {
  try {
    const { id, name } = req.query;
    const sql =
      "select * from trip where (idx IS NULL OR idx = ?) OR (name IS NULL OR name like ?)";
    connectDB.query(sql, [id, "%" + name + "%"], (err, result, fields) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      return res.status(200).json(result);
    });
  } catch (err) {
    return res.status(500).send("Something went wrong! " + err);
  }
});

router.get("/search/price", (req: Request, res: Response) => {
  try {
    const { min, max } = req.query;
    let sql = "SELECT * FROM trip WHERE 1";
    const params = [];

    if (min !== undefined && max !== undefined) {
      sql += " AND price BETWEEN ? AND ?";
      params.push(min, max);
    } else if (min !== undefined) {
      sql += " AND price >= ?";
      params.push(min);
    } else if (max !== undefined) {
      sql += " AND price <= ?";
      params.push(max);
    }

    connectDB.query(sql, params, (err, result, fields) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }
      return res.status(200).json(result);
    });

  } catch (err) {
    return res.status(500).send("Something went wrong! " + err);
  }
});

router.post("/", (req: Request, res: Response) => {
  try {
    if (req.body) {
      const { id, name } = req.body;
      res.send(`Method POST in trip.tsx with ${id} ${name}`);
    } else {
      res.send("Method POST in trip.tsx");
    }
  } catch (err) {
    res.send("Something went wrong!");
  }
});
