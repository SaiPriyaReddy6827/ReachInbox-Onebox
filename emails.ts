import express from "express";
import { searchEmails } from "../elasticsearch/elasticsearchService";

const router = express.Router();

// GET all emails
router.get("/", async (req, res) => {
  const emails = await searchEmails({ query: { match_all: {} } });
  res.json(emails);
});

// POST search emails by query
router.post("/search", async (req, res) => {
  const { query } = req.body;
  const emails = await searchEmails(query);
  res.json(emails);
});

export default router;
