import { differenceInHours, format, addHours }  from 'date-fns'

import firebaseServer from "./../../config/firebase/server";
import profile from "./profile";

const db = firebaseServer.firestore();
const agenda = db.collection("profiles");

const startAt = new Date(2021, 1, 1, 8, 0)
const endAt = new Date(2021, 1, 1, 17, 0)
const totalHours = differenceInHours(endAt, startAt)

const timeblocks = []

for(let blockIndex = 0; blockIndex <= totalHours; blockIndex++){
  const time = format(addHours(startAt, blockIndex), 'HH:mm')
  timeblocks.push(time);
}

console.log(timeblocks)

export default async (req, res) => {
  try {
    const profileDoc = await profile
      .where("username", "==", req.query.username)
      .get();
    const snapshot = await agenda
      .where("userId", "==", profileDoc.user_id)
      .where("when", "==", req.query.when)
      .get();
    return res.status(200).json(snapshot.docs);
  } catch (error) {
    console.log("FB ERROR:", error);
    return res.status(401);
  }
};
