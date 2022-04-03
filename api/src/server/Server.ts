import { apiV1 } from "../api/v1/BaseRouter";
import express, { Application } from "express";
import { firebaseAdminSetup } from "../util/FirebaseAdminSetup";
import { prisma } from "../api/v1/db/index";
import cors from "cors";

//Server configuration and setup
export class Server {
  public app: Application;

  public constructor() {
    this.app = express();

    //register server middlewares
    this.registerMiddlewares();

    //register server base routes
    this.registerRoutes();

    firebaseAdminSetup();
  }

  public start() {
    //listen the server on a local port
    this.app.listen(process.env.API_PORT, () => {
      console.log(`Server started on http://localhost:${process.env.API_PORT}`);
    });
  }

  private registerMiddlewares() {
    //use json
    this.app.use(express.json());

    this.app.use(cors({ origin: "*" }));

    //log server requests & request method
    this.app.use(async (req, res, next) => {
      console.log(`[${req.method} - ${req.path}]`);
      res.header("Access-Control-Allow-Origin", "*");

      next();
    });
  }

  private registerRoutes() {
    this.app.get("/", (req, res) => {
      res.json({
        success: true,
        message: "Notium API",
      });
    });

    this.app.get("/v1/note/read", async (req, res) => {
        const { noteId } = req.body;
    
        console.log(noteId)
    
        const note = await prisma.note.findFirst({
          where: {
            id: noteId,
          },
        });
    
        if (!note) {
          res.json({ success: false, message: "That note doesn't exist!" });
        }
    
        res.json({ success: true, note: note });
    });

    this.app.use("/v1", apiV1);
  }
}
