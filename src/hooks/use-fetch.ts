import { useCallback, useEffect, useMemo, useState } from 'react';
import apiClient from '~/api/apiClient';
import { ErrorType, handleApiError } from '~/utils/errorHandling';

type filterType = {
  filter: string;
  value: string;
}

const useFetch = <T>(url: string, ...filters: filterType[]) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const searchUrl: string = useMemo(() => {
    if (!filters || filters.length === 0) {
      return url
    }

    const filtersUrl = filters.map(filter => filter.value ? `?${filter.filter}=${filter.value}` : '')

    return `${url}${filtersUrl}`
  }, [url, ...filters])

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: response } = await apiClient.get(searchUrl);
      setData(response);
    } catch (error) {
      const apiError = handleApiError(error)
      setError(apiError)
    } finally {
      setLoading(false);
    }
  }, [searchUrl])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};

export default useFetch;