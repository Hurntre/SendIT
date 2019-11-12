// packages
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import helmet from 'helmet';

// local imports
// import routes from './routes/index';
import swaggerSpec from '../documentation/swagger.json';
import middlewares from './middlewares';
import db from './db/index';

// variables
dotenv.config();
const baseUrl = '/api/v1';
const port = process.env.PORT || 3000;

// removes whitespaces from payload
const { trimmerMiddleware } = middlewares;

// initialize express server
const app = express();

app.use(express.json());
app.use(trimmerMiddleware);
app.use(cors());
app.use(compression()); // Compress all routes
app.use(helmet()); // Security middleware

app.get('/', (req, res) => {
  res.send('Welcome to Send-IT');
});

app.get(`${baseUrl}/doc`, (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// app.use(`${baseUrl}`, routes);
// app.use(`${baseUrl}/auth`, routes);
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
