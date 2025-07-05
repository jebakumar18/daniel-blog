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
    <main className="min-h-screen bg-gradient-to-tr from-gray-950 via-gray-900 to-indigo-950 text-white py-12 px-4 sm:px-6 md:px-8 font-sans">
      {/* Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-center tracking-tight leading-snug">
        Welcome to Daniel Blog
      </h1>

      {/* Subheading */}
      <p className="text-center text-gray-300 mb-10 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
        Dive into our weekly Novel | Select the tale to unfurl!
      </p>

      {/* View Full Library CTA */}
      <div className="text-center mb-12">
        <Link
          href="/stories"
          className="text-amber-400 hover:text-amber-300 text-sm sm:text-base transition duration-200 hover:underline"
        >
          📚 View Full Novel Library
        </Link>
      </div>

      {/* Stories Grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {stories.map((story) => (
          <li
            key={story.id}
            className="bg-gray-800 p-5 sm:p-6 rounded-xl shadow-md hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 border border-gray-700"
          >
            {/* Story Title */}
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">
              <Link
                href={`/stories/${story.id}`}
                className="text-amber-400 hover:text-amber-300 transition-colors duration-200"
              >
                {formatTitle(story.title)}
              </Link>
            </h2>

            {/* Story Summary */}
            {story.summary && (
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                {story.summary}
              </p>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}
