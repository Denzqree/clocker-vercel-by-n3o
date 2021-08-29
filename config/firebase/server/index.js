import admin from 'firebase-admin';
import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.apps.length 
            ? firebase.app() 
            : firebase.initializeApp({
                credential: admin.credential.cert({
                    type: "service_account",
                    auth_uri: "https://accounts.google.com/o/oauth2/auth",
                    token_uri: "https://oauth2.googleapis.com/token",
                    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
                    project_id: process.env.FIREBASE_SERVER_PROJECT_ID, 
                    private_key_id: process.env.FIREBASE_SERVER_PRIVATE_KEY_ID, 
                    private_key: process.env.FIREBASE_SERVER_PRIVATE_KEY,
                    client_email: process.env.FIREBASE_SERVER_CLIENT_EMAIL,
                    client_id: process.env.FIREBASE_SERVER_CLIENT_ID,
                    client_cert: process.env.FIREBASE_SERVER_CLIENT_CERT
                })
            })

export default admin