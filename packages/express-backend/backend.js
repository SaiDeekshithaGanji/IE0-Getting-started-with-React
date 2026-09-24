// backend.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "./services/user-service.js";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));

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
function generateId() {
  return Math.random().toString(36).slice(2, 8);
}


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.get("/users", (req, res) => {
  const { name, job } = req.query;

  userService
    .getUsers(name, job)
    .then((users) => res.send({ users_list: users }))
    .catch((error) => {
      console.log(error);
      res.status(500).send("Unable to fetch users.");
    });
});

app.get("/users/:id", (req, res) => {
  userService
    .findUserById(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Unable to fetch user.");
    });
});

app.post("/users", (req, res) => {
  userService
    .addUser(req.body)
    .then((user) => res.status(201).send(user))
    .catch((error) => {
      console.log(error);
      res.status(400).send("Unable to add user.");
    });
});

app.delete("/users/:id", (req, res) => {
  userService
    .removeUser(req.params.id)
    .then((deletedUser) => {
      if (deletedUser === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.status(204).send();
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Unable to delete user.");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

setInterval(() => {}, 1000);