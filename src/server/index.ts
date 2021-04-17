#!/usr/bin/env node
import db from "./init/database";
import fixtures from "./init/fixtures";
import router from "./init/router";

(async () => {
    const argv = process.argv.slice(2);

    // Create database if it does not exist
    if (argv.some(x => x == "--create")) {
        await db.create();
    }
    
    // Load database with clean data if started with --clean flag
    if (argv.some(x => x == "--clean")) {
        fixtures(db); 
    }
    
    
    // start the Express server
    const app = router(db);
    const port = 8024; // default port to listen
    app.listen( port, () => {
        console.log( `server started at http://localhost:${ port }` );
    } );
})();