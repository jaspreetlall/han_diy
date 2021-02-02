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
  // Reading data file for up-to-date data
  fs.readFile('./data/data.json', (err, data) => {
    if(err) throw err;
    else {
      // Storing existing ideas into an array
      let originalIdeasArray = JSON.parse(data);
      let ideaList = [];
      // Creating idea object with selective data
      originalIdeasArray.forEach((idea) => {
        let ideaObject = {
          "id": idea.id,
          "title": idea.title,
          "imageUrl": idea.imageUrl,
          "category" : idea.category,
          "done": idea.done,
          "timestamp": idea.timestamp
        }
        // Pushing into the array to be sent as a response
        ideaList.push(ideaObject);
      })
      // Returning the idea array sorted by newest ideas at 1st
      // based on the timestamp
      return response.status(200).send(ideaList.sort((a,b) => b.timestamp - a.timestamp));
    }
  })
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
  // Reading data file for up-to-date data
  fs.readFile('./data/data.json', (err, data) => {
    if(err) throw err;
    // Storing existing ideas into an array
    let originalIdeasArray = JSON.parse(data);
    // Adding new idea with original array
    // and storing into new array 
    let ideasArrayWithNewIdea = [...originalIdeasArray, ideaToBeAdded];
    // Writing the new array to the file
    fs.writeFile('./data/data.json',
    JSON.stringify(ideasArrayWithNewIdea, null, 2), err => {
      if(err) console.log(err);
      else {
        // Reading data file for up-to-date data
        fs.readFile('./data/data.json', (err, data) => {
          if(err) console.log(err);
          else {
            // Storing existing ideas into an array
            let originalIdeasArray = JSON.parse(data);
            // Finding and storing new idea
            let ideaJustAdded = originalIdeasArray.find(idea => idea.id === ideaToBeAdded.id);
            // Returning the newly saved idea object as response 
            return response.status(201).send(ideaJustAdded);
          }
        })
      }
    })
  })
})

router
// Endpoint to get idea by id
.get('/:id', (request, result) => {
  let idOfRequestedIdea = request.params.id;
  // Reading data file for up-to-date data
  fs.readFile('./data/data.json', (err, data) => {
    if(err) throw err;
    else {
      // Storing existing ideas into an array
      let originalIdeasArray = JSON.parse(data);
      // Finding & storing the idea object for requested idea
      let requestedIdea = originalIdeasArray.find(idea => idea.id === idOfRequestedIdea);
      // Returning the requested idea
      return result.status(200).send(requestedIdea);
    }
  })
})

// Endpoint to update existing idea by id
.put('/:id', (request, response) => {
  let idOfIdeaToUpdate = request.params.id;
  let updatedIdea
  // Retrieve idea to update
  ideaToUpdate = ideas.find(idea => idea.id === idOfIdeaToUpdate);
  // Validating data received before writing to file
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
    // Reading data file for up-to-date data
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
      JSON.stringify(ideasArrayIncludeUpdatedIdea, null, 2), err => {
        if(err) throw err;
        else {
          // Sending the updated idea after successful write
          return response.status(200).send(updatedIdea);
        }
      })
    })
  } else return res.status(400).send("Please send valid data in correct format.")
})

// Endpoint to delete idea by id
.delete('/:id', (request, response) => {
  let idOfIdeaToDelete = request.params.id;
  // Reading data file for up-to-date data
  fs.readFile('./data/data.json', (err, data) => {
    if(err) throw err;
    // Storing existing ideas into an array
    let originalIdeasArray = JSON.parse(data);
    // Storing all ideas except the one to be deleted
    let ideasArrayAfterDelete = originalIdeasArray.filter(idea => idea.id !== idOfIdeaToDelete);
    // Writing the new array to the file
    fs.writeFile('./data/data.json',
    JSON.stringify(ideasArrayAfterDelete, null, 2), err => {
      if(err) console.log(err);
      else {
        // Sending response after successful delete
        return response.status(200).send("Deleted successfully.");
      }
    })
  })
})

module.exports = router;