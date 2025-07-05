import { getChapterContent, getChapters } from '../../../../lib/posts.server'
import { remark } from 'remark'
import html from 'remark-html'
import Link from 'next/link'

function formatTitle(slug) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}

export default async function ChapterPage({ params }) {
  const { storyId, chapterId } = params
  const chapter = getChapterContent(storyId, chapterId)

  // Convert markdown to HTML
  const processedContent = await remark().use(html).process(chapter.content)
  const contentHtml = processedContent.toString()

  // Get all chapters to show chapter links
  const allChapters = getChapters(storyId)

  return (
    <main className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10 mb-20">

      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-400 mb-4">
        <Link href="/" className="hover:text-amber-400">Home</Link> &gt;{' '}
        <Link href="/stories" className="hover:text-amber-400">Stories</Link> &gt;{' '}
        <Link href={`/stories/${storyId}`} className="hover:text-amber-400">
          {formatTitle(storyId)}
        </Link> &gt;{' '}
        <span className="text-white">{formatTitle(chapterId)}</span>
      </nav>

      {/* Title */}
      <h1 className="text-3xl font-extrabold text-amber-400 hover:text-amber-300 mb-4">
        {chapter.title}
      </h1>

      {/* Optional date */}
      {chapter.date && (
        <p className="text-sm text-gray-400 mb-6">{chapter.date}</p>
      )}

      {/* 📚 View All Chapters */}
      <div className="mb-6">
        <Link
          href={`/stories/${storyId}`}
          className="inline-flex items-center text-sm text-amber-400 hover:text-amber-300 gap-1"
        >
          📚 View All Chapters
        </Link>
      </div>

      {/* Chapter Content */}
      <div
        className="prose prose-invert prose-lg max-w-none text-justify text-black"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Chapter Navigation */}
      <div className="mt-12 flex justify-between text-sm text-amber-400 font-semibold">
        {chapter.prevChapter ? (
          <Link href={`/stories/${storyId}/${chapter.prevChapter}`} className="hover:text-amber-300">
            &larr; {formatTitle(chapter.prevChapter)}
          </Link>
        ) : <span />}

        {chapter.nextChapter ? (
          <Link href={`/stories/${storyId}/${chapter.nextChapter}`} className="ml-auto hover:text-amber-300">
            {formatTitle(chapter.nextChapter)} &rarr;
          </Link>
        ) : <span />}
      </div>

      {/* List of all chapter links */}
      {allChapters.length > 0 && (
        <div className="mt-12 pt-6 border-t border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-amber-400">Chapters</h2>
          <ul className="list-disc list-inside space-y-1 text-black">
            {allChapters.map((chap) => (
              <li key={chap.id}>
                <Link
                  href={`/stories/${storyId}/${chap.id}`}
                  className={`hover:text-amber-400 ${chap.id === chapterId ? 'text-black font-semibold' : ''}`}
                >
                  {chap.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}
