const express = require("express");
const router = express.Router();

const firebaseAuthController = require("../controllers/firebase-auth-controller");

const verifyToken = require("../middleware");
const PostsController = require("../controllers/posts-controller.js");
router.get("/api/posts", verifyToken, PostsController.getPosts);

router.post("/api/register", firebaseAuthController.registerUser);
router.post("/api/login", firebaseAuthController.loginUser);
router.post("/api/logout", firebaseAuthController.logoutUser);
router.post("/api/reset-password", firebaseAuthController.resetPassword);

module.exports = router;
