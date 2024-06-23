// removeUser.ts
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";

const removeUser = async (uid: string): Promise<void> => {
  try {
    const userDocRef = doc(firestore, "users", uid);
    await deleteDoc(userDocRef);
    console.log(`User with uid ${uid} has been removed.`);
  } catch (error) {
    console.error("Error removing user: ", error);
  }
};

export default removeUser;
