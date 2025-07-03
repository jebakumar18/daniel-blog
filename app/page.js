'use client'

import Link from 'next/link'
import { getAllStories } from '@/lib/posts'

export default function HomePage() {
  const stories = getAllStories() || []

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">📚 Daniel's Story Blog</h1>

      {stories.length === 0 ? (
        <p>No stories found. Please add stories in the <code>/posts</code> folder.</p>
      ) : (
        <ul className="grid gap-6">
          {stories.map((story) => {
            const title = typeof story.title === 'string'
              ? story.title
              : (typeof story.id === 'string' ? story.id.replace(/-/g, ' ') : 'Untitled Story')

            return (
              <li key={story.id} className="border p-4 rounded-md shadow hover:shadow-md">
                <h2 className="text-xl font-semibold mb-2">{title}</h2>

                {story.summary && (
                  <p className="text-gray-600 mb-3">{story.summary}</p>
                )}

                <Link
                  href={`/stories/${story.id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Start Reading →
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </main>
  )
}
