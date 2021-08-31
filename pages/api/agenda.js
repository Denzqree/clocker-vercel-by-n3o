import firebaseServer from './../../config/firebase/server'

export default async (req, res) => {
    const [, token] = req.headers.authorization.split(' ')

    if(!token){
        return res.status(401)
    }
    try {
        const { user_id } = await firebaseServer.auth().verifyIdToken(token)
        console.log("-----------------")
        console.log("verifying token")
        console.log("Token is :",user_id)
        return res.status(200).json({name: "John Doe"})
    } catch (error) {
        console.log("FB ERROR:", error)
        return res.status(401)
    }
}
