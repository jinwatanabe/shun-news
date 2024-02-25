// createDocument.ts
import { Document, Packer, Paragraph, TextRun } from "docx";
import * as fs from "fs";
import { Article } from "./types/Article";

export async function createDocumentFromArticles(articles: Article[]) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: articles.flatMap((article) => [
          new Paragraph({
            children: [
              new TextRun({ text: article.title, bold: true, size: 24 }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: article.date, italics: true, size: 22 }),
            ],
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: article.description,
                size: 20,
                font: "Arial",
              }),
            ],
            spacing: { after: 400 },
          }),
          new Paragraph({
            children: [new TextRun({ text: "", size: 24 })],
          }),
        ]),
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const date = new Date().toISOString().split("T")[0];
  fs.writeFileSync(`Articles_${date}.docx`, buffer);
}
