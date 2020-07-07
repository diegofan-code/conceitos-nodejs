const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id:uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs} = request.body;

  const repositoryApp = repositories.find(repository => repository.id == id);

  if(!repositoryApp) {
    return response.status(400).send();
  };

  const repository = {
    id,
    title,
    url,
    techs,
    likes: 0,
  };

  return response.json(repository);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryApp = repositories.find(repository => repository.id == id);

  if (!repositoryApp) {
    return response.status(400).send();
  }

  repositories.splice(repositoryApp)

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id == id);

  if(!repository) {
    return response.status(400).send();
  }
  
  repository.likes += 1;

  return response.json(repository);

});

module.exports = app;
