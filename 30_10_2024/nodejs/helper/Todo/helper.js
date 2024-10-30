const fs = require("fs");

export const readUserfile = () => {
  try {
    const data = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error when fetching users data:", error);
    return [];
  }
};

export const writeUsersFile = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error when update users data:", error);
    return false;
  }
};
