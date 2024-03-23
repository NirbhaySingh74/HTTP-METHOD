import express, { response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

//Add middleware
app.use(express.json());

const mockUSers = [
  { id: 1, username: "nirbhay Kumar", age: 21, village: "Dhekcha" },
  { id: 2, username: "kunal Arya", age: 22, village: "Dhaka" },
  { id: 3, username: "Deepak Kumar", age: 22, village: "Motihari" },
  { id: 4, username: "Gaurav Kumar", age: 22, village: "Motihari" },
  { id: 5, username: "Bipul Kumar", age: 22, village: "Motihari" },
  { id: 6, username: "Ram Kumar", age: 22, village: "Motihari" },
];

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

app.get("/", (req, res) => {
  res.end("This is home page");
});

// GET all users
app.get("/api/users", (req, res) => {
  console.log(req.query);
  const { filter, value } = req.query;

  // Filter users if filter and value are provided
  if (filter && value) {
    const filteredUsers = mockUSers.filter((user) =>
      user[filter].includes(value)
    );
    return res.send(filteredUsers);
  }

  // Return all users if no filter provided
  res.send(mockUSers);
});

// GET user by ID
app.get("/api/users/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) return res.status(400).send("Bad Request");

  const findUser = mockUSers.find((user) => user.id === parsedId);
  if (!findUser) return res.status(404).send("Not found");

  return res.send(findUser);
});

// POST request for creating a new user
app.post("/api/users", (req, res) => {
  console.log(req.body);
  // Process the request body to create a new user
  // Send an appropriate response
  const { body } = req;
  const newUSer = { id: mockUSers[mockUSers.length - 1].id + 1, ...body };
  mockUSers.push(newUSer);
  return res.status(201).send(newUSer);
});

app.get("/about", (req, res) => {
  res.end("This is about page");
});

//PUT
app.put("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parseId = parseInt(id);
  if (isNaN(parseId)) return res.sendStatus(400);

  const findUSerIndex = mockUSers.findIndex((user) => user.id === parseId);
  if (findUSerIndex === -1) return res.sendStatus(400);

  mockUSers[findUSerIndex] = { id: parseId, ...body };
  return res.sendStatus(200);
});

//PATCH Request

app.patch("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parseId = parseInt(id);
  if (isNaN(parseId)) return res.sendStatus(400);

  const findUSerIndex = mockUSers.findIndex((user) => user.id === parseId);
  if (findUSerIndex === -1) return res.sendStatus(400);

  mockUSers[findUSerIndex] = { ...mockUSers[findUSerIndex], ...body };
  return res.sendStatus(200);
});

//DELETE
app.delete("/api/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);

  const findUserIndex = mockUSers.findIndex((user) => user.id === parsedId);
  mockUSers.splice(findUserIndex);
  return res.sendStatus(200);
});
