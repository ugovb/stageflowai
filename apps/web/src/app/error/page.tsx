export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">Oops!</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">Sorry, something went wrong with your authentication.</p>
        <a href="/login" className="inline-block px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
          Back to Login
        </a>
      </div>
    </div>
  )
}
