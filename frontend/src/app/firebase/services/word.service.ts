import { Injectable } from '@angular/core'

import { collection, getDoc, updateDoc, doc } from 'firebase/firestore'

import { db } from '../config-firebase'

@Injectable({
  providedIn: 'root'
})
export class WordService {
  constructor () {}
  private usersRef = collection(db, 'users')

  async getWordsOfUser (username: string) {
    let user = await getDoc(doc(this.usersRef, username))
    if (user.exists() && 'words' in user.data()) {
      return user.data()['words']
    }
    return {}
  }

  async addNewWord (username: string, word: Translation) {
    let words = await this.getWordsOfUser(username)
    const [enWord, heWord] = Object.entries(word)[0]
    words[enWord] = heWord

    await updateDoc(doc(this.usersRef, username), { words: words })
  }

  async deleteWord (username: string, word: Translation) {
    let words = await this.getWordsOfUser(username)
    let enWordToDelete = Object.keys(word)[0]

    if (words.hasOwnProperty(enWordToDelete)) {
      delete words[enWordToDelete]
    }
    await updateDoc(doc(this.usersRef, username), { words: words })
  }
}

interface Translation {
  [englishWord: string]: string
}
