import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import pageRoutes, { DEFAULT_ROUTE } from "./routes";
import { RouterType } from "~/types/router.types";

const Router: React.FC = () => {
  const routes = pageRoutes.map(({ title, path, element }: RouterType) => {
    return <Route exact key={title} path={path} component={element} />;
  });

  return (
    <HashRouter>
      <Switch>
        {routes}
        <Route exact path="*">
          <Redirect to={DEFAULT_ROUTE} />
        </Route>
      </Switch>
    </HashRouter>
  )
};


export default Router;
