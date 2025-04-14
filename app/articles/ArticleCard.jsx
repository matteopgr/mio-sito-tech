export default function ArticleCard({ article }) {
    return (
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold">{article.title}</h3>
        <p className="text-sm text-gray-700">{article.excerpt}</p>
      </div>
    );
  }
  