const ChoreController = require("../controllers/chore.controllers");

module.exports = (app) => {
  app.get("/api/chore", ChoreController.getAllChores);
  app.get("/api/chore/:id", ChoreController.getOneChore);
  app.delete("/api/chore/:completedBy", ChoreController.deleteChores);
  app.post("/api/chore", ChoreController.creatNewChore);
  app.put("/api/chore/:id", ChoreController.updateOneChore);
};
