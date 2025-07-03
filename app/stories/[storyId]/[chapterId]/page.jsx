import { getChapterContent } from '../../../../lib/posts.server'
import { remark } from 'remark'
import html from 'remark-html'
import Link from 'next/link'

export default async function ChapterPage({ params }) {
  const { storyId, chapterId } = params
  const chapter = getChapterContent(storyId, chapterId)

  const processedContent = await remark().use(html).process(chapter.content)
  const contentHtml = processedContent.toString()

  return (
    <main className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-10 mb-20">
      {/* Title and Date */}
      <h1 className="text-4xl font-bold text-purple-900 mb-2">{chapter.title}</h1>
      <p className="text-sm text-gray-500 mb-6">{chapter.date}</p>

      {/* 📚 View All Chapters */}
      <div className="mb-6">
        <Link
          href={`/stories/${storyId}`}
          className="inline-flex items-center text-purple-700 font-semibold hover:underline gap-1"
        >
          📚 View All Chapters
        </Link>
      </div>

      {/* Chapter Content */}
      <div
        className="prose prose-lg prose-purple max-w-none text-justify"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Prev / Next Navigation */}
      <div className="mt-10 flex justify-between text-sm text-purple-700 font-semibold">
        {chapter.prevChapter ? (
          <Link href={`/stories/${storyId}/${chapter.prevChapter}`}>
            &larr; Previous Chapter
          </Link>
        ) : <span />}

        {chapter.nextChapter ? (
          <Link href={`/stories/${storyId}/${chapter.nextChapter}`}>
            Next Chapter &rarr;
          </Link>
        ) : <span />}
      </div>
    </main>
  )
}
