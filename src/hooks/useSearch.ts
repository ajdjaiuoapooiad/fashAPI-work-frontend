import { useState, useCallback } from 'react';
import GitHubRepository, { GitHubRepositoryProps } from "../components/GitHubRepository";

interface SearchResult {
  items: GitHubRepositoryProps[]; // GitHubRepositoryProps の配列にする
  total_count?: number;
}

export const useSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [username, setUsername] = useState('');
  const [results, setResults] = useState<GitHubRepositoryProps[] | null>(null); // results の型も GitHubRepositoryProps[] に変更
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // （追加機能で実装する場合）
  // const [sortOption, setSortOption] = useState<string | null>(null);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState<number | null>(null);

  const handleSearch = useCallback(async () => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/search?keyword=${keyword}&username=${username}`); // バックエンドの API エンドポイント
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || `HTTP error! status: ${response.status}`);
        return;
      }
      const data: SearchResult = await response.json();
      setResults(data.items);
      // （追加機能で実装する場合）
      // setTotalPages(Math.ceil((data.total_count || 0) / 50));
      // setCurrentPage(1); // 検索ごとに最初のページに戻る
    } catch (e: any) {
      setError(e.message || '検索中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  }, [keyword, username]); // 依存配列に検索条件を含める

  // （追加機能で実装する場合）
  // const goToPage = useCallback(async (page: number) => {
  //   setLoading(true);
  //   setError(null);
  //   setCurrentPage(page);
  //   try {
  //     const response = await fetch(`/api/search?keyword=${keyword}&username=${username}&page=${page}`);
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       setError(errorData.message || `HTTP error! status: ${response.status}`);
  //       return;
  //     }
  //     const data: SearchResult = await response.json();
  //     setResults(data.items);
  //   } catch (e: any) {
  //     setError(e.message || 'ページ移動中にエラーが発生しました');
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [keyword, username]);

  return {
    keyword,
    username,
    results,
    loading,
    error,
    setKeyword,
    setUsername,
    handleSearch,
    // （追加機能で実装する場合）
    // sortOption,
    // setSortOption,
    // currentPage,
    // totalPages,
    // goToPage,
  };
};