import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Repository {
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  language: string;
}

const GRAPHQL_QUERY = `{
  user(login: "igarridosi") {
    pinnedItems(first: 6, types: REPOSITORY) {
      nodes {
        ... on Repository {
          name
          description
          url
          homepageUrl
          repositoryTopics(first: 10) {
            nodes { topic { name } }
          }
          primaryLanguage { name }
        }
      }
    }
  }
}`;

const parseRepos = (nodes: any[]): Repository[] =>
  nodes.map((repo) => ({
    name: repo.name,
    description: repo.description,
    html_url: repo.url,
    homepage: repo.homepageUrl,
    topics: repo.repositoryTopics.nodes.map((t: any) => t.topic.name),
    language: repo.primaryLanguage?.name ?? null,
  }));

const SkeletonCard = () => (
  <div className="bg-white p-6 rounded-lg border-2 border-gray-200 animate-pulse">
    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
    <div className="space-y-2 mb-5 h-20">
      <div className="h-3.5 bg-gray-200 rounded w-full" />
      <div className="h-3.5 bg-gray-200 rounded w-5/6" />
      <div className="h-3.5 bg-gray-200 rounded w-4/6" />
    </div>
    <div className="flex gap-2 mb-4">
      <div className="h-6 bg-gray-200 rounded-full w-20" />
      <div className="h-6 bg-gray-200 rounded-full w-16" />
    </div>
    <div className="h-6 bg-gray-200 rounded-full w-20 mb-4" />
    <div className="flex gap-4">
      <div className="h-4 bg-gray-200 rounded w-14" />
      <div className="h-4 bg-gray-200 rounded w-20" />
    </div>
  </div>
);

const Projects = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        let repos: Repository[];

        if (import.meta.env.DEV && import.meta.env.VITE_GITHUB_TOKEN) {
          const res = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
              Authorization: `bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: GRAPHQL_QUERY }),
          });
          const json = await res.json();
          if (json.errors) throw new Error(json.errors[0].message);
          repos = parseRepos(json.data.user.pinnedItems.nodes);
        } else {
          const res = await fetch('/.netlify/functions/github-repos');
          if (!res.ok) throw new Error('Function error');
          repos = await res.json();
        }

        setRepos(repos);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4">
        <div className="h-9 bg-gray-200 rounded w-52 mx-auto mb-8 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map(i => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  if (error || repos.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-96 gap-4 text-center px-4">
        <FaGithub className="text-5xl text-gray-400" />
        <p className="text-gray-600 text-lg">Could not load projects right now.</p>
        <a
          href="https://github.com/igarridosi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 border-2 border-gray-800 bg-white hover:bg-gray-800 hover:text-white transition-colors duration-200 font-medium"
        >
          <FaGithub />
          View GitHub profile
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-8 text-center">
        My Pinned Projects
      </h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.7 }}
      >
        {repos.map((repo) => (
          <motion.div
            key={repo.name}
            className="bg-white p-4 sm:p-6 rounded-lg shadow-[3px_3px_0px_0px_rgba(31,41,55)] sm:shadow-[5px_5px_0px_0px_rgba(31,41,55)] border-2 border-gray-800 hover:shadow-[5px_5px_0px_0px_rgba(31,41,55)] sm:hover:shadow-[8px_8px_0px_0px_rgba(31,41,55)] transition-all duration-200"
          >
            <h3 className="text-base sm:text-xl font-semibold text-gray-800 mb-2">{repo.name}</h3>
            <p className="text-gray-600 mb-4 text-sm sm:text-base h-16 sm:h-20 overflow-y-auto">
              {repo.description || 'No description available'}
            </p>
            {repo.topics?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {repo.topics.map((topic) => (
                  <span key={topic} className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full">
                    {topic}
                  </span>
                ))}
              </div>
            )}
            {repo.language && (
              <div className="mb-4">
                <span className="inline-flex items-center px-3 py-1 text-sm bg-gray-700 text-white rounded-full">
                  {repo.language}
                </span>
              </div>
            )}
            <div className="flex gap-4">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
                <FaGithub className="text-xl" /><span>Code</span>
              </a>
              {repo.homepage && (
                <a href={repo.homepage} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
                  <FaExternalLinkAlt className="text-lg" /><span>Live Demo</span>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Projects;
