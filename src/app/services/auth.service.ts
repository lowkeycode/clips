import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<User>;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.usersCollection = this.db.collection('users')
   }

  async createUser(userData: User) {
    console.log('userData', userData);
    
    const { name, email, password, age, tel } = userData;

    if(!password) throw new Error('Password is required');

    const userCreds = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    console.log(userCreds);
    await this.usersCollection.add({
      name,
      email,
      age,
      tel
    });
  }
}
