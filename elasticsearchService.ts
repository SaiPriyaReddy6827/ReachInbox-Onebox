import { Client } from "@elastic/elasticsearch";

const client = new Client({ node: "http://localhost:9200" });

export async function addEmailToElasticsearch(email: any) {
  await client.index({
    index: "emails",
    document: email
  });
  console.log("Email indexed to Elasticsearch");
}

export async function searchEmails(query: any) {
  const result = await client.search({
    index: "emails",
    body: query
  });
  return result.hits.hits.map((hit: any) => hit._source);
}
