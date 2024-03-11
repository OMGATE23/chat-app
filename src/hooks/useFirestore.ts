import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { Dispatch, SetStateAction } from "react";

export default function useFirestore() {
  async function sendMessage(
    name: string,
    message: string,
    setResponse: Dispatch<SetStateAction<any>>
  ) {
    try {
      await addDoc(collection(db, "messages"), {
        name,
        message,
        createdAt: new Date(Date.now()),
      });

      setResponse({ errorOccured: false });
    } catch (err) {
      setResponse({ errorOccured: true, error: err });
    }
  }

  async function getMessages(setMessages: Dispatch<SetStateAction<any>>) {
    try {
      const q = query(collection(db, "messages"), orderBy("createdAt"));
      const unsub = onSnapshot(q, (querySnapshot) => {
        const messages: any[] = [];
        querySnapshot.forEach((doc) => {
          messages.push({ id: doc.id, ...doc.data() });
        });
        setMessages({ errorOccured: false, messages });
      });

      return unsub;
    } catch (err) {
      setMessages({ errorOccured: true, error: err });
    }
  }

  return { sendMessage, getMessages };
}
