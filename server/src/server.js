import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/index';
import { authorizationError } from './customMiddleware/index';
import { establishConnection } from './conection/index';
const app = express();
process.on('error', () => {
    console.log("error just happend")
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
    establishConnection()
    next()
}) // doing this to only make DB connection per route/API request


app.use('/', router)
const PORT = 3002;

app.use(authorizationError) 

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})