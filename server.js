const express = require('express');
const app = express();
const datastore = require('nedb');

app.listen(8081, () => {console.log('Listening to Port: 8081')});
app.use(express.static('public'));
app.use(express.json({limit:'100kb'}));

//Database for Schedule
const Sched_database = new datastore('Train_Sched_DB.db');
Sched_database.loadDatabase();

//Database for stations
const Stat_database = new datastore('Train_Stat_DB.db');
Stat_database.loadDatabase();

//Database for stops
const Stop_database = new datastore('Train_Stop_DB.db');
Stop_database.loadDatabase();

//Database for tickets
const Ticket_database = new datastore('Tickets_DB.db');
Ticket_database.loadDatabase();

//Database for Login
const Login_database = new datastore('Login_DB.db');
Login_database.loadDatabase();


//Sending Databases asked through GET
  
//Sending index.html (Login Page) first
  app.get('/', function(req, res) {
    res.sendFile('public/Login.html', {root: __dirname })
});

//Send database to Table.js
app.get('/Sched', (req, res) =>{
    Sched_database.find({}, (err, data) =>{
        if (err) throw err;
        res.json(data);
        console.log('Sent Schedule');
    })
});

//Send database to Table.js
app.get('/SendStops', (req, res) =>{
    Stop_database.find({}, (err, data) =>{
        if (err) throw err;
        res.json(data);
        console.log('Sent Stops');
    })
});

//Send database to Ticket.js
app.get('/SendStats', (req, res) =>{
    Stat_database.find({}, (err, data) =>{
        if (err) throw err;
        res.json(data);
        console.log('Sent Stats');
    })
});






//Getting Databases asked through POST

//POST to get database entries: Train_Sched
app.post('/getData', (req, res) =>{
    const data = req.body;
    data.timestamp = Date.now();
    Sched_database.insert(data);
    console.log('inserted');
    res.json(data);
}); 




//POST to get database entries: Stat_Details
app.post('/StatData', (req, res) =>{
    const data = req.body;
    data.timestamp = Date.now();
    Stat_database.insert(data);
    console.log('inserted');
    res.json(data);
});



//POST to get database entries: Stop_Details
app.post('/StopData', (req, res) =>{
    const data = req.body;
    data.timestamp = Date.now();
    Stop_database.insert(data);
    console.log('inserted');
    res.json(data);
});


//POST to get database entries: Ticket_Details
app.post('/TicketData', (req, res) =>{
    const data = req.body;
    

    data._id = Math.floor((Math.random())*1000000000);
    data.timestamp = Date.now();
    Ticket_database.insert(data);
    console.log('Ticket inserted');
    console.log(data.ID);



    



    Sched_database.find({ID : data.ID}, function (err,docs){ 
        var Class;
        if(data.classinp == "Third")
        {
            console.log(docs, docs[0].ClassIII_Rem);
            Class = "ClassIII_Rem";
            Sched_database.update({ID : data.ID}, {"ID": docs[0].ID,"Name": docs[0].Name,"Type": docs[0].Type,"ClassI_Tot": docs[0].ClassI_Tot,"ClassI_Rem": docs[0].ClassI_Rem,"ClassII_Tot": docs[0].ClassII_Tot,"ClassII_Rem":docs[0].ClassII_Rem,"ClassIII_Tot":docs[0].ClassIII_Tot,"ClassIII_Rem":docs[0].ClassIII_Rem,"StartDay":docs[0].StartDay,"StartTime":docs[0].StartTime,"EndDay":docs[0].EndDay,"EndTime":docs[0].EndTime,"Start_Station":docs[0].Start_Station,"Dest_Station":docs[0].Dest_Station,"timestamp":1620489634428,"_id": docs[0]._id, ClassIII_Rem : docs[0].ClassIII_Rem-data.num}, {});
        }
        if(data.classinp == "Second")
        {
            console.log(docs, docs[0].ClassII_Rem);
            Class = "ClassII_Rem";
            Sched_database.update({ID : data.ID}, {"ID": docs[0].ID,"Name": docs[0].Name,"Type": docs[0].Type,"ClassI_Tot": docs[0].ClassI_Tot,"ClassI_Rem": docs[0].ClassI_Rem,"ClassII_Tot": docs[0].ClassII_Tot,"ClassII_Rem":docs[0].ClassII_Rem,"ClassIII_Tot":docs[0].ClassIII_Tot,"ClassIII_Rem":docs[0].ClassIII_Rem,"StartDay":docs[0].StartDay,"StartTime":docs[0].StartTime,"EndDay":docs[0].EndDay,"EndTime":docs[0].EndTime,"Start_Station":docs[0].Start_Station,"Dest_Station":docs[0].Dest_Station,"timestamp":1620489634428,"_id": docs[0]._id, ClassII_Rem : docs[0].ClassII_Rem-data.num}, {});
        }
        if(data.classinp == "First")
        {
            console.log(docs, docs[0].ClassI_Rem);
            Class = "ClassI_Rem";
            Sched_database.update({ID : data.ID}, {"ID": docs[0].ID,"Name": docs[0].Name,"Type": docs[0].Type,"ClassI_Tot": docs[0].ClassI_Tot,"ClassI_Rem": docs[0].ClassI_Rem,"ClassII_Tot": docs[0].ClassII_Tot,"ClassII_Rem":docs[0].ClassII_Rem,"ClassIII_Tot":docs[0].ClassIII_Tot,"ClassIII_Rem":docs[0].ClassIII_Rem,"StartDay":docs[0].StartDay,"StartTime":docs[0].StartTime,"EndDay":docs[0].EndDay,"EndTime":docs[0].EndTime,"Start_Station":docs[0].Start_Station,"Dest_Station":docs[0].Dest_Station,"timestamp":1620489634428,"_id": docs[0]._id, ClassI_Rem : docs[0].ClassI_Rem-data.num}, {});
        }
     });
    res.json(data);
});



//POST to get database entries: Ticket_Details
app.post('/CancellationPNR', (req, res) =>{
    const data = req.body;
    Ticket_database.remove({_id: data.PNR_inp}, {});

    
    console.log('Cancelled');
    res.json(data);
});




//POST to get database entries: Ticket_Details
app.post('/Schedupdate', (req, res) =>{
    const data = req.body;
    var unapdated = Sched_database.find({ID : data.ID}, function (err,docs){ console.log(docs); });
    if(data.classinp=="First")
    {
        const newrem = unapdated.ClassI_Rem - 1;
        Sched_database.update({ID: data.ID}, {ClassI_Rem: newrem }, {});
    }
    console.log('inserted');
    res.json(data);
});



//POST to get Signup entries: Login_Database
app.post('/Signup', (req, res) => {
    const data = req.body;
    console.log(data);
    Login_database.insert({_id:data.userID, password:data.pass});
    console.log("New Login Credentials");
});


//POST to validate Login entries: Login_Database
app.post('/LoginVal', (req, res) => {
    const data = req.body;
    console.log(data);
    Login_database.find({_id: data.userID}, function(err, docs){
        if (err) throw err;
        //console.log(docs.le)
        if(docs.length==0)
        {
            console.log("Login Failed");
            data.status = "error";
            console.log(data);
            res.json(data);
        }
        else if(data.pass==docs[0].password)
        {
            console.log("Login Success");
            docs[0].status = "success";
            console.log(docs[0]);
            res.json(docs[0]);
        }
        else{
            console.log("Login Failed");
            data.status = "error";
            console.log(data);
            res.json(data);
        }
    });
});