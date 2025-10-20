import Imap from "node-imap";
import { simpleParser } from "mailparser";
import { addEmailToElasticsearch } from "./elasticsearch/elasticsearchService";

export function startImapListener() {
  const imap = new Imap({
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS,
    host: "imap.gmail.com",
    port: 993,
    tls: true
  });

  imap.once("ready", () => {
    console.log("IMAP Connected. Listening for new mail...");
    imap.openBox("INBOX", true, () => {
      imap.on("mail", () => {
        const fetcher = imap.seq.fetch("1:*", { bodies: "" });
        fetcher.on("message", (msg) => {
          msg.on("body", async (stream) => {
            const parsed = await simpleParser(stream);
            const email = {
              from: parsed.from?.text,
              to: parsed.to?.text,
              subject: parsed.subject,
              body: parsed.text,
              date: parsed.date,
              attachments: parsed.attachments.length,
              folder: "Inbox",
              labels: ["Inbox"]
            };
            await addEmailToElasticsearch(email);
          });
        });
      });
    });
  });

  imap.connect();
}
