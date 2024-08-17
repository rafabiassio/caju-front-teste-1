import Router from "~/router";
import Header from "~/components/Header";
import Layout from "~/components/Layout";
import Toast from "~/components/Toast";
import './index.css'

const App = () => {
  return (
    <>
      <Header />
      <Layout>
        <Router />
      </Layout>
      <Toast />
    </>
  );
}

export default App;
