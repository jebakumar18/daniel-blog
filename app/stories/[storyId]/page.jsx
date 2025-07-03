import fs from 'fs'
import path from 'path'
import { getChapters } from '@/lib/posts'
import Link from 'next/link'
import Image from 'next/image'

export default function StoryPage({ params }) {
  const { storyId } = params
  const chapters = getChapters(storyId)

  // Read summary from summary.txt
  const summaryPath = path.join(process.cwd(), 'posts', storyId, 'summary.txt')
  const summary = fs.existsSync(summaryPath) ? fs.readFileSync(summaryPath, 'utf-8') : ''

  const coverImagePath = `/stories/${storyId}/cover.jpg`

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-10">
      {/* Cover Image */}
      <img src={coverImagePath} alt="Story Cover" width = {800} height = {450} className="rounded-2xl shadow-lg" />

      {/* Story Summary */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold capitalize text-purple-800">{storyId.replace(/-/g, ' ')}</h1>
        <p className="text-gray-700 text-lg whitespace-pre-line">{summary}</p>
        <Link href={`/stories/${storyId}/${chapters[0].chapterId}`}>
          <button className="mt-4 px-6 py-3 bg-purple-700 text-white rounded-xl shadow hover:bg-purple-800 transition">
            📖 Start Reading
          </button>
        </Link>
      </section>

      {/* Chapter List */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-purple-700">All Chapters</h2>
        <ul className="space-y-3">
          {chapters.map((chapter) => (
            <li key={chapter.chapterId}>
              <Link href={`/stories/${chapter.storyId}/${chapter.chapterId}`}>
                <div className="p-4 border rounded-xl hover:bg-purple-50 transition">
                  <h3 className="text-lg font-semibold">{chapter.title}</h3>
                  <p className="text-sm text-gray-500">{chapter.date}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
