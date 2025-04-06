import React, { useEffect, useState } from 'react';
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

const Projects = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPinnedRepos = async () => {
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        if (!token) {
          throw new Error('GitHub token not found in environment variables');
        }

        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `bearer ${token}`, // Necesitarás un token de GitHub
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              {
                user(login: "igarridosi") {
                  pinnedItems(first: 6, types: REPOSITORY) {
                    nodes {
                      ... on Repository {
                        name
                        description
                        url
                        homepageUrl
                        repositoryTopics(first: 10) {
                          nodes {
                            topic {
                              name
                            }
                          }
                        }
                        primaryLanguage {
                          name
                        }
                      }
                    }
                  }
                }
              }
            `
          }),
        });
        
        const data = await response.json();
        const pinnedRepos = data.data.user.pinnedItems.nodes.map((repo: any) => ({
          name: repo.name,
          description: repo.description,
          html_url: repo.url,
          homepage: repo.homepageUrl,
          topics: repo.repositoryTopics.nodes.map((topic: any) => topic.topic.name),
          language: repo.primaryLanguage?.name
        }));
        
        setRepos(pinnedRepos);
      } catch (error) {
        console.error('Error fetching pinned repos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPinnedRepos();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.15,
        when: "beforeChildren" // Esto asegura que el contenedor aparezca antes que los hijos
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-700"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        My Pinned Projects
      </h2>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.7 }}
      >
        {repos.map((repo) => (
          <motion.div
            key={repo.name}
            className="bg-white p-6 rounded-lg shadow-[5px_5px_0px_0px_rgba(31,41,55)] border-3 border-gray-800 hover:shadow-[8px_8px_0px_0px_rgba(31,41,55)] transition-all duration-200"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {repo.name}
            </h3>
            
            <p className="text-gray-600 mb-4 h-20 overflow-y-auto">
              {repo.description || 'No description available'}
            </p>

            {repo.topics && repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {repo.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-full"
                  >
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
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <FaGithub className="text-xl" />
                <span>Code</span>
              </a>
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <FaExternalLinkAlt className="text-lg" />
                  <span>Live Demo</span>
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
