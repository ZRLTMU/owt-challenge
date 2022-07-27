/**
*	login.js
* @author Timon Mueller
*/

/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

const crypto = require("crypto")
const { v4: uuidv4 } = require('uuid');
const path = require("path")
const fs = require("fs")

/*----------------------------------------------------------------------------*/
/* DECLARATION AND INITIALIZATION                                             */
/*----------------------------------------------------------------------------*/

const USERSJSONPATH = path.join(__dirname, "json", "users.json")


/*----------------------------------------------------------------------------*/
/* PRIVATE FUNCTIONS                                                          */
/*----------------------------------------------------------------------------*/

/* checks whether two hashes are equal */
function compareHashString (compareString, hash){
    let createdHash = crypto.createHash("sha256").update(compareString, "utf-8").digest("hex");
    if(createdHash === hash){
        return true;
    } else {
        return false;
    }
}

/*----------------------------------------------------------------------------*/
/* MAIN                                                                       */
/*----------------------------------------------------------------------------*/

function loginFunction(){

}


/**
 * checks if login credentials are valid
 * @constructor
 * @param {string} loginPassword - the password used for authentication
 * @param {string} loginUsername - the username used for authentication
 */
 loginFunction.prototype.checkLogin = function(loginUsername, loginPassword, callback){
    fs.readFile(USERSJSONPATH, (err, data) => {
        if(err){
            callback(err)
            return
        }
        const userJson = JSON.parse(data)
        const index = userJson.findIndex( user => user.username === loginUsername)
        if(index >= 0){
            if(compareHashString(loginPassword, userJson[index].password)){
                callback(null, uuidv4())
            } else {
                callback("Wrong Password!")
            }
        } else {
            callback("Username doesn't exist!")
        }
    })
}

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/

module.exports = loginFunction;
