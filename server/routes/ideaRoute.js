const express = require("express");
const router = express.Router();
const ideas = require("../data/data.json");

router
// Endpoint to get the list of all ideas
.get('/', (_request, result) => {
  return result.status(200).send(ideas);
})

router
// Endpoint to get idea by id
.get('/:id', (request, result) => {
  let requestedIdeaId = request.params.id;
  let requestedIdea = ideas.find(idea => idea.id === requestedIdeaId);
  return result.status(200).send(requestedIdea);
})

module.exports = router;