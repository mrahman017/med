import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, collection, setDoc } from "firebase/firestore";
import { auth, db } from "./config";

export const firbaseAuth = () => {
  const createAccount = async (name, email, password, role, navigation) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
        const addUserToDatabase = async () => {
          try {
            const userCollectionRef = collection(db, "users");
            const docRef = await setDoc(doc(userCollectionRef, user.uid), {
              Name: name,
              Role: role,
              Schedule: [],
            });
            //console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        };

        //create the user in the database with name, role and no current sechedule
        console.log("user created and added to database");
        addUserToDatabase();

        //navigate to home tabs
        navigation.navigate("Tabs");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error creating account firebaseAuth line 10-19");
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  const signIn = async (email, password, navigation) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log("user signed in");
        navigation.navigate("Tabs");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error with sign in firebaseAuth line 24-35");
      });
  };

  const signOut = async (navigation) => {
    await auth
      .signOut()
      .then((userCredential) => {
        console.log("user signed out");
        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error signing out line 60 - 67");
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  const resetPassword = async (email, navigation) => {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..

        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error with sending reset email");
        console.log(errorMessage);
        // ..
      });
  };

  return {
    createAccount,
    signIn,
    signOut,
    resetPassword,
  };
};
