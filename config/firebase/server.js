import admin from 'firebase-admin';

const app = firebase.apps.length 
            ? firebase.app() 
            : firebase.initializeApp({
                credential: admin.credential.cert({
                    type: process.env.,
                })
            });

export default admin