import { Injectable } from '@angular/core'

import { collection, setDoc, doc, getDocs } from 'firebase/firestore'

import { db } from '../config-firebase'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor () {}
  private usersRef = collection(db, 'users')

  async addNewUser (username: string) {
    await setDoc(doc(this.usersRef, username), {})
  }

  async getUsers () {
    const querySnapshot = await getDocs(this.usersRef)
    const users: any[] = []
    querySnapshot.forEach(user => {
      users.push(user.id)
    })
    return users
  }

  async isUserExists (username: string) {
    let users = await this.getUsers()
    return users.includes(username)
  }
}
