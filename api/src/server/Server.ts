import { apiV1 } from "../api/v1/BaseRouter";
import express, { Application } from "express";
import { firebaseAdminSetup } from "../util/FirebaseAdminSetup";
import { prisma } from "../api/v1/db/index";
import { isAuthenticated } from "../api/v1/middlewares/isAuthenticated";
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

    //TEMPORARY, CHANGE LATER
    this.app.post("/v1/note/read", isAuthenticated, async (req, res) => {
        const { noteId } = req.body;
    
        console.log(noteId)
    
        const note = await prisma.note.findFirst({
          where: {
            id: noteId,
          },
        });

        console.log(res.locals.user)
        console.log(note)
    
        if (!note) {
          res.json({ success: false, message: "That note doesn't exist!" });
        }
    
        res.json({ success: true, note: note });
    });

    this.app.put("/v1/note/update", async (req, res) => {
      const { noteId, body } = req.body;

      console.log(noteId)

      const note = await prisma.note.update({
        where: {
          id: noteId,
        },

        data: {
          body: body
        }
      });

      console.log(note)

      if (!note) {
        res.json({ success: false, message: "That note doesn't exist!" });
      }

      res.json({ success: true, note: note });
    });

    //TEMPORARY, CHANGE LATER
    this.app.get("/v1/note/read/all", async (req, res) => {
      const notes = await prisma.note.findMany({});

      if (!notes) {
        res.json({ success: false, message: "There are currently no notes" });
      }

      res.json({ success: true, notes: notes });
    });

    this.app.use("/v1", apiV1);
  }
}
