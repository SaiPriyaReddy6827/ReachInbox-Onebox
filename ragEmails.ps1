$emailQuery = Read-Host "Enter your question/query for emails"

$emails = Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/emails/search" -Body '{ "query": { "match_all": {} } }' -ContentType "application/json"

if ($emails.Count -eq 0) { Write-Host "No emails found"; exit }

# Call backend AI endpoint (assuming you have one)
$response = Invoke-RestMethod -Method Post -Uri "http://localhost:5000/api/emails/query-ai" -Body (@{ question = $emailQuery; emails = $emails } | ConvertTo-Json) -ContentType "application/json"

Write-Host "AI Response:"
Write-Host $response
