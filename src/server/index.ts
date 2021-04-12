#!/usr/bin/env node
import db from "./init/database";
import fixtures from "./init/fixtures";
import router from "./init/router";

const argv = process.argv.slice(2);

// Load database with clean data if started with --clean flag
if (argv.some(x => x == "--clean")) {
    fixtures(db); 
}

// start the Express server
const app = router(db);
const port = 8080; // default port to listen
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );