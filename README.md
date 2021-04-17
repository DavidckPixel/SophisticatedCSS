# SophisticatedCSS
Repository for Sophisticated CSS website - Assignment for the course webtechnology at the University in Utrecht

// todo: brief explanation

# Details

* Group id: G24
* Names and student numbers of all authors:
    * Jasper Weyne:  5960134
    * David Koymans: 6561829
    * Laura Holtus:  1810057
* URL to the website: todo

## Logins:

| Username      | Password         |
| ------------- | ---------------- |
| David         | MoeilijkP@SSW0RD |
| Laura         | MoeilijkP@SSW0RD |
| Jasper        | MoeilijkP@SSW0RD |
| Pietje        | MoeilijkP@SSW0RD |
| Jantje        | MoeilijkP@SSW0RD |

# SQL Definition

```sql
CREATE TABLE Question(id TEXT NOT NULL,quizid TEXT NOT NULL,type TEXT NOT NULL,title TEXT NOT NULL,statement TEXT NOT NULL,correct TEXT NOT NULL,explanation TEXT NOT NULL,CONSTRAINT Question_fk_Quiz FOREIGN KEY (quizid) REFERENCES Quiz(id),CONSTRAINT Question_pk PRIMARY KEY (id));
CREATE TABLE QuestionChoice(id TEXT NOT NULL,question TEXT NOT NULL,statement TEXT NOT NULL,choiceValue TEXT NOT NULL,CONSTRAINT QuestionChoice_fk_Question FOREIGN KEY (question) REFERENCES Question(id),CONSTRAINT QuestionChoice_pk PRIMARY KEY (id));
CREATE TABLE QuestionResponse(question TEXT NOT NULL,user TEXT NOT NULL,answer TEXT NOT NULL,CONSTRAINT QuestionResponse_fk_Question FOREIGN KEY (question) REFERENCES Question(id),CONSTRAINT QuestionResponse_fk_User FOREIGN KEY (user) REFERENCES User(username),CONSTRAINT QuestionResponse_pk PRIMARY KEY (question,user));
CREATE TABLE Quiz(id TEXT NOT NULL,title TEXT NOT NULL,topicid TEXT NOT NULL,CONSTRAINT Quiz_fk_Topic FOREIGN KEY (topicid) REFERENCES Topic(id),CONSTRAINT Quiz_pk PRIMARY KEY (id));
CREATE TABLE Topic(id TEXT NOT NULL,title TEXT NOT NULL,descriptor TEXT NOT NULL,CONSTRAINT Topic_pk PRIMARY KEY (id));
CREATE TABLE User(username TEXT NOT NULL,email TEXT NOT NULL,password TEXT NOT NULL,CONSTRAINT User_pk PRIMARY KEY (username));
```

# Structure
## Database structure
### Table: Question
| Field       | Type         | Description                              |
| ----------- | ------------ | ---------------------------------------- |
| id          | UUID         | A random, unique ID                      |
| quizid      | FK: Quiz     | The quiz the question is associated with |
| type        | String       | The type of question ("open" or "multi") |
| title       | String       | The question title                       |
| statement   | String       | The question description                 |
| correct     | String       | The value of the correct answer          |
| explanation | String       | The explanation for the answer           |

Primary key: (id)

### Table: QuestionChoice
| Field       | Type         | Description                              |
| ----------- | ------------ | ---------------------------------------- |
| id          | UUID         | A random, unique ID                      |
| question    | FK: Question | The question for this (multiple) choice  |
| statement   | String       | The choice description                   |
| choiceValue | String       | The value used as the user's answer      | 

Primary key: (id)

### Table: QuestionResponse
| Field       | Type         | Description                              |
| ----------- | ------------ | ---------------------------------------- |
| question    | FK: Question | The question answered                    |
| user        | FK: User     | The user who answered the question       |
| answer      | String       | Their answer to the question             |

Primary key: (question, user)

### Table: Quiz
| Field       | Type         | Description                              |
| ----------- | ------------ | ---------------------------------------- |
| id          | UUID         | A random, unique ID                      |
| title       | String       | The title of the quiz                    |
| topicid     | FK: Topic    | The topic this quiz is associated with   |

Primary key: (id)

### Table: Topic
| Field       | Type         | Description                              |
| ----------- | ------------ | ---------------------------------------- |
| id          | UUID         | A random, unique ID                      |
| title       | String       | The title of the topic                   |
| descriptor  | String       | The topic description                    |

