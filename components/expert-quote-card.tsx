interface ExpertQuoteCardProps {
  quote: string
  author: string
  title: string
  avatarUrl: string
}

export function ExpertQuoteCard({ quote, author, title, avatarUrl }: ExpertQuoteCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 my-6">
      <div className="flex items-start">
        <div className="text-4xl text-gray-300 font-serif leading-none">"</div>
        <div className="ml-2">
          <p className="text-gray-700 italic mb-4">{quote}</p>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <img src={avatarUrl || "/placeholder.svg"} alt={author} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-medium text-gray-900">{author}</div>
              <div className="text-sm text-gray-500">{title}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
