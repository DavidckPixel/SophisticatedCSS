#!/usr/bin/env node
import express from "express";
const app = express();
const port = 8080; // default port to listen

app.use(express.static('public')); 

// define a route handler for the default home page
app.get( "/dist/index.js", ( req, res ) => {
    res.sendFile( "dist/index.js", { root: '.' } );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );