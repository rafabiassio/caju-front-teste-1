import { useCallback, useState } from 'react';
import apiClient from '~/api/apiClient';
import { ErrorType, handleApiError } from '~/utils/errorHandling';

const usePost = <T>(url: string) => {
  const [response, setResponse] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorType | null>(null);

  const postData = useCallback(async (requestData: T) => {
    setLoading(true);
    setError(null);

    try {
      const { data: response } = await apiClient.post(url, JSON.stringify(requestData));
      setResponse(response);
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
    sendPostData: postData
  };
};

export default usePost;
