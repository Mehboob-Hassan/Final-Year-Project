import express from 'express';
import cors from 'cors';
const app = express();
import path from 'path';
// import hbs from 'hbs';
const port = process.env.PORT || 8000;
import { Connection } from './db/connect.js';
Connection()
import router from './routes/router.js';
import { fileURLToPath } from 'url';

// Import dirname from path as we're using ECMAScript where __dirname is not avalaible
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// add middleware for static data
// app.use(express.static(path.join(__dirname, '../client/public')))
// app.set('view engine', 'hbs')
// app.set('views', path.join(__dirname, '../client/templates/views'))
// // register Partials
// hbs.registerPartials(path.join(__dirname, '../client/templates/partials'))


app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())



// Use router
app.use(router)



app.listen(port, ()=>{
    console.log(`Server Connected`, port);
})