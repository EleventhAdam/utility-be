const express = require('express');
const router = express.Router();
const utilityRoute = require('./modules/utility/routes/utility');

const defaultRoutes = [
  {
    path: '/utility/v1',
    route: utilityRoute,
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
