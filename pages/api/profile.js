// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import firebaseServer from './../../config/firebase/server'

const db = firebaseServer.firestore()

const profile = db.collection('profiles')

export default async (req, res) => {
  const [, token] = req.headers.authorization.split(' ')
  const { uid } = await firebaseServer.auth().verifyIdToken(token)

  profile.doc(req.query.username).set({
    userId: uid,
    username: req.query.username
  })

  res.status(200).json({ message: 'User signed in succesfully'})
}
