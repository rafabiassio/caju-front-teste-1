import { useCallback, useEffect, useMemo, useState } from 'react';
import { isAxiosError } from 'axios';
import apiClient from '../api/apiClient';

type filterType = {
  filter: string;
  value: string;
}

interface Error {
  message: string;
  status?: number;
}

const useFetch = <T>(url: string, ...filters: filterType[]) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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
      if (isAxiosError(error)) {
        const errorStatus = error.status
        let errorMessage = error.message

        if (errorStatus === 404) {
          errorMessage = 'Desculpe, a página ou o recurso que você está procurando não foi encontrado'
        }
        if (errorStatus === 500 || errorStatus === 502 || errorStatus === 503) {
          errorMessage = 'Desculpe, houve um problema no servidor e não conseguimos processar sua solicitação. Por favor, tente novamente mais tarde'
        }

        setError({
          message: errorMessage,
          status: errorStatus
        });
      } else {
        setError({
          message: 'Ocorreu um erro inesperado. Por favor, tente novamente',
        });
      }
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