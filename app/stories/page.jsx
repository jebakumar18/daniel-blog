import Link from 'next/link'
import { getAllStories } from '../../lib/posts.server'
import Image from 'next/image'

// Format slug into a clean title
function formatTitle(slug) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

export default function StoriesPage() {
  const stories = getAllStories() || []

  return (
    <main className="min-h-screen bg-gradient-to-tr from-gray-950 via-gray-900 to-indigo-950 text-white py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 sm:mb-10 text-center tracking-tight">
          Novel Library
        </h1>

        <p className="text-center text-gray-400 text-base sm:text-lg mb-10 sm:mb-14 max-w-2xl mx-auto">
          Explore all published tales from our collection.
        </p>

        {stories.length === 0 ? (
          <p className="text-center text-gray-500">
            No stories available. Add markdown files in <code>/posts</code>.
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => {
              const title = formatTitle(story.title || story.id || 'Untitled Story')
              const storyId = story.id

              return (
                <li
                  key={storyId}
                  className="bg-gray-800 p-6 sm:p-7 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all border border-gray-700"
                >
                  {/* ✅ Responsive Cover Image */}
                  {story.coverImage && (
                    <div className="relative w-full h-48 sm:h-56 rounded-md overflow-hidden border border-gray-700 mb-4">
                      <Image
                        src={story.coverImage}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                        placeholder="blur"
                        blurDataURL="/placeholder.png" // Optional: preload low-res placeholder
                      />
                    </div>
                  )}

                  {/* ✅ Title */}
                  <h2 className="text-xl sm:text-2xl font-semibold text-amber-400 hover:text-amber-300 mb-2 transition">
                    {title}
                  </h2>

                  {/* ✅ Summary */}
                  {story.summary && (
                    <p className="text-gray-400 text-sm sm:text-base mb-4 leading-relaxed">
                      {story.summary}
                    </p>
                  )}

                  {/* ✅ CTA Button */}
                  <Link
                    href={`/stories/${storyId}`}
                    className="inline-block w-full text-center bg-amber-400 hover:bg-amber-300 text-black font-semibold px-4 py-2 rounded transition-colors"
                  >
                    Start Reading →
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </main>
  )
}
