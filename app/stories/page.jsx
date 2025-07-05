import Link from 'next/link'
import { getAllStories } from '../../lib/posts.server'
import Image from 'next/image'


function formatTitle(slug) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

export default function StoriesPage() {
  const stories = getAllStories() || []

  return (
    <main className="min-h-screen bg-gradient-to-tr from-gray-950 via-gray-900 to-indigo-950 text-white py-12 px-6 font-sans">
      <h1 className="text-5xl font-extrabold mb-8 text-center">Novel Library</h1>
      <p className="text-center text-gray-400 text-lg mb-12">Explore all published Tales.</p>

      {stories.length === 0 ? (
        <p className="text-center text-gray-500">No stories available. Add markdown files in <code>/posts</code>.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stories.map((story) => {
            const title = formatTitle(story.title || story.id || 'Untitled Story')
            const storyId = story.id

            return (
              <li key={storyId} className="bg-gray-800 p-7 rounded-xl shadow-xl hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 ease-in-out border border-gray-700">
                {story.coverImage && (
                  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden border border-gray-700">
                    <Image
                      src={story.coverImage}
                      alt={title}
                      layout="fill"
                      objectFit="cover"
                      placeholder="blur"
                      blurDataURL="/placeholder.png" // optional
                    />
                  </div>
                )}

                <h2 className="text-2xl font-semibold text-amber-400 hover:text-amber-300 mb-2">{title}</h2>

                {story.summary && (
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{story.summary}</p>
                )}

                <Link
                  href={`/stories/${storyId}`}
                  className="inline-block bg-amber-400 hover:bg-amber-300 text-black px-4 py-2 rounded transition-colors"
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
