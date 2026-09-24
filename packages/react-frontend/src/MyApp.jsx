 // src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";


function MyApp() {
  const [characters, setCharacters] = useState([]);
  

function removeOneCharacter(person) {
  fetch(`http://localhost:8000/users/${person._id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.status !== 204) {
        throw new Error("User was not deleted");
      }

      setCharacters(
        characters.filter((character) => character._id !== person._id)
      );
    })
    .catch((error) => {
      console.log(error);
    });
}
function postUser(person) {
  return fetch("http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });
}
  function updateList(person) {
  postUser(person)
    .then((response) => {
      if (response.status !== 201) {
        throw new Error("User was not created");
      }

      return response.json();
    })
    .then((newUser) => {
      setCharacters([...characters, newUser]);
    })
    .catch((error) => {
      console.log(error);
    });
}

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
  fetchUsers()
    .then((res) => res.json())
    .then((json) => setCharacters(json["users_list"]))
    .catch((error) => {
      console.log(error);
    });
}, []);

function postUser(person) {
  const promise = fetch("Http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  });

  return promise;
}

 return (
  <div className="container">
    <Table characterData={characters} removeCharacter={removeOneCharacter} />
    <Form handleSubmit={updateList} />  
    </div>
);
}

export default MyApp;