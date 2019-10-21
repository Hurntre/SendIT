// packages
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import dotenv from 'dotenv';
// for path resolution
import path from 'path';
// for access to request body
import bodyParser from 'body-parser';

// local imports
// import routes from './routes/index';
import routes from './routes/index';
import db from './db/index'

import swaggerSpec from './documentation/swagger.json';
import middlewares from './middlewares';

// variables
dotenv.config();
const baseUrl = '/api/v1';
const port = process.env.PORT || 3000;
const { trimmerMiddleware } = middlewares;

// initialize express server
const app = express();

// Express inbuilt body parser
app.use(express.json());
app.use(trimmerMiddleware);
app.use(cors());

// allows the serving of custom files i.e. css and html
app.use(express.static('UI'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../UI/home.html'));
});

app.get(`${baseUrl}/doc`, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Routes with base URl
app.use(`${baseUrl}`, routes);
app.use(`${baseUrl}/auth`, routes);
app.use(`${baseUrl}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// catch invalid routes
app.all('*', (req, res) => {
  res.status(404).json({
    error: 'This route does not exist yet!',
  });
});

// connect to database server and start application server
db.connect().then(() => {
  // eslint-disable-next-line no-console
  app.listen(port, () => console.log(`Listening on port ${port}...`));
});

export default app;
