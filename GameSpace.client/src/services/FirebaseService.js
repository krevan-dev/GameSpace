// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { AppState } from "../AppState";
import { firebaseConfig } from "../env";
import Pop from "../utils/Pop";
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


class FirebaseService {
  async uploadFile(file) {
    try {
      const userId = AppState.account.id
      const mediaRef = ref(storage, `${userId}/${file.name}`)
      const res = await uploadBytes(mediaRef, file)
      // REGEX / \/ /  + \+ +, -
      return 'https://firebasestorage.googleapis.com/v0/b/gamespace-5e220.appspot.com/o/' + mediaRef.fullPath.replace(/\//ig, '%2F') + '?alt=media'
    } catch (error) {
      Pop.toast(error.message, 'error')
    }

  }

}

export const firebaseService = new FirebaseService()