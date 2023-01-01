import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA_vpausTgzefr25_-4J05fpX-WNlLmZFA',
  authDomain: 'chat-project-1ddf7.firebaseapp.com',
  projectId: 'chat-project-1ddf7',
  storageBucket: 'chat-project-1ddf7.appspot.com',
  messagingSenderId: '136430031390',
  appId: '1:136430031390:web:d958bf536fd8f3e70dd40f',
  measurementId: 'G-QB8NSB45YL',
};

initializeApp(firebaseConfig);

export const AUTH = getAuth();

export const register = async (email: string, password: string) =>
  await createUserWithEmailAndPassword(AUTH, email, password);

export const login = async (email: string, password: string) =>
  await signInWithEmailAndPassword(AUTH, email, password);

export const logout = async () => await signOut(AUTH);

export const DB = getFirestore();

export enum DBCollections {
  USERS = 'users',
  IMAGES = 'images',
}
