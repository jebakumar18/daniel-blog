import Link from 'next/link'
import { getAllStories } from '../../lib/posts.server'

export default function StoriesPage() {
  const stories = getAllStories() || []

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📚 All Stories</h1>

      {stories.length === 0 ? (
        <p>No stories available. Add your markdown files in the <code>/posts</code> folder.</p>
      ) : (
        <ul className="grid gap-6">
          {stories.map((story) => {
            const title = typeof story.title === 'string'
              ? story.title
              : (typeof story.id === 'string' ? story.id.replace(/-/g, ' ') : 'Untitled Story')

            const storyId = typeof story.id === 'string' ? story.id : null

            return (
              <li
                key={storyId}
                className="border rounded-md p-4 shadow hover:shadow-lg transition"
              >
                {story.coverImage && (
                  <img
                    src={story.coverImage}
                    alt={title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}

                <h2 className="text-xl font-semibold mb-2">{title}</h2>

                {story.summary && (
                  <p className="text-gray-600 mb-3">{story.summary}</p>
                )}

                {storyId && (
                  <Link
                    href={`/stories/${storyId}`}
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Start Reading →
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </main>
  )
}
