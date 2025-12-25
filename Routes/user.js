const express = require("express");
const router = express.Router();
const User = require("../Models/users");
const {
    handleGetAllUsers,
    handlegetUserById,
    handDeleteUserById,
    handleUpdateUserById,
    handleAddUser,
} = require("../Controllers/user");

// all users:client side rendering
router
    .route("/")
    .get(handleGetAllUsers)
    .post( handleAddUser);

// single user
router
  .route("/:id")
  .get(handlegetUserById)
  .patch(handleUpdateUserById)
  .delete(handDeleteUserById);
module.exports = router;
