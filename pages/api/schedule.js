import { differenceInHours, format, addHours }  from 'date-fns'

import firebaseServer from "./../../config/firebase/server";
import profile from "./profile";

const db = firebaseServer.firestore();
const profiles = db.collection("profiles");

const agenda = db.collection("agenda");

const startAt = new Date(2021, 1, 1, 8, 0)
const endAt = new Date(2021, 1, 1, 17, 0)
const totalHours = differenceInHours(endAt, startAt)

const timeBlocks = []

for(let blockIndex = 0; blockIndex <= totalHours; blockIndex++){
  const time = format(addHours(startAt, blockIndex), 'HH:mm')
  timeBlocks.push(time);
}

const getUserId = async (username) => {
  const profileDoc = await profiles
      .where("username", "==", username)
      .get();
  const { userId } = profileDoc.docs[0].data()
  return userId;
}

const setSchedule = async (req, res) => {
  const userId = await getUserId(req.query.username)

  const doc = await agenda.doc(`${userId}@${req.query.when}`).get()

  if(doc.exists) {
    return res.status(400)
  }

  agenda.doc(`${userId}@${req.query.when}`).set({
    userId,
    when: req.query.when,
    name: req.query.name,
    phone: req.query.phone,
  })

  return res.status(200)
}

const getSchedule = async (req, res) => {
  try {/* 
    const profileDoc = await profile
      .where("username", "==", req.query.username)
      .get();
    const snapshot = await agenda
      .where("userId", "==", profileDoc.user_id)
      .where("when", "==", req.query.when)
      .get();  */
    return res.status(200).json(timeBlocks);
  } catch (error) {
    console.log("FIREBASE ERROR:", error)
    return res.status(401);
  }
}

const methods = {
  POST: setSchedule,
  GET: getSchedule,
}

export default async (req, res) => {

  methods[req.method] ? methods[req.method](req,res) : res.status(405)
/*  
  try {/* 
    const profileDoc = await profile
      .where("username", "==", req.query.username)
      .get();
    const snapshot = await agenda
      .where("userId", "==", profileDoc.user_id)
      .where("when", "==", req.query.when)
      .get();
    return res.status(200).json(timeBlocks);
  } catch (error) {
    console.log("FIREBASE ERROR:", error)
    return res.status(401);
  } */
}
