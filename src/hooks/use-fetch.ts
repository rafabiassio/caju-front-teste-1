import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import apiClient from '../api/apiClient';

interface Error {
  message: string;
  status?: number;
}

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await apiClient.get(url);
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
    };

    fetchData();
  }, []);

  return {
    data,
    loading,
    error
  };
};

export default useFetch;