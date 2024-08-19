import { useCallback, useState } from 'react';
import apiClient from '~/api/apiClient';
import { ErrorType, handleApiError } from '~/utils/errorHandling';

const useDelete = (url: string) => {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const deleteData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: responseData } = await apiClient.delete(url);
      setResponse(responseData);
    } catch (error) {
      const apiError = handleApiError(error);
      setError(apiError);
    } finally {
      setLoading(false);
    }
  }, [url]);

  return {
    responseData: response,
    loading,
    error,
    sendDeleteData: deleteData
  };
};

export default useDelete;