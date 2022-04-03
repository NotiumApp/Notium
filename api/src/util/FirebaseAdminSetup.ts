import fs from "fs";
import path from "path";
import FirebaseAdmin from "firebase-admin";

export const firebaseAdminSetup = () => {
  let firebaseConfig: string;

  try {
    firebaseConfig = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "firebase-config-settings.json"),
        "utf-8"
      )
    );
  } catch (err) {
    console.log(err);
    console.log(process.env.FIREBASE_CONFIG);
    let c = JSON.parse(process.env.FIREBASE_CONFIG);
    if (!c) throw err;
    firebaseConfig = c;
  }

  FirebaseAdmin.initializeApp({
    credential: FirebaseAdmin.credential.cert(firebaseConfig),
  });
};
