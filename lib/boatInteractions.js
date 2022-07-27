/**
*	boatInteractions.js
* @author Timon Mueller
*/

/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

const fs = require("fs")
const path = require("path")

/*----------------------------------------------------------------------------*/
/* DECLARATION AND INITIALIZATION                                             */
/*----------------------------------------------------------------------------*/

const BOATJSONPATH = path.join(__dirname, "json", "boatLibrary.json")


/*----------------------------------------------------------------------------*/
/* PRIVATE FUNCTIONS                                                          */
/*----------------------------------------------------------------------------*/



/*----------------------------------------------------------------------------*/
/* MAIN                                                                       */
/*----------------------------------------------------------------------------*/

function boatInteractions(){

}


/**
 * adds a new boat to the boat library
 * @constructor
 * @param {string} boatName - the name of the new boat
 * @param {string} boatDesc - the description of the new boat
 * @param {string} boatId - the id of the new boat
 */
 boatInteractions.prototype.addBoat = function(boatName, boatDesc, boatId, callback){
    fs.readFile(BOATJSONPATH, (err, data) => {
        if(err){
            callback(err.message)
            return
        }
        const boatJson = JSON.parse(data)
        if(boatJson.every( boat => boat.name != boatName)){
            boatJson.push({id: boatId, name: boatName, description: boatDesc})
            fs.writeFile(BOATJSONPATH, JSON.stringify(boatJson), (err) => {
                if(err){
                    callback(err.message)
                }
                callback(null)
            })
        } else {
            callback("Name of the boat already exists!")
        }
    })
}

/**
 * edits a current boat entry
 * @constructor
 * @param {string} boatId - the id of the boat
 * @param {string} boatName - the new name of the boat
 * @param {string} boatDesc - the new description of the boat
 */
 boatInteractions.prototype.editBoat = async function(boatId, boatName, boatDesc, callback){
    fs.readFile(BOATJSONPATH, (err, data) => {
        if(err){
            callback(err.message)
            return
        }
        let boatJson = JSON.parse(data)
        const index = boatJson.findIndex( boat => boat.id == boatId)
        console.log(boatName)
        if(index >= 0){
            boatJson[index].name = boatName
            boatJson[index].description = boatDesc
            fs.writeFile(BOATJSONPATH, JSON.stringify(boatJson), (err) => {
                if(err){
                    callback(err.message)
                }
                callback(null)
            })
        } else {
            callback("Name of the boat doesn't exist!")
        }
    })
}

/**
 * deletes a boat entry
 * @constructor
 * @param {string} boatId - the id of the boat to be deleted
 */
 boatInteractions.prototype.deleteBoat = async function(boatId, callback){
    fs.readFile(BOATJSONPATH, (err, data) => {
        if(err){
            callback(err.message)
            return
        }
        const boatJson = JSON.parse(data)
        const index = boatJson.findIndex( boat => boat.id == boatId)
        if(index >= 0){
            boatJson.splice(index, index + 1)
            fs.writeFile(BOATJSONPATH, JSON.stringify(boatJson), (err) => {
                if(err){
                    callback(err.message)
                }
                callback(null)
            })
        } else {
            callback("Name of the boat doesn't exist!")
        }
    })
}

/**
 * gets all current boat entries
 * @constructor
 */
 boatInteractions.prototype.getBoats = async function(callback){
    fs.readFile(BOATJSONPATH, (err, data) => {
        if(err){
            callback(err.message)
            return
        }
        const boatJson = JSON.parse(data)
        callback(null, boatJson)
    })
}

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/

module.exports = boatInteractions;
