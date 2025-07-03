import Link from 'next/link'
import { getAllStories } from '@/lib/posts'

export default function StoriesPage() {
  const stories = getAllStories()

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">📖 All Stories</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {stories.map((story) => (
          <div key={story.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
            {story.coverImage && (
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{story.title}</h2>
              {story.summary && <p className="text-gray-600 mb-4">{story.summary}</p>}
              {story.chapters.length > 0 && (
                <Link
                  href={`/stories/${story.id}/${story.chapters[0].id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Start Reading →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
