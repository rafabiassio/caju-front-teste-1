import { useContext } from "react";
import { LoaderContext } from "~/context/LoaderContext";

export const useLoaderContext = (): LoaderContext => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("LoaderProvider faltante");
  }
  return context;
}