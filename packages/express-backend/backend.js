// backend.js
import express from "express";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const findUserByNameAndJob = (name, job) => {
return users.users_list.filter( (user) =>
(name === undefined || user.name === name) &&
(job === undefined || user.job === job)
);
};

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUserById = (id) => {
  const index = users.users_list.findIndex((user) => user.id === id);

  if (index === -1) {
    return undefined;
  }

  return users.users_list.splice(index, 1)[0];
};

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.get("/users", (req, res) => {
  const {name,job} = req.query;
  if (name != undefined || job != undefined) {
    let result = findUserByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.delete("/users/:id", (req, res) => {
  const deletedUser = deleteUserById(req.params.id);

  if (deletedUser === undefined) {
    res.status(404).send("Resource not found.");
    return;
  }

  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

setInterval(() => {}, 1000);