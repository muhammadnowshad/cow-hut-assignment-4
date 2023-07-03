import express from 'express'
import { UserRoutes } from '../modules/users/users.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { OrdersRoutes } from '../modules/orders/orders.route';
import { CowsRoutes } from '../modules/cows/cows.route';
import { AuthRoutes } from '../modules/auth/auth.route';

const router = express.Router()
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/orders',
    route: OrdersRoutes,
  },
  {
    path: '/cows',
    route: CowsRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },

]
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
