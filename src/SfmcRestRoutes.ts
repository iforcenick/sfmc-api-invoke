'use strict';

import * as express from "express";
import {SfmcApi} from './SfmcApi';
import Utils from './Utils';

export default class SfmcRestRoutes
{
    public routes(app: express.Application): void
    {
        let self = this;

        // connect to MC
        app.route('/testconnect')
        .get((req: express.Request, res: express.Response) => {            
            self.testConnect(req, res);
        });

        // create a new contact in MC
        app.route('/newcontact')
        .get((req: express.Request, res: express.Response) => {            
            self.createNewContact(req, res);
        });

        // get count of contacts in MC account
        app.route('/contactcount')
        .get((req: express.Request, res: express.Response) => {            
            self.getContactCount(req, res);
        });
    }

    /**
     * GET handler for /testconnect
     * Tests connection to Marketing Cloud
     * Uses values in SFMC_API_CLIENTID and SFMC_API_CLIENTSECRET env vars to get an OAuth Access token
     * 
     */
    public testConnect(req: express.Request, res: express.Response)
    {
        let sessionId = req.session.id;
        Utils.logInfo("/testconnect route entered. SessionId = " + sessionId);

        SfmcApi.connectToMarketingCloud()
        .then(() => {
            // success
            res.status(200).send("Successfully connected to Marketing Cloud");
        })
        .catch(() => {
            // error
            res.status(500).send("ERROR connecting to Marketing Cloud - check console logs");
        });
    }

    /**
     * GET handler for /newcontact
     * Calls Marketing Cloud REST APIs to create a new contact
     * 
     */
    public createNewContact(req: express.Request, res: express.Response)
    {
        let sessionId = req.session.id;
        Utils.logInfo("/newcontact route entered. SessionId = " + sessionId);

        SfmcApi.createContact()
        .then(() => {
            // success
            res.status(200).send("Successfully created new Contact");
        })
        .catch(() => {
            // error
            res.status(500).send("ERROR creating new Contact - check console logs");
        });
    }

    /**
     * GET handler for /contactcount
     * Calls Marketing Cloud REST APIs to create a new contact
     * 
     */
    public getContactCount(req: express.Request, res: express.Response)
    {
        let sessionId = req.session.id;
        Utils.logInfo("/contactcount route entered. SessionId = " + sessionId);

        SfmcApi.getContactCount()
        .then((count) => {
            // success
            res.status(200).send("Contact count = " + count);
        })
        .catch(() => {
            // error
            res.status(500).send("ERROR getting Contact count - check console logs");
        });
    }
}