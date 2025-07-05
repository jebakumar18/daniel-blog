import Link from 'next/link'
import { getChapters, getAllStories, getStorySummaryText } from '../../../lib/posts.server'

function formatTitle(slug) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

export default function StoryPage({ params }) {
  const { storyId } = params
  const chapters = getChapters(storyId)
  const allStories = getAllStories()
  const story = allStories.find((s) => s.id === storyId)
  const detailedSummary = getStorySummaryText(storyId)

  if (!chapters || chapters.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white px-4 py-10 text-center">
        <p className="text-lg text-gray-400">No chapters found for this story.</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white px-4 sm:px-6 py-10 sm:py-14 font-sans">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* ✅ Cover Image */}
        {story?.coverImage && (
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-full max-h-80 sm:max-h-96 object-cover rounded-xl shadow-lg border border-gray-700"
          />
        )}

        {/* ✅ Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-amber-400 tracking-tight leading-snug">
          {formatTitle(story?.title || storyId)}
        </h1>

        {/* ✅ Detailed Summary */}
        {detailedSummary && (
          <div className="text-gray-300 text-base sm:text-lg leading-relaxed whitespace-pre-line bg-gray-800 bg-opacity-50 p-5 sm:p-6 rounded-xl border border-gray-700">
            {detailedSummary}
          </div>
        )}

        {/* ✅ Chapters List */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">📖 Chapters</h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {chapters.map((chapter) => (
              <li
                key={chapter.id}
                className="bg-gray-800 hover:bg-gray-700 border border-gray-700 p-5 sm:p-6 rounded-lg shadow-md transition-transform duration-200 hover:scale-[1.02]"
              >
                <Link
                  href={`/stories/${storyId}/${chapter.id}`}
                  className="block text-lg sm:text-xl font-semibold text-amber-400 hover:text-amber-300 transition"
                >
                  {formatTitle(chapter.title || chapter.id)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
