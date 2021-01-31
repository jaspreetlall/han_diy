const { response, request } = require("express");
const express = require("express");
const router = express.Router();
const ideas = require("../data/data.json");
const { v4: uuid } = require('uuid');
const fs = require('fs');

// Function to split string at commas to an array
const splitStringAtCommaToArray = (stringToSplit) => {
  let arrayFromString = stringToSplit.split(', ');
  return arrayFromString;
}

router
// Endpoint to get the list of all ideas
.get('/', (_request, response) => {
  let ideaList = [];
  ideas.forEach((idea) => {
    let ideaObject = {
      "id": idea.id,
      "title": idea.title,
      "imageUrl": idea.imageUrl,
      "category" : idea.category,
      "done": idea.done,
    }
    ideaList.push(ideaObject);
  })
  return response.status(200).send(ideaList);
})
// Endpoint to post an idea
.post('/', (request, response) => {

  let ideaToBeAdded = {
    "id": uuid(),
    "userId": request.body.userId,
    "title": request.body.title,
    "imageUrl": request.body.imageUrl || "http://localhost:8080/images/imageplaceholder.jpg",
    "description": request.body.description,
    "category": request.body.category,
    // Splitting incoming comma separated string
    // to store tools and parts needed
    "tools": splitStringAtCommaToArray(request.body.tools),
    "parts": splitStringAtCommaToArray(request.body.parts),
    "done": false,
    "link": request.body.link,
    "notes": request.body.notes,
    "timestamp": Date.now()
  }

  fs.readFile('./data/data.json', (err, data) => {
    if(err) throw err;
    // Storing existing ideas into an array
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
  let idOfRequestedIdea = request.params.id;
  let requestedIdea = ideas.find(idea => idea.id === idOfRequestedIdea);
  return result.status(200).send(requestedIdea);
})

// Endpoint to update existing idea by id
.put('/:id', (request, response) => {
  let idOfIdeaToUpdate = request.params.id;
  let updatedIdea
  // Retrieve idea to update
  ideaToUpdate = ideas.find(idea => idea.id === idOfIdeaToUpdate);

  if(ideaToUpdate.id) {
    updatedIdea = {
      "id": ideaToUpdate.id,
      "userId": ideaToUpdate.userId,
      "title": request.body.title,
      "imageUrl": request.body.imageUrl || "localhost:8080/images/imageplaceholder.jpg",
      "description": request.body.description,
      "category": request.body.category,
      // Splitting incoming comma separated string
      // to store tools and parts needed
      "tools": splitStringAtCommaToArray(request.body.tools),
      "parts": splitStringAtCommaToArray(request.body.parts),
      "done": request.body.done,
      "link": request.body.link,
      "notes": request.body.notes,
      "timestamp": ideaToUpdate.timestamp
    }
  
    fs.readFile('./data/data.json', (err, data) => {
      if(err) throw err;
      // Storing existing ideas into an array
      let originalIdeasArray = JSON.parse(data);
      
      // Storing all ideas except the one to be update
      let ideasArrayWithoutUpdatedIdea = originalIdeasArray.filter(idea => idea.id !== idOfIdeaToUpdate);
  
      // New array with updated idea
      let ideasArrayIncludeUpdatedIdea = [...ideasArrayWithoutUpdatedIdea, updatedIdea];
  
      // Writing the new array to the file
      fs.writeFile('./data/data.json',
        JSON.stringify(ideasArrayIncludeUpdatedIdea), err => console.log(err))
    })
  } else return res.status(400).send("Please send valid data in correct format.")
  return response.status(200).send(updatedIdea);
})

// Endpoint to delete idea by id
.delete('/:id', (request, response) => {
  let idOfIdeaToDelete = request.params.id;
  fs.readFile('./data/data.json', (err, data) => {
    if(err) throw err;
    // Storing existing ideas into an array
    let originalIdeasArray = JSON.parse(data);
    // Storing all ideas except the one to be deleted
    let ideasArrayAfterDelete = originalIdeasArray.filter(idea => idea.id !== idOfIdeaToDelete);
    // Writing the new array to the file
    fs.writeFile('./data/data.json',
      JSON.stringify(ideasArrayAfterDelete), err => console.log(err))
  })
  return response.status(200).send(`${idOfIdeaToDelete} was successfully deleted.`);
})

module.exports = router;