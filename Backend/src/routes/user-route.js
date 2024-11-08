import express from "express";
import {
  register,
  login,
  logout,
  refreshToken,
  updatePassword,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updateProfile,
  getSingleUserDetail,
  updateUserRole,
  deleteUser
} from "../controllers/user-controller.js";
// import { verifyToken } from "../middlewares/auth-middleware.js";
import {
  verifyToken,
  adminRoleMiddleware,
} from "../middlewares/auth-middleware.js";
const router = express.Router();
import { upload } from "../middlewares/multer-middleware.js";

const uploadMiddleware = upload.fields([{ name: "avatar", maxCount: 1 }]);

router.post("/register", uploadMiddleware, register);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.put("/update-password/:id", updatePassword);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/refresh-token", refreshToken);
router.put("/update-profile", verifyToken, updateProfile);

//ADMIN ROUTE
router.get(
  "/admin/get-user-detial",
  verifyToken,
  adminRoleMiddleware("admin"),
  getUserDetails
);

router.get(
  "/admin/get-single-user-detial/:id",
  verifyToken,
  adminRoleMiddleware("admin"),
  getSingleUserDetail
);

router.put(
  "/admin/update-user-role/:id",
  verifyToken,
  adminRoleMiddleware("admin"),
  updateUserRole
);

router.
delete(
  "/admin/delete-user/:id",
  verifyToken,
  adminRoleMiddleware("admin"),
  deleteUser
);

export default router;
