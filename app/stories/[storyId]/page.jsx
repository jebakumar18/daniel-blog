import Link from 'next/link'
import { getChapters } from '../../../lib/posts.server'

export default function StoryPage({ params }) {
  const { storyId } = params
  const chapters = getChapters(storyId)

  if (!chapters || chapters.length === 0) {
    return <p>No chapters found for this story.</p>
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📖 Chapters for: {storyId.replace(/-/g, ' ')}</h1>

      <ul className="grid gap-4">
        {chapters.map((chapter) => (
          <li key={chapter.id} className="border rounded p-4">
            <Link
              href={`/stories/${storyId}/${chapter.id}`}
              className="text-blue-600 hover:underline font-medium"
            >
              {chapter.id.replace(/-/g, ' ')}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
