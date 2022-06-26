import { apiV1 } from "../api/v1/BaseRouter";
import express, { Application } from "express";
import { firebaseAdminSetup } from "../util/FirebaseAdminSetup";
import { prisma } from "../api/v1/db/index";
import { isAuthenticated } from "../api/v1/middlewares/isAuthenticated";
import cors from "cors";
import http from "http";
import { Server as SocketServer } from "socket.io";
import FirebaseAdmin from "firebase-admin";
import bodyParser from "body-parser";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

//Server configuration and setup
export class Server {
  public app: Application;
  //type later
  public server;
  public io: SocketServer;

  public constructor() {
    this.app = express();

    this.app.use(cors());

    this.server = http.createServer(this.app);

    this.io = new SocketServer(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
      },
    });

    //register server middlewares
    this.registerMiddlewares();

    //register server base routes
    this.registerRoutes();

    this.registerSocketEvents();

    firebaseAdminSetup();
  }

  public start() {
    //listen the server on a local port
    //this was app.listen before
    this.server.listen(process.env.PORT, () => {
      console.log(`Server started on http://localhost:${process.env.PORT}`);
    });
  }

  private registerMiddlewares() {
    //use json
    this.app.use(bodyParser.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: false,
      })
    );

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

    // //TEMPORARY, CHANGE LATER
    // this.app.post("/v1/note/read", isAuthenticated, async (req, res) => {
    //   const { noteId } = req.body;

    //   console.log(noteId);

    //   const note = await prisma.note.findFirst({
    //     where: {
    //       id: noteId,
    //     },
    //   });

    //   // console.log(res.locals.user);
    //   // console.log(note);

    //   if (!note) {
    //     res.json({ success: false, message: "That note doesn't exist!" });
    //   }

    //   res.json({ success: true, note: note });
    // });

    // this.app.put("/v1/note/update", async (req, res) => {
    //   const { noteId, body } = req.body;

    //   const note = await prisma.note.update({
    //     where: {
    //       id: noteId,
    //     },

    //     data: {
    //       body: body,
    //     },
    //   });

    //   console.log(note);

    //   if (!note) {
    //     res.json({ success: false, message: "That note doesn't exist!" });
    //   }

    //   res.json({ success: true, note: note });
    // });

    // //TEMPORARY, CHANGE LATER
    // this.app.get("/v1/note/read/all", async (req, res) => {
    //   const notes = await prisma.note.findMany({});

    //   if (!notes) {
    //     res.json({ success: false, message: "There are currently no notes" });
    //   }

    //   res.json({ success: true, notes: notes });
    // });

    this.app.use("/v1", apiV1);
  }

  private registerSocketEvents() {
    this.io.on("connection", async (socket) => {
      console.log("Client connected to socket.io");
      const { authToken } = socket.handshake.auth;
      const { noteId } = socket.handshake.query;
      let user: DecodedIdToken;
      try {
        user = await FirebaseAdmin.auth().verifyIdToken(authToken);
        if (user) {
          const note = await prisma.note.findFirst({
            where: {
              id: noteId.toString(),
              userUid: user.uid,
            },
          });
          await socket.join(note.id);
        } else {
          console.log("User does not exist");
          socket.disconnect();
        }
      } catch (err) {
        console.log(err);

        socket.disconnect();
      }

      socket.on("update", async (body: string) => {
        try {
          socket.broadcast.to(noteId).emit("update", body);

          const res = await prisma.note.updateMany({
            where: {
              id: noteId.toString(),
              userUid: user.uid,
            },
            data: {
              body: body,
            },
          });

          if (!res) {
            socket.disconnect();
          }
        } catch (err) {
          console.log("ERROR", err);
        }
      });

      socket.on("updateTitle", async (title: string) => {
        try {
          socket.broadcast.to(noteId).emit("updateTitle", title);

          const res = await prisma.note.updateMany({
            where: {
              id: noteId.toString(),
              userUid: user.uid,
            },
            data: {
              title: title,
            },
          });

          if (!res) {
            socket.disconnect();
          }
        } catch (err) {
          console.log("ERROR", err);
        }
      });
    });
  }
}
