import ArticleCard from "./ArticleCard";

const articles = [
  {
    id: 1,
    title: "Introduzione a Next.js",
    excerpt: "Una guida rapida ai concetti fondamentali di Next.js.",
  },
  {
    id: 2,
    title: "Cos'è il phishing e come difendersi",
    excerpt: "Scopri le tecniche più comuni usate dagli hacker.",
  },
];

export default function ArticlesPage() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Articoli recenti</h2>
      <div className="grid gap-4">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
