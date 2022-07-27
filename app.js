/**
*	app.js
* @author Timon Mueller
*/

/*----------------------------------------------------------------------------*/
/* IMPORTS                                                                    */
/*----------------------------------------------------------------------------*/

const Express = require("express")
const path = require("path")
const bodyParser = require("body-parser")

const BoatInteractions = require(path.join(__dirname, "lib", "boatInteractions.js"))
const Login = require(path.join(__dirname, "lib", "login.js"))

/*----------------------------------------------------------------------------*/
/* DECLARATION AND INITIALIZATION                                             */
/*----------------------------------------------------------------------------*/

/* define the Port for the webinterface */
const PORT = 3333;

const app = new Express()
const boat = new BoatInteractions()
const login = new Login()

/* stores valid session tokens */
let sessionTokenArr = []

/*----------------------------------------------------------------------------*/
/* PRIVATE FUNCTIONS                                                          */
/*----------------------------------------------------------------------------*/



/*----------------------------------------------------------------------------*/
/* MAIN                                                                       */
/*----------------------------------------------------------------------------*/

/* handles all static files */
app.use(Express.static("public"));

/* parses the JSON requests */
app.use(bodyParser.json());

/* handles the POST request /deleteUser */
app.post("/checkLogin", (req, res) => {
    login.checkLogin(req.body.username, req.body.password, (err, token) => {
        if(err){
            res.send(JSON.stringify({error: err}))
            return
        }
        sessionTokenArr.push(token)
        res.send(JSON.stringify({error: null, sessionToken: token}))
    })
});

/* handles the POST request /getBoats */
app.post("/getBoats", function(req, res) {
    if(!sessionTokenArr.includes(req.body.sessionToken)){
        res.send(JSON.stringify({error: "Session Token is wrong!"}))
        return
    }
    boat.getBoats((err, boatArr) => {
        if(err){
            res.send(JSON.stringify({error: err}))
            return
        }
        res.send(JSON.stringify({error: null, data: boatArr}))
    })
});

/* handles the POST request /addBoat */
app.delete("/deleteBoat", function(req, res) {
    if(!sessionTokenArr.includes(req.body.sessionToken)){
        res.send(JSON.stringify({error: "Session Token is wrong!"}))
        return
    }
    boat.deleteBoat(req.body.id, (err) => {
        if(err){
            res.send(JSON.stringify({error: err}))
            return
        }
        res.send(JSON.stringify({error: null}))
    })
});

/* handles the PUT request /editBoat */
app.put("/editBoat", function(req, res) {
    if(!sessionTokenArr.includes(req.body.sessionToken)){
        res.send(JSON.stringify({error: "Session Token is wrong!"}))
        return
    }
    boat.editBoat(req.body.id, req.body.name, req.body.description, (err) => {
        if(err){
            res.send(JSON.stringify({error: err}))
            return
        }
        res.send(JSON.stringify({error: null}))
    })
});

/* handles the POST request /addBoat */
app.post("/addBoat", function(req, res) {
    if(!sessionTokenArr.includes(req.body.sessionToken)){
        res.send(JSON.stringify({error: "Session Token is wrong!"}))
        return
    }
    boat.addBoat(req.body.name, req.body.description, req.body.id, (err) => {
        if(err){
            res.send(JSON.stringify({error: err}))
            return
        }
        res.send(JSON.stringify({error: null}))
    })
});

/* listens on port specified */
app.listen(PORT);

/*----------------------------------------------------------------------------*/
/* EXPORTS                                                                    */
/*----------------------------------------------------------------------------*/
