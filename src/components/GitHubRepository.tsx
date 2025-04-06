import React from 'react';

export interface GitHubRepositoryProps {
  name: string;
  description: string | null;
  html_url: string;
}

const GitHubRepository: React.FC<GitHubRepositoryProps> = ({ name, description, html_url }) => {
  return (
    <div className="mb-2">
      <h3 className="text-lg font-bold text-blue-500 hover:underline">
        <a href={html_url} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </h3>
      {description && <p className="text-gray-600 text-sm mt-1">{description}</p>}
    </div>
  );
};

export default GitHubRepository;