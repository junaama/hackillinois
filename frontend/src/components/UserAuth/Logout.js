import firebase from '../../firebase'

export const Logout = () => {
   try {
       firebase.auth().signOut()
   } catch (error) {
       console.error(error)
   }
}