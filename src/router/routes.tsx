import { lazy } from "react";
import { RouterType } from "~/types/router.types";

const DashboardPage = lazy(() => import('~/pages/Dashboard'));
const NewUserPage = lazy(() => import('~/pages/NewUser'));

export const ROUTES = {
  dashboard: '/dashboard',
  newUser: '/new-user'
}

export const DEFAULT_ROUTE = ROUTES.dashboard

const pageRoutes: RouterType[] = [
  {
    title: "Dashboard",
    path: ROUTES.dashboard,
    children: <DashboardPage />
  },
  {
    title: "Novo Usuário",
    path: ROUTES.newUser,
    children: <NewUserPage />
  },
];

export default pageRoutes;
