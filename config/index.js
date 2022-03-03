// specify config with hbs, db, views, paths etc
// commit it all on dev !! 
const express = require("express");

const hbs = require("hbs");

const logger = require("morgan");

const cookieParser = require("cookie-parser");

const favicon = require("serve-favicon");

const path = require("path");

// Middleware configuration
module.exports = (app) => {

    app.use(logger("dev"));
  
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
  
    app.set("views", path.join(__dirname, "..", "/views"));
    app.set("view engine", "hbs");

    // Handles access to the public folder
    app.use(express.static(path.join(__dirname, "..", "/public")));

    app.use(
      favicon(path.join(__dirname, "..", "public", "images", "favicon.ico")));
  };
  