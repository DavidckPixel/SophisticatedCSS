const { Console } = require("console");
var fs = require("fs");
var file = "quiz.db";
var exists = fs.existsSync(file);

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function(){
    if(!exists){
        CreateDatabase();
    }

    InsertDatasets([["David", "David@Koymans", "test"],["David2", "David@Koymans", "test"]], "User", "Username,Email,Password");

    ReadUser();
})

db.close();

function CreateDatabase(){
    db.run("CREATE TABLE Topic(ID UUID NOT NULL,Title STRING NOT NULL,Descriptor STRING,CONSTRAINT Topic_pk PRIMARY KEY (ID));");
    db.run("CREATE TABLE Quiz(ID UUID NOT NULL,Topic UUID NOT NULL,Title STRING NOT NULL,CONSTRAINT Quiz_pk PRIMARY KEY (ID),CONSTRAINT Quiz_fk_Topic FOREIGN KEY (Topic) REFERENCES Topic(ID));");
    db.run("CREATE TABLE Question(ID UUID NOT NULL,Quiz UUID NOT NULL,Type STRING NOT NULL,Title STRING NOT NULL,Statement STRING,Correct STRING NOT NULL,CONSTRAINT Question_pk PRIMARY KEY (ID),CONSTRAINT Question_fk_Quiz FOREIGN KEY (Quiz) REFERENCES Quiz(ID));");
    db.run("CREATE TABLE QuestionChoice(ID UUID NOT NULL,Question UUID NOT NULL,Statement STRING NOT NULL,ChoiceValue STRING NOT NULL,CONSTRAINT QuestionChoice_pk PRIMARY KEY (ID),CONSTRAINT QuestionChoice_fk_Question FOREIGN KEY (Question) REFERENCES Question (ID));");
    db.run("CREATE TABLE User(Username STRING NOT NULL,Email STRING,Password STRING NOT NULL,CONSTRAINT User_pk PRIMARY KEY (Username));");
    db.run("CREATE TABLE Response(Question UUID NOT NULL,User STRING NOT NULL,Answer STRING,CONSTRAINT Response_pk PRIMARY KEY (Question, User),CONSTRAINT Response_fk_Question FOREIGN KEY (Question) REFERENCES Question(ID),CONSTRAINT Response_fk_User FOREIGN KEY (User) REFERENCES User(Username));");
}

function InsertDatasets(datasets, table, column){

    let values = "?";
    let temp = column.split(",");

    for(x = 1; x < temp.length; x++){
        values += ",?";
    }

    var stmt = db.prepare(`INSERT INTO ${table} (${column}) VALUES (${values}) `);

    for(y = 0;y < datasets.length; y++){
        stmt.run(datasets[y], function(err){
            console.log("Duplicate Key!");
        });
    }

    stmt.finalize();
}

function ReadUser(){
    db.each("SELECT Username,Email,Password FROM User", function(err,row){
        console.log(row.Username + " : " + row.Password + "  ==  " + row.Email);
    });
}
