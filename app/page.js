import Link from 'next/link'

// Import your data fetching function — adjust path if needed
import { getAllStories } from '../lib/posts.server'

export default async function HomePage() {
  // Fetch stories data (make sure getAllStories returns array)
  const stories = await getAllStories()

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-5xl font-extrabold mb-8 text-center">
        Welcome to Daniel Blog
      </h1>

      <p className="mb-10 text-center text-lg text-gray-700">
        Explore our weekly stories — click a title to start reading!
      </p>

      <ul className="space-y-6">
        {stories.map((story) => (
          <li
            key={story.id}
            className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <Link
              href={`/stories/${story.id}`}
              className="text-2xl font-semibold text-blue-600 hover:underline"
            >
              {story.title}
            </Link>
            <p className="mt-2 text-gray-600">{story.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
