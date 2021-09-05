// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import firebaseServer from "./../../config/firebase/server";

const db = firebaseServer.firestore();

const profiles = db.collection("profiles");

const getProfile = async (req, res) => {
  //204 no content

  try {
    if (req.headers.authorization) {
      const [, token] = req.headers.authorization.split(" ");
      const { uid } = await firebaseServer.auth().verifyIdToken(token);
      const snapshot = await profiles.where("userId", "==", uid).get()
      res.status(200).json(snapshot.docs[0].data().username)
    } else {
      const doc = profiles.doc(req.query.username);

      doc.get().then((doc) => {
        const username = doc.data()?.username;
        !username && res.status(200).json({ username: false });
        username && res.status(200).json({ username: doc.data().username });
      });
    }
  } catch (error) {
    res.status(200).json({ error });
  }
};

const setProfile = async (req, res) => {
  try {
    const [, token] = req.headers.authorization.split(" ");
    const { uid } = await firebaseServer.auth().verifyIdToken(token);
    const doc = profiles.doc(req.query.username);
    doc.get().then((doc) => {
      if (doc.exists) {
        res.status(409).json({ error: "User already exists" });
      } else {
        profiles.doc(req.query.username).set({
          userId: uid,
          username: req.query.username,
        });
        res.status(200).json({ message: "User signed up succesfully" });
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const methods = {
  POST: setProfile,
  GET: getProfile,
};

export default async (req, res) => {
  methods[req.method] ? methods[req.method](req, res) : res.status(405);
};
