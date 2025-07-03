import Link from 'next/link'
import { getAllStories } from '@/lib/posts.server'

export default function HomePage() {
  const stories = getAllStories()

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">📚 Daniel Story Blog</h1>

      {stories.length === 0 ? (
        <p>No stories found. Add folders to <code>/posts</code></p>
      ) : (
        <ul className="grid gap-6">
          {stories.map((story) => (
            <li key={story.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{story.title}</h2>
              {story.summary && <p className="text-gray-600">{story.summary}</p>}
              <Link
                href={`/stories/${story.id}`}
                className="inline-block mt-2 text-blue-600 hover:underline"
              >
                Start Reading →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
