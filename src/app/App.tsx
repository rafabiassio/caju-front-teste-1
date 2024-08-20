import Router from "~/router";
import Header from "~/components/Header";
import Layout from "~/components/Layout";
import Toast from "~/components/Toast";
import { LoaderProvider } from "~/context/LoaderContext";
import './index.css'

const App = () => {
  return (
    <>
      <LoaderProvider>
        <Header />
        <Layout>
          <Router />
        </Layout>
        <Toast />
      </LoaderProvider>
    </>
  );
}

export default App;
