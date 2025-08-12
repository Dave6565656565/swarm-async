import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock } from "lucide-react"

interface Article {
  title: string
  description: string
  href: string
  readTime: string
  image?: string
}

interface RelatedArticlesProps {
  articles: Article[]
  title?: string
  description?: string
}

export function RelatedArticles({
  articles,
  title = "Related Articles",
  description = "Continue learning about Ethereum staking",
}: RelatedArticlesProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {articles.map((article, index) => (
            <Link
              key={index}
              href={article.href}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
                {article.image ? (
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.description}</p>
                <div className="flex items-center text-blue-600 text-sm font-medium group-hover:gap-2 transition-all">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Parlay Calculator Backlink */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Looking for sports betting tools?</p>
          <Link
            href="https://luxuryfootballelite.com/parlay-calculator/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <span>Try the best Parlay Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
