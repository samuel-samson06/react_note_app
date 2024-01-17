import { db } from "../../firebase/firebase-config";
import { collection, getDoc } from "firebase/firestore";

const noteRef=collection(db,"notes",)

export async function testLoader(){

}