import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./config";

export const firebaseDatabase = () => {
  //databse info

  //get the current user
  const user = auth.currentUser;
  //just a note: the user collection has documents associate with users uid

  const getCurrentUsersUid = () => {
    //return the uid
    if (user) {
      console.log("sucessfully got users id");
      return user.uid;
    } else {
      console.log("error: no current user signed in");
    }
  };

  //method to retrieve a single document using get
  const getCurrentUsersInfo = async () => {
    //search the users table for the document with this users uid
    const docRef = doc(db, "users", getCurrentUsersUid());
    const usersInfo = await getDoc(docRef);

    if (usersInfo.exists()) {
      console.log("sucessfully got Document data");
      return usersInfo.data();
      //return JSON.stringify(usersInfo.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return {
    getCurrentUsersUid,
    getCurrentUsersInfo,
  };
};
