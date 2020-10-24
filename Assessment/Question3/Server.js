
const app = require('express')();
const parser = require("body-parser");
const fs = require("fs");
const dir = __dirname;
app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());


let users = []; 
let flag = 1;

function readData() {
    const filename = "Database.json";  
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    users = JSON.parse(jsonContent);
}
app.get("/user", (req, res) => {
    readData();
    res.send(JSON.stringify(users));
})

app.get("/user/id", (req, res) => {
    const userid = req.params.id;
    if (users.length == 0) {
        readData();
    }
    let foundRec = users.find((e) => e.userId == userid);
    if (foundRec == null)
        throw "User not found";
    res.send(JSON.stringify(foundRec))
})

app.post('/user', (req, res) => {
    if (users.length == 0)
        readData(); 
    let body = req.body; 
    for (let index = 0; index < users.length; index++) {
        let element = users[index];
        //Checking any user is matching with already existing user
        if (element.userName == body.userName) { 
            res.send("User name already exists");
            flag = 0;
        }

    }
    if (flag >= 1) {
        users.push(body);
        saveData(); 
        //updating to the JSON file...
        res.send("User added successfully");
    }

})

app.listen(1234, () => {
    console.log("Server available at 1234");
})