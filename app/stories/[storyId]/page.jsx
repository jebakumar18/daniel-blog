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
    return <p>No chapters found for this story.</p>
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white px-6 py-12 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* ✅ Cover Image */}
        {story?.coverImage && (
          <img
            src={story.coverImage}
            alt={story.title}
            className="w-full max-h-96 object-cover rounded-xl shadow-lg mb-8 border border-gray-700"
          />
        )}

        {/* ✅ Title */}
        <h1 className="text-5xl font-extrabold mb-4 text-amber-400">
          {formatTitle(story?.title || storyId)}
        </h1>

        {/* ✅ Summary from summary.txt */}
        {detailedSummary && (
          <p className="text-gray-300 text-lg mb-10 leading-relaxed whitespace-pre-line">
            {detailedSummary}
          </p>
        )}

        {/* ✅ Chapters */}
        <h2 className="text-2xl font-bold mb-4 text-white">📖 Chapters</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chapters.map((chapter) => (
            <li
              key={chapter.id}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-700 p-6 rounded-lg shadow transition-transform duration-200 hover:scale-[1.02]"
            >
              <Link
                href={`/stories/${storyId}/${chapter.id}`}
                className="block text-amber-400 text-xl font-semibold hover:underline"
              >
                {formatTitle(chapter.title || chapter.id)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
