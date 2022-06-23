import fs from "fs";
import path from "path";
import FirebaseAdmin from "firebase-admin";

interface FirebaseConfigType {
	projectId:string;
	clientEmail:string;
	privateKey:string;

}

export const firebaseAdminSetup = () => {
  let firebaseConfig: string | FirebaseConfigType;

  try {
    firebaseConfig = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "firebase-config-settings.json"),
        "utf-8"
      )
    );
  } catch (err) {
    console.log(err);
    const c={
	projectId:process.env.FIREBASE_PROJECT_ID,
    	clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    	privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }
    if (!c) throw err;
    firebaseConfig = c;

    console.log("all good");
  }

  FirebaseAdmin.initializeApp({
    credential: FirebaseAdmin.credential.cert(firebaseConfig),
  });
};
