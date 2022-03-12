const ChildController = require("../controllers/child.controllers");

module.exports = (app) => {
  app.get("/api/children/", ChildController.findAllChildren);
  app.get("/api/children/:id", ChildController.getOneChild);
  app.delete("/api/children/:id", ChildController.deleteOneChild);
  app.post("/api/children", ChildController.createChild);
  app.put("/api/children/:id", ChildController.updateOneChild);
};
