const express = require("express");
const { createFile } = require("./storage.controller");
const router = express.Router();

router.post("/create", createFile);

module.exports = router;
