/*
 * SFMC REST API demo
 * 
 */

import * as express from "express";
import * as compression from "compression";  // compresses requests
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as session from "express-session";
import SfmcRestRoutes from './SfmcRestRoutes';


class App {

  public app: express.Application;
  public restRoutes: SfmcRestRoutes = new SfmcRestRoutes();

  constructor()
  {
    this.app = express(); //run the express instance and store in app
    this.config();
    this.restRoutes.routes(this.app);     
  }

  private config(): void
  {
    this.app.use(compression());
    this.app.use(logger("dev"));
    
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({
        extended: true
    }));

    this.app.use(session({
      name: 'server-session-cookie-id',
      secret: 'sanagama-df18',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }
    }));
  }
}

export default new App().app;