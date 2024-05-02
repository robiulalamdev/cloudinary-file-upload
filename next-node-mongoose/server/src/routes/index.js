const express = require("express");
const router = express.Router();

// routes
const storageRoute = require("../modules/storage/storage.route");

const moduleRoutes = [
  {
    path: "/storages",
    route: storageRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
module.exports = { routers: router };
