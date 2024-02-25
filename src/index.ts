import { Document, Packer, Paragraph, TextRun } from "docx";
import * as fs from "fs";

interface Article {
  title: string;
  date: string;
  content: string;
}

const articles: Article[] = [
  {
    title: "未来技術で空飛ぶ車が現実に！2024年末に試験運用開始予定",
    date: "2024年2月20日",
    content:
      "新たな未来技術を駆使して開発された空飛ぶ車がついに現実のものとなる。この革新的な車は、都市の交通渋滞を解消し、旅行時間を大幅に短縮することを目指している。2024年末には、限定的ながら試験運用が開始される予定で、既に世界中から注目を集めている。",
  },
  {
    title: "新種の深海生物発見、光を放つ珍しい特性に科学界が驚愕",
    date: "2024年3月5日",
    content:
      "最近の深海探査ミッションで、科学者たちは自ら光を放つ新種の深海生物を発見した。この生物は深海の暗闇の中で独自の光を用いてコミュニケーションを取ると考えられており、その発光メカニズムの解明に科学界が挑んでいる。",
  },
];

function createDocument(articles: Article[]) {
  const doc = new Document({
    sections: [],
  });

  let paragraphArray = [] as Paragraph[][];

  articles.forEach((article, index) => {
    const title = new Paragraph({
      children: [new TextRun({ text: article.title, bold: true, size: 24 })],
      spacing: { after: 200 },
    });

    const date = new Paragraph({
      children: [new TextRun({ text: article.date, italics: true, size: 22 })],
      spacing: { after: 200 },
    });

    const content = new Paragraph({
      children: [new TextRun({ text: article.content, size: 20 })],
      spacing: { after: 400 },
    });

    const emptyLine = new Paragraph({
      children: [new TextRun({ text: "", size: 24 })],
      pageBreakBefore: false,
    });

    paragraphArray.push([title, date, content, emptyLine]);
  });

  //@ts-ignore
  doc.addSection({
    children: paragraphArray.flat(),
  });

  return doc;
}

const doc = createDocument(articles);
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("Articles.docx", buffer);
});
