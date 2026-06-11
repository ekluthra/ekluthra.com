export const metadata = {
  title: 'Resume',
  description: 'Ekagra Luthra — resume.',
}

const RESUME_PATH = '/resume.pdf'

export default function ResumePage() {
  return (
    <section>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-semibold text-2xl tracking-tighter">Resume</h1>
        <a
          href={RESUME_PATH}
          download
          className="inline-flex items-center text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Download PDF
        </a>
      </div>

      <div className="overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
        <iframe
          src={RESUME_PATH}
          title="Ekagra Luthra resume"
          className="h-[80vh] w-full"
        />
      </div>

      <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
        <a
          href={RESUME_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          Open in a new tab
        </a>
        .
      </p>
    </section>
  )
}
