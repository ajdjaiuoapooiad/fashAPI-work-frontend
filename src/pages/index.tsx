import type { NextPage } from 'next';
import Head from 'next/head';
import SearchForm from '../components/SearchForm';
import SearchResults from '../components/SearchResults';
import LoadingIcon from '../components/LoadingIcon';
import { useSearch } from '../hooks/useSearch';
import GitHubRepository, { GitHubRepositoryProps } from "@/components/GitHubRepository";

const Home: NextPage = () => {
  const {
    keyword,
    username,
    results,
    loading,
    error,
    setKeyword,
    setUsername,
    handleSearch,
  } = useSearch();

  return (
    <div className="flex flex-col min-h-screen py-2">
      <Head>
        <title>GitHub リポジトリ検索</title>
        <meta name="description" content="キーワードとユーザー名で GitHub リポジトリを検索します" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold ">
          GitHub Repository Search
        </h1>

        <div className="mt-6">
          <SearchForm
            keyword={keyword}
            username={username}
            setKeyword={setKeyword}
            setUsername={setUsername}
            onSearch={handleSearch}
          />
        </div>

        {loading && <LoadingIcon />}

        {error && <p className="text-red-500 mt-4">エラーが発生しました: {error}</p>}

        {results && results.length > 0 && (
          <div className="mt-8 w-full max-w-lg">
            <SearchResults repositories={results} />
          </div>
        )}

        {results && results.length === 0 && !loading && !error && (
          <p className="mt-4">検索結果はありません。</p>
        )}
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <p className="text-gray-500">Powered by Next.js and GitHub API</p>
      </footer>
    </div>
  );
};

export default Home;