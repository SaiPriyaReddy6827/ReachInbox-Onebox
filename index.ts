import express from "express";
import dotenv from "dotenv";
import { startImapListener } from "./imapService";
import emailRoutes from "./routes/emails";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/emails", emailRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  startImapListener();
});
