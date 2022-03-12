const ChildController = require("../controllers/child.controllers");
const { authenticate } = require("../config/jwt.config");
module.exports = (app) => {
  app.get("/api/children/", ChildController.findAllChildren);
  app.get("/api/children/:id", ChildController.getOneChild);
  app.delete("/api/children/:id", ChildController.deleteOneChild);
  app.post("/api/children", authenticate, ChildController.createChild);
  app.put("/api/children/:id", ChildController.updateOneChild);
  app.get(
    "/api/children/fromuser/:username",
    authenticate,
    ChildController.findAllChildrenByUser
  );
};
