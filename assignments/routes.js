import Database from "../Database/index.js";

function AssignmentRoutes(app) {
  app.delete("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    Database.assignments = Database.assignments.filter((a) => a._id !== id);
    res.sendStatus(200);
  });
  app.put("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const index = Database.assignments.findIndex((assignment) => assignment._id === id);
    if (index === -1) {
      res.status(404).send("Assignment not found");
      return;
    };
    Database.assignments[index] = {
      ...Database.assignments[index],
      ...req.body
    };
    res.sendStatus(204);
  });
  app.post("/api/courses/:id/assignments", (req, res) => {
    const { id } = req.params;
    const newAssignment = {
      ...req.body,
      course: id,
      _id: new Date().getTime().toString(),
    };
    Database.assignments.push(newAssignment);
    res.send(newAssignment);
  });
  app.get("/api/courses/:id/assignments", (req, res) => {
    const { id } = req.params;
    const assignments = Database.assignments.filter((a) => a.course === id);
    res.send(assignments);
  });
}

export default AssignmentRoutes;
