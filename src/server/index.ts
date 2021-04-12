#!/usr/bin/env node
import db from "./init/database";
import router from "./init/router";

// start the Express server
const app = router(db);
const port = 8080; // default port to listen
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );