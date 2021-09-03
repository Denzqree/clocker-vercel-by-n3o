import firebaseServer from "./../../config/firebase/server";

const db = firebaseServer.firestore();
const agenda = db.collection("agenda");

export default async (req, res) => {
  const [, token] = req.headers.authorization.split(" ");

  if (!token) {
    return res.status(401).json({message:"User token is missing !"})
  }

  try {
    const { uid } = await firebaseServer.auth().verifyIdToken(token);

    const snapshot = await agenda.where('userId', '==' , uid).
    where('date', '==', req.query.date).get();

    const docs = []

    snapshot.forEach(doc => docs.push(doc.data()))

    const result = docs.map(doc => (doc))

    console.log(result)

    return res.status(200).json(result);
  } catch (error) {
    console.log("FIREBASE ERROR IN AGENDA:", error);
    return res.status(401);
  }
};
