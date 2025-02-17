const mongoose = require("mongoose");

//const dbUrl = `mongodb://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/?authSource=testdb`;
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

//set up Schema and model
const PetSchema = new mongoose.Schema({
  name: String,
  type: String,
  breed: String,
  age: Number
});
const Pet = mongoose.model("Pet", PetSchema);

//MONGODB FUNCTIONS
async function connect() {
  await mongoose.connect(dbUrl); //connect to mongodb
}

//Get all pets from the pets collection
async function getPets() {
  await connect();
  return await Pet.find({}); //return array for find all
}

async function initializePets(){
  let petlist = [
    {
      name: "Mittens",
      type: "cat",
      breed: "Maine Coon",
      age: 4

    },
    {
      name: "Max",
      type: "dog",
      breed: "Great Dane",
      age: 7

    }
    
  ];
  await Pet.insertMany(petlist)
}

async function addPet(petName, petType, petBreed, petAge) {

  let newpet = new Pet ({
    name: petName,
    type: petType,
    breed: petBreed,
    age: petAge
  })
  await newpet.save();
}

async function updatePetName(oldName, newName){
  await connect();
  let result = await Pet.updateOne(
    {name:oldName},
    {name:newName}
  )
}

async function deletePetbyName(petName) {
  await connect ();
  let result = await Pet.deleteOne({name: petName});

}

module.exports = {
  getPets,
  initializePets,
  addPet,
  updatePetName,
  deletePetbyName
}