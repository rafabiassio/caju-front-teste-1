import Router from "~/router";
import Header from "~/components/Header";
import Layout from "~/components/Layout";
import './index.css'

const App = () => {
  return (
    <>
      <Header />
      <Layout>
        <Router />
      </Layout>
    </>
  );
}

export default App;
