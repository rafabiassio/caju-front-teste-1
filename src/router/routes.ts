import { RouterType } from "~/types/router.types";
import DashboardPage from "~/pages/Dashboard";
import NewUserPage from "~/pages/NewUser";

export const ROUTES = {
  dashboard: '/dashboard',
  newUser: '/new-user'
}

export const DEFAULT_ROUTE = ROUTES.dashboard

const pageRoutes: RouterType[] = [
  {
    title: "Dashboard",
    path: ROUTES.dashboard,
    element: DashboardPage
  },
  {
    title: "Novo Usuário",
    path: ROUTES.newUser,
    element: NewUserPage
  },
];

export default pageRoutes;
