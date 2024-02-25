import axios from "axios";
import { Article } from "./types/Article";

export async function fetchArticlesFromNewsAPI(
  categories: string[],
  limit: number,
  apiKey: string
): Promise<Article[]> {
  const baseUrl = "https://newsapi.org/v2/top-headlines";
  let allArticles: Article[] = [];

  for (const category of categories) {
    try {
      const response = await axios.get(baseUrl, {
        params: {
          country: "jp",
          category: category,
          pageSize: limit,
          apiKey: apiKey,
        },
      });

      const filteredArticles = response.data.articles
        .filter(
          (article: any) =>
            article.description != null &&
            article.source.name !== "Itmedia.co.jp"
        )
        .map((article: any) => ({
          title: article.title,
          date: article.publishedAt.split("T")[0],
          description: article.description,
        }));

      allArticles = allArticles.concat(filteredArticles);
    } catch (error) {
      console.error(`Error fetching ${category} news:`, error);
    }
  }

  return allArticles;
}
