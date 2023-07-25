const express = require('express');
const router = express.Router();
const userRoute = require('./modules/users/routes/user');
const utilityRoute = require('./modules/utility/routes/utility')

const defaultRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path:'/utilities',
    route:utilityRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* ignore next in prod */
// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

module.exports = router;
