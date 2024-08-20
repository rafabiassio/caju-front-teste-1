import { ReactNode, createContext, useState } from 'react';
import Loader from '~/components/Loader';

interface LoaderProvider {
  children: ReactNode;
};

export interface LoaderContext {
  showLoader: () => void;
  hideLoader: () => void;
};

export const LoaderContext = createContext<LoaderContext | undefined>(undefined);

export const LoaderProvider = ({ children }: LoaderProvider) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <LoaderContext.Provider value={{
      showLoader: () => {
        setIsVisible(true);
      },
      hideLoader: () => {
        setIsVisible(false);
      }
    }}>
      {isVisible && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
};