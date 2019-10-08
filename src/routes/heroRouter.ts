import {Router, Request, Response, NextFunction} from 'express';
import DbClient = require("../DbClient");

export class HeroRouter {
    public static create(router: Router) {
        //log
        console.log("[HeroRoute::create] Creating HeroRoutes route.");

        //add getAll route
        router.get("/api/heroes", (req: Request, res: Response, next: NextFunction) => {
            new HeroRouter().getAll(req, res, next);
        });

        // add getOne route
        router.get("/api/heroes/:id", (req: Request, res: Response, next: NextFunction) => {
            new HeroRouter().getOne(req, res, next);
        });
    }

    constructor() {
        // not much here yet
    }

    /**
     * GET all Heroes.
     */
    public getAll(req: Request, res: Response, next: NextFunction) {
        DbClient.connect()
            .then((db : any) => {
                return db!.collection("heroes").find().toArray();
            })
            .then((heroes : any) => {
                console.log(heroes);
                res.send(heroes);
            })
            .catch((err : any) => {
                console.log("err.message");
            })
    }

    /**
     * GET one hero by id
     */
    public getOne(req: Request, res: Response, next: NextFunction) {
        // need to change the below code to use mongo.
        /*let query = parseInt(req.params.id);
        let hero = Heroes.find((hero: any) => hero.id === query);
        if (hero) {
            res.status(200)
                .send({
                    message: 'Success',
                    status: res.status,
                    hero
                });
        }
        else {
            res.status(404)
                .send({
                    message: 'No hero found with the given id.',
                    status: res.status
                });
        }*/
    }
}