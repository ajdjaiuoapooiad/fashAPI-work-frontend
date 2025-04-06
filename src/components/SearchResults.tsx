import React from 'react';
import { GitHubRepositoryProps } from './GitHubRepository';
import GitHubRepository from './GitHubRepository';

interface SearchResultsProps {
  repositories: GitHubRepositoryProps[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ repositories }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">検索結果</h2>
      {repositories.length > 0 ? (
        <ul className="list-none p-0">
          {repositories.map((repo) => (
            <li key={repo.name} className="border rounded p-4 mb-4">
              <GitHubRepository
                name={repo.name}
                description={repo.description}
                html_url={repo.html_url}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>検索結果はありません。</p>
      )}
    </div>
  );
};

export default SearchResults;