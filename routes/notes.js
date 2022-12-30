const fs = require('fs');
const { readfileEl, readandappendEl, deleteNoteEl, indexing, writeFileEl} = require('../helpers/fsUtils');
const notes = require('express').Router();

// get route to read data from db.json to put into the notes
notes.get('/', (req, res) => {
    //found in helpers fsUtils, reads and sends the file data
    readfileEl('./db/db.json').then((data) => {
        let savedData = JSON.parse(data);
        indexing(savedData);
        writeFileEl('./db/db.json', savedData);
        res.json(savedData);
    });
});

//post route to add a new note to the db.json file
notes.post('/', (req, res) => {

    const addNotes = req.body;

    readandappendEl(addNotes, './db/db.json');

    readfileEl('./db/db.json').then((data) => res.json(JSON.parse(data)));

});

// delete route to delete a specific note
notes.delete('/:id', (req, res) => {
    const deletenoteId = req.params.id;
    console.log(deletenoteId);
    deleteNoteEl(deletenoteId, './db/db.json');
    readfileEl('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

module.exports = notes;