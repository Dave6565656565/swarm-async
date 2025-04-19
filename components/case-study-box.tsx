interface CaseStudyBoxProps {
  title: string
  date: string
  description: string
  outcome: string
  lessons: string[]
}

export function CaseStudyBox({ title, date, description, outcome, lessons }: CaseStudyBoxProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden my-6">
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold text-gray-800">{title}</h4>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Background</h5>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div className="mb-4">
          <h5 className="text-sm font-medium text-gray-700 mb-2">Outcome</h5>
          <p className="text-sm text-gray-600">{outcome}</p>
        </div>
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">Key Lessons</h5>
          <ul className="text-sm text-gray-600 space-y-1">
            {lessons.map((lesson, index) => (
              <li key={index} className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span>{lesson}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
