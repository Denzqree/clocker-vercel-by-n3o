import firebaseServer from './../../config/firebase/server'

// const db = firebaseServer.firestore()

// const profile = db.collection('profiles')

export default async (req, res) => {
    //const [, token] = req.headers.authorization.split(' ')
    //const { user_id } = await firebaseServer.auth().verifyIdToken(token)

    console.log(req.query)
    res.status(200).json({name: "John Doe"});    
}
