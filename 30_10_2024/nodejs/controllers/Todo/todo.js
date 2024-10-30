// Chua sua lai
const path = require("path");

import { readUserfile, writeUsersFile } from "../../helper/Todo/helper";
const usersFilePath = path.join(__dirname, "users.json");


app.get("/", (req, res) => {
    res.json({
      msg: "Hello World!",
    });
  });
  
  app.get("/api/users", (req, res) => {
    try {
      const users = readUsersFile();
      res.json({
        success: true,
        payload: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 500,
          message: "Internal server error",
        },
      });
    }
  });
  
  app.post("/api/create-user", (req, res) => {
    try {
      const users = readUsersFile();
  
      const newUser = {
        id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        name: req.body.name,
      };
  
      users.push(newUser);
  
      if (writeUsersFile(users)) {
        res.status(201).json({
          success: true,
          payload: newUser,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 500,
          message: "Internal server error",
        },
      });
    }
  });
  
  app.put("/api/update-user/:id", (req, res) => {
    try {
      const users = readUsersFile();
      const updatedUser = {
        id: parseInt(req.params.id),
        name: req.body.name,
      };
      const index = users.findIndex((u) => u.id === updatedUser.id);
  
      if (index === -1) {
        return res.status(404).json({
          success: false,
          error: {
            code: 404,
            message: "User not found",
          },
        });
      }
  
      users[index] = updatedUser;
  
      if (writeUsersFile(users)) {
        res.json({
          success: true,
          payload: updatedUser,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 500,
          message: "Internal server error",
        },
      });
    }
  });
  
  app.delete("/api/delete-user/:id", (req, res) => {
    try {
      let users = readUsersFile();
      const id = parseInt(req.params.id);
      const filteredUsers = users.filter((u) => u.id !== id);
  
      if (filteredUsers.length === users.length) {
        return res.status(404).json({
          success: false,
          error: {
            code: 404,
            message: "User not found",
          },
        });
      }
  
      if (writeUsersFile(filteredUsers)) {
        res.json({
          success: true,
          message: "User deleted successfully",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: 500,
          message: "Internal server error",
        },
      });
    }
  });