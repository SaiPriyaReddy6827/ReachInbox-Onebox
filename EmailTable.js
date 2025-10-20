import React from "react";

export default function EmailTable({ emails }) {
  if (!emails || emails.length === 0) {
    return <p>No emails found.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Account</th>
          <th>Folder</th>
          <th>From</th>
          <th>To</th>
          <th>Subject</th>
        </tr>
      </thead>
      <tbody>
        {emails.map((email, i) => (
          <tr key={i}>
            <td>{email.accountId || "-"}</td>
            <td>{email.folder || "-"}</td>
            <td>{email.from || "-"}</td>
            <td>{email.to || "-"}</td>
            <td>{email.subject || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