Primary key: (id)

### Table: User
| Field       | Type         | Description                              |
| ----------- | ------------ | ---------------------------------------- |
| username    | String       | A unique, static username                |
| email       | String       | The user's email address                 |
| password    | String       | The hashed password                      | 

Primary key: (username)

## Packages

* argon2: Used for secure password hashing and verification with Argon2i algorithm
* ejs: Server-side template rendering
* express: The web server
* express-async-handler: To run async functions for routes
* express-flash: For flash messages when incorrect user data was provided 
* express-session: Session management abstraction code
* express-validator: For validation and sanitation of provided user data
* fxa-common-password-list: To filter out commonly used and easily guessable passwords
* helmet: Additional security configuration of the web server
* morgan: HTTP request logging to ./access.log
* passport: Authentication middleware for the web server
* passport-local: Utility code for using passport with a locally managed database 
* sqlite3: The SQLite code for database connection and queries
* typescript: Typescript-to-Javascript compiler
* uuid: For generation of unique (v4) UUIDs for entities

## Code structure
```bash
<SophisticatedCSS>/
 ├─ dist/                           # Compiled javascript from the typescript in src
 ├─ documentation/                  # The original designs for ass. 1 & 2
 ├─ node_modules/                   # Typescript & server dependencies (see above)
 └─ public/                         # Static html/css/image assets, served unchanged 
     ├─ image/                      # Images files
     └─ css/                        # Css files
 └─ src/                            # Original typescript source code files
     └─ client/                     # Client side typescript source, compiled to ./dist/index.js (single file)
         └─ todo...                 # todo...
     └─ server/                     # Server side typescript source, compiled to ./dist/server/* (mirrored file structure)
         └─ database/               # Database abstraction utility code
             ├─ index.ts            # Gathers all other file exports in this folder
             ├─ Database.ts         # Abstraction of the underlying SQLite database, manages table abstraction metadata and provides helper functions 
             ├─ DataType.ts         # Helper functions, used for registering types with the database
             └─ Repository.ts       # Abstraction code for interacting with the database for a single table
         └─ entities/               # The database representions code (models in MVC pattern)
             ├─ index.ts            # Gathers all other file exports in this folder
             ├─ Question.ts         # Abstraction for Question table 
             ├─ QuestionChoice.ts   # Abstraction for QuestionChoice table 
             ├─ QuestionResponse.ts # Abstraction for QuestionResponse table 
             ├─ Quiz.ts             # Abstraction for Quiz table 
             ├─ Topic.ts            # Abstraction for Topic table 
             └─ User.ts             # Abstraction for User table 
         └─ init/                   # Code for starting up the webserver
             ├─ database.ts         # Creates/connects to the database and registers database abstraction types (entities) 
             ├─ fixtures.ts         # Used for clearing database and filling it with fixture data when starting the server with "--clean" flag
             ├─ middleware.ts       # Loads and configures all middleware packages (see above)
             └─ router.ts           # Creates web server and registers ./middleware and ../views
         └─ views/                  # Controller code (in MVC pattern) 
             ├─ api.ts              # Serves REST API routes, used by client side code 
             ├─ quiz.ts             # Serves the quiz page 
             ├─ security.ts         # Serves the routes for logging in/out 
             └─ user.ts             # Serves the user profile and registration 
         ├─ index.ts                # Base server runtime file, bootstraps all other code and starts server
         ├─ package.d.ts            # Type descriptions for javascript packages without type declarations
         ├─ security.ts             # Contains functions used for user login/logout and middleware to require authentication on certain routes 
         ├─ session.ts              # Contains the data model and utility functions to manage a user session
         └─ tsconfig.json           # Typescript compiler directives for the server code compilation
 └─ views/                          # The EJS templates, rendered server side to HTML content (views in MVC pattern)
     ├─ login.html.ejs              # Login form template, renders flash messages on invalid credentials
     ├─ profile.html.ejs            # Profile template, renders the profile edit form and overview of user progress
     ├─ quiz.html.ejs               # Loads the quiz page, renders only the login/logout buttons dynamically
     └─ register.html.ejs           # Registration form template, renders flash messages on invalid content
 ├─ access.log                      # The access log of all HTTP requests to the server
 ├─ package.json                    # The npm/yarn configuration of all dependencies
 └─ quiz.db                         # The SQLite server database
```