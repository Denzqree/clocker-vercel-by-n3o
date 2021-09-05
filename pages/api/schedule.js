import { differenceInHours, format, addHours }  from 'date-fns'

import firebaseServer from "./../../config/firebase/server";

const db = firebaseServer.firestore();
const profiles = db.collection("profiles");

const agenda = db.collection("agenda");

const startAt = new Date(2021, 1, 1, 8, 0)
const endAt = new Date(2021, 1, 1, 17, 0)
const totalHours = differenceInHours(endAt, startAt)

const allTimeBlocks = []

for(let blockIndex = 0; blockIndex <= totalHours; blockIndex++){
  const time = format(addHours(startAt, blockIndex), 'HH:mm')
  allTimeBlocks.push(time);
}

const getUserId = async (username) => {
  const profileDoc = await profiles
      .where("username", "==", username)
      .get();

  if(!profileDoc.docs.length){
    return false;
  }

  const { userId } = profileDoc.docs[0].data()
  return userId;
}

const getSchedule = async (req, res) => {
  try{
    const userIdFetch = await getUserId(req.query.username)

    if(!userIdFetch){
      res.status(200).json({error:"Nome de usuário invalido !"})
    }

    const snapshot = await agenda
      .where("userId", "==", userIdFetch)
      .where("date", "==", req.query.date)
      .get();

    const docs = snapshot.docs.map(doc => doc.data())

    const result = allTimeBlocks.map((time) => ({
      time,
      isBlocked: !!docs.find(doc => doc.time === time)
    }))

    res.status(200).json({result}) 
  }catch(error){ // --- res.status = not this (delete this upon fix) 
    res.status(200).json({error:"Foi impossível recuperar a agenda..."})
  } // --- res.status = not this (delete this upon fix)

}

const setSchedule = async (req, res) => {
  const userId = await getUserId(req.query.username)
  const docId = `${userId}#${req.query.date}#${req.query.time}`

  const doc = await agenda.doc(docId).get()

  if(doc.exists) {
    return res.status(200).json({message:"Time blocked !"})
  }

  const block = await agenda.doc(docId).set({
    userId,
    date: req.query.date,
    time: req.query.time,
    name: req.query.name,
    phone: req.query.phone,
  })

  return res.status(200).json(block)
}

const methods = {
  POST: setSchedule,
  GET: getSchedule,
}

export default async (req, res) => {
  methods[req.method] ? methods[req.method](req,res) : res.status(405)
}