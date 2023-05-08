import { app } from '../../../components/initializeFirebase'
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from 'next/server';

const db = getFirestore(app);

export async function POST(request) {    
    const body = await request.json();
    const { uid, displayname, email, photo } = body;

    try {
        const userRef = doc(db, "users", uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            return NextResponse.json({ error: "User document already exists" }, { status: 500 });            
        } else {
            await setDoc(doc(db, "users", uid), {
                created: new Date(),
                name: displayname,
                email: email,
                photo: photo,
                stripe_customer_id: "none",
                subscription_status: "none",
                lists: []
            })
            return NextResponse.json({ success: "User document created" }, { status: 200 });
        }
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });

    }
}