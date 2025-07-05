import Link from 'next/link'
import { getAllStories } from '../lib/posts.server'

// Format slug to readable title
function formatTitle(slug) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export default async function HomePage() {
  const stories = await getAllStories()

  return (
    <main className="min-h-screen bg-gradient-to-tr from-gray-950 via-gray-900 to-indigo-950 text-white py-12 px-6 font-sans">
      <h1 className="text-5xl font-extrabold mb-8 text-center">
        Welcome to Daniel Blog
      </h1>

      <p className="text-center text-gray-400 text-lg mb-12">
        Dive into our weekly Novel | Select the tale to unfurl !
        <Link href="/stories" className="text-amber-400 hover:text-amber-300 transition-colors duration-200 hover:underline block text-center mt-10">
          View Full Novel Library
        </Link>
      </p>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {stories.map((story) => (
          <li
            key={story.id}
            className="bg-gray-800 p-7 rounded-xl shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 ease-in-out border border-gray-700"
          >
            <h2 className="text-2xl font-semibold text-yellow-300 mb-2">
              <Link
                href={`/stories/${story.id}`}
                className="text-amber-400 hover:text-amber-300 transition-colors duration-200"
              >
                {formatTitle(story.title)}
              </Link>
            </h2>
            <p className="mt-2 text-gray-400">{story.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}
