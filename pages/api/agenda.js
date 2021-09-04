import { differenceInHours, format, addHours, formatDistanceToNowStrict }  from 'date-fns'
import firebaseServer from "./../../config/firebase/server";

const db = firebaseServer.firestore();
const agenda = db.collection("agenda");

const startAt = new Date(2021, 1, 1, 8, 0)
const endAt = new Date(2021, 1, 1, 17, 0)

const totalHours = differenceInHours(endAt, startAt)

const allTimeBlocks = []

for(let blockIndex = 0; blockIndex <= totalHours; blockIndex++){
  const time = format(addHours(startAt, blockIndex), 'HH:mm')
  allTimeBlocks.push(time);
}

export default async (req, res) => {
  const [, token] = req.headers.authorization.split(" ");

  if (!token) {
    return res.status(401).json({message:"User token is missing !"})
  }

  try {
    const { uid } = await firebaseServer.auth().verifyIdToken(token);

    console.log(uid)

    const snapshot = await agenda.where('userId', '==' , uid).
    where('date', '==', req.query.date).get();

    const docs = snapshot.docs.map(doc => doc.data())

    const result = allTimeBlocks.map((time) => ({
      name: docs.find(doc => doc.time === time)?.name,
      phone: docs.find(doc => doc.time === time)?.phone,
      time,
      isScheduled: !!docs.find(doc => doc.time === time)
    }))

    return res.status(200).json(result);
  } catch (error) {
    console.log("FIREBASE ERROR IN AGENDA:", error);
    return res.status(401);
  }
};
