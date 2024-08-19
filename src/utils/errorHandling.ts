import { isAxiosError } from 'axios';

export type ErrorType = {
  message: string;
  status?: number;
}

const handleApiError = (error: any): ErrorType => {
  if (isAxiosError(error)) {
    const errorStatus = error.status;
    let errorMessage: string = error.message;

    if (errorStatus === 404) {
      errorMessage = 'Desculpe, a página ou o recurso que você está procurando não foi encontrado';
    }
    if (errorStatus === 500 || errorStatus === 502 || errorStatus === 503) {
      errorMessage = 'Desculpe, houve um problema no servidor e não conseguimos processar sua solicitação. Por favor, tente novamente mais tarde';
    }

    return { message: errorMessage, status: errorStatus };
  } else {
    return { message: 'Ocorreu um erro inesperado. Por favor, tente novamente' };
  }
};

export { handleApiError }