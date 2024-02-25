import { fetchArticlesFromNewsAPI } from "./fetchArticles";
import { createDocumentFromArticles } from "./createDocument";
import dotenv from "dotenv";

dotenv.config();
const apiKey = process.env.NEWS_API_KEY as string;

async function main() {
  const categories = ["business", "technology", "sports"];
  const articles = await fetchArticlesFromNewsAPI(categories, 30, apiKey);
  await createDocumentFromArticles(articles);
  console.log("Document created successfully.");
}

main().catch(console.error);
