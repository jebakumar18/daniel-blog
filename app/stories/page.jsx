import { getChapters } from '@/lib/posts'
import Link from 'next/link'

export default function StoryPage({ params }) {
  const chapters = getChapters(params.storyId)

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-purple-800 capitalize">{params.storyId.replace(/-/g, ' ')}</h1>
      <ul className="space-y-4">
        {chapters.map((chapter) => (
          <li key={chapter.chapterId}>
            <Link href={`/stories/${chapter.storyId}/${chapter.chapterId}`}>
              <div className="p-4 border rounded-xl hover:bg-purple-100 transition">
                <h2 className="text-xl font-semibold">{chapter.title}</h2>
                <p className="text-sm text-gray-500">{chapter.date}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
