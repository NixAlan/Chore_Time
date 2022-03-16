const ChoreController = require("../controllers/chore.controllers");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.get("/api/chore", ChoreController.getAllChores);
  app.get("/api/chore/:id", ChoreController.getOneChore);
  app.delete("/api/chore/:completedBy", ChoreController.deleteChores);
  app.post("/api/chore", authenticate, ChoreController.creatNewChore);
  app.put("/api/chore/:id", ChoreController.updateOneChore);
  app.get(
    "/api/chore/fromuser/:username",
    authenticate,
    ChoreController.findAllChoresByUser
  );
};
