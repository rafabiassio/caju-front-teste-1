import { RouterType } from "~/types/router.types";
import DashboardPage from "~/pages/Dashboard";
import NewUserPage from "~/pages/NewUser";
import { DashboardProvider } from '~/context/DashboardContext';

export const ROUTES = {
  dashboard: '/dashboard',
  newUser: '/new-user'
}

export const DEFAULT_ROUTE = ROUTES.dashboard

const pageRoutes: RouterType[] = [
  {
    title: "Dashboard",
    path: ROUTES.dashboard,
    children: (
      <DashboardProvider>
        <DashboardPage />
      </DashboardProvider>
    )
  },
  {
    title: "Novo Usuário",
    path: ROUTES.newUser,
    children: <NewUserPage />
  },
];

export default pageRoutes;
