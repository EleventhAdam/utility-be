const express = require('express');
const router = express.Router();

const commonRoutes = require('./chains/common/routes');
const polygonRoutes = require('./chains/polygon/routes');

const defaultRoutes = [
  {
    path: '/',
    route: commonRoutes,
  },
  {
    path: '/polygon',
    route: polygonRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
