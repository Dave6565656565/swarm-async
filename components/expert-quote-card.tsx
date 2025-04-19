import Image from "next/image"

interface ExpertQuoteCardProps {
  quote: string
  author: string
  title: string
  avatarUrl: string
}

export function ExpertQuoteCard({ quote, author, title, avatarUrl }: ExpertQuoteCardProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6 relative">
      <div className="flex items-start">
        <div className="hidden md:block mr-6">
          <div className="w-16 h-16 rounded-full overflow-hidden relative">
            <Image src={avatarUrl || "/placeholder.svg"} alt={author} fill className="object-cover" sizes="64px" />
          </div>
        </div>
        <div>
          <div className="text-gray-700 italic mb-4 text-lg leading-relaxed">"{quote}"</div>
          <div className="flex items-center">
            <div className="md:hidden mr-3">
              <div className="w-10 h-10 rounded-full overflow-hidden relative">
                <Image src={avatarUrl || "/placeholder.svg"} alt={author} fill className="object-cover" sizes="40px" />
              </div>
            </div>
            <div>
              <div className="font-semibold text-gray-800">{author}</div>
              <div className="text-sm text-gray-600">{title}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
