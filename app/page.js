import Link from 'next/link'
import { getAllStories } from '@/lib/posts'

export default function HomePage() {
  const stories = getAllStories()

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-purple-700">📚 The Novel Library by Daniel J. Durai</h1>
      <p className="text-gray-600 mb-10">Choose the Story you want to unfurl:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stories.map((story) => (
          <Link key={story} href={`/stories/${story}`}>
            <div className="p-4 border rounded-xl shadow hover:bg-purple-50 transition">
              <h2 className="text-xl font-semibold text-purple-700 capitalize">
                {story.replace(/-/g, ' ')}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
