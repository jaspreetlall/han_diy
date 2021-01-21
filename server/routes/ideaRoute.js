const { response } = require("express");
const express = require("express");
const router = express.Router();
const ideas = require("../data/data.json");
const { v4: uuid } = require('uuid');
const fs = require('fs');

router
// Endpoint to get the list of all ideas
.get('/', (_request, response) => {
  return response.status(200).send(ideas);
})
// Endpoint to post an idea
.post('/', (request, response) => {
  let ideaToBeAdded = {
    "id": uuid(),
    "userId": request.body.userId,
    "title": request.body.title,
    "description": request.body.description,
    "category": request.body.category,
    "tools": request.body.tools,
    "parts": request.body.parts,
    "completed": false,
    "link": request.body.link,
    "notes": request.body.notes,
    "timestamp": Date.now()
  }

  fs.readFile('./data/data.json', (err, data) => {
    if(err) throw err;
    // Storing ideas into an array
    let originalIdeasArray = JSON.parse(data);
    // Adding new idea with original array
    // and storing into new array 
    let ideasArrayWithNewIdea = [...originalIdeasArray, ideaToBeAdded];
    // Writing the new array to the file
    fs.writeFile('./data/data.json',
      JSON.stringify(ideasArrayWithNewIdea), err => console.log(err))
  })

  return response.status(201).send(ideaToBeAdded);
})

router
// Endpoint to get idea by id
.get('/:id', (request, result) => {
  let requestedIdeaId = request.params.id;
  let requestedIdea = ideas.find(idea => idea.id === requestedIdeaId);
  return result.status(200).send(requestedIdea);
})

module.exports = router;