# Fetch all emails
$allEmails = Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/emails/search" -Body '{ "query": { "match_all": {} } }' -ContentType "application/json"
$allEmails | Format-Table accountId, folder, from, to, subject
