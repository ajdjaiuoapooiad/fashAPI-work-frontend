import React, { ChangeEvent, FormEventHandler } from 'react';

interface SearchFormProps {
  keyword: string;
  username: string;
  setKeyword: (keyword: string) => void;
  setUsername: (username: string) => void;
  onSearch: () => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  keyword,
  username,
  setKeyword,
  setUsername,
  onSearch,
}) => {
  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label htmlFor="keyword" className="block text-gray-700 text-sm font-bold mb-2">
          キーワード:
        </label>
        <input
          type="text"
          id="keyword"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="例: react"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
          ユーザー名:
        </label>
        <input
          type="text"
          id="username"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={username}
          onChange={handleUsernameChange}
          placeholder="例: facebook"
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        検索
      </button>
    </form>
  );
};

export default SearchForm;