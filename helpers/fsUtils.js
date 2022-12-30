const fs = require('fs');
const util = require('util');

// Indexing of the individual notes
const indexing = (file) => {
  let index = 0;
  Array.from(file).forEach(note => {
    note.id = index;
    index +=1;
    console.log(note.id);
  });
};

// Promise version of fs.readFile
const readfileEl = util.promisify(fs.readFile);

//fswritefile 
const writeFileEl = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

//this will read the file and the new note then add it to the data of the file then write it to the db.json file
const readandappendEl = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      indexing(parsedData);
      writeFileEl(file, parsedData);
    }
  });
};

// delete note takes in id and filters out the note associated with id then index the notes again then write the file
const deleteNoteEl = (id, file) => {
  fs.readFile(file, 'utf8', (err,data) => {
    if (err) {
      console.error(err);
    } else {
      deleteData = Array.from(JSON.parse(data));
      console.log(deleteData);
      const deletedNote = deleteData.filter(note => {
        if(note.id == id){
          return false;
        } else {
          return true;
        }
      });
      indexing(deletedNote);
      writeFileEl('./db/db.json',deletedNote);
    }
  });
};

module.exports = { readfileEl, readandappendEl, deleteNoteEl , indexing, writeFileEl};