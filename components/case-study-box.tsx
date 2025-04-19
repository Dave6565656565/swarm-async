interface CaseStudyBoxProps {
  title: string
  date: string
  description: string
  outcome: string
  lessons: string[]
}

export function CaseStudyBox({ title, date, description, outcome, lessons }: CaseStudyBoxProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="text-sm text-gray-500">{date}</div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Outcome</h4>
          <p className="text-sm text-gray-600">{outcome}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Key Lessons</h4>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            {lessons.map((lesson, index) => (
              <li key={index}>{lesson}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
