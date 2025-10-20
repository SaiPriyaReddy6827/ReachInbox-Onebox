import React, { useEffect, useState } from "react";
import axios from "axios";
import EmailTable from "./components/EmailTable";

function App() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/emails")
      .then(res => setEmails(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>ReachInbox Emails</h1>
      <EmailTable emails={emails} />
    </div>
  );
}

export default App;
