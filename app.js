// const express = require("express");
import "dotenv/config";
import express from "express";
import session from "express-session";
import HelloRoutes from "./hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./Modules/routes.js";
import AssignmentRoutes from "./assignments/routes.js";
import UserRoutes from "./users/routes.js";
import cors from "cors";
import mongoose from "mongoose";
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING 
// || 'mongodb://127.0.0.1:27017/kanbas
mongoose.connect(CONNECTION_STRING);
// mongoose.connect("mongodb://localhost:27017/kanbas-cs5610-fa23");
const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL,  
credentials: true   }));
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    };
}
app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
HelloRoutes(app);
app.listen(process.env.PORT || 4000);
