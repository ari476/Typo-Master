import { initializeApp } from 'firebase/app'

import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyC34J4Yon3m77-hfYJ-YO8dqVNo_c5YDJI',
    authDomain: 'learn-english-3bc04.firebaseapp.com',
    databaseURL: 'https://learn-english-3bc04-default-rtdb.firebaseio.com',
    projectId: 'learn-english-3bc04',
    storageBucket: 'learn-english-3bc04.appspot.com',
    messagingSenderId: '543317955818',
    appId: '1:543317955818:web:f6f727ee2ddc2883c43393'
  }

const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

