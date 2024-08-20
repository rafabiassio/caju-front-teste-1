import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { RouterType } from "~/types/router.types";
import pageRoutes, { DEFAULT_ROUTE } from "./routes";

const Router = () => {
  const routes = pageRoutes.map(({ title, path, children }: RouterType) => {
    return <Route exact key={title} path={path}>
      {children}
    </Route>;
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
