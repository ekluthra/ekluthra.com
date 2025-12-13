
// Manually specify repositories to display
const manualRepos = [
  {
    name: 'RobinGood',
    full_name: 'ekluthra/RobinGood',
    html_url: 'https://github.com/ekluthra/RobinGood',
    description: 'Trade stocks by democratic voting, and donate capital gains to charity.',
    archived: false,
    is_template: false,
  },
  {
    name: 'RayTracing',
    full_name: 'ekluthra/RayTracing',
    html_url: 'https://github.com/ekluthra/RayTracing',
    description: 'Produce approximately accurate renderings of scenes illuminated with light.',
    archived: false,
    is_template: false,
  },
  {
    name: 'Teacher\'s Portal',
    full_name: 'ushinghal19/teachers=portal',
    html_url: 'https://github.com/ushinghal19/teachers-portal',
    description: 'An analytics dashboard built for educators that use Hypatiasys for assignments.',
    archived: false,
    is_template: false,
  },
  {
    name: 'Air Pollution Fatalities Analysis',
    full_name: 'ekluthra/CSC343-AirPollutionDeaths',
    html_url: 'https://github.com/ekluthra/CSC343-AirPollutionDeaths',
    description: 'An analysis of air pollution fatalities worldwide using SQL and Python.',
    archived: false,
    is_template: false,
  }
  // Add more repositories as needed
]

export function GitHubSection() {
  return (
    <div className="mb-14">
      <h2 className="mb-4 text-2xl font-semibold tracking-tight">GitHub</h2>
      <div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">Selected repositories</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {manualRepos.map((repo) => (
            <a
              key={repo.full_name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="h-full p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-all hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-sm">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                        {repo.name}
                      </h3>
                      {repo.archived && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 whitespace-nowrap">
                          Archived
                        </span>
                      )}
                      {repo.is_template && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 whitespace-nowrap">
                          Template
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow line-clamp-2 mb-3">
                    {repo.description || "No description available"}
                  </p>
                  {/* Removed stargazers_count display */}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}