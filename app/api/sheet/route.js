import { app } from "../../../components/initializeFirebase";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

const db = getFirestore(app);

export async function GET(request) {
    const { uid, sheet_id } = request.params;

    if (!uid) {
        return NextResponse.json({ error: "No UID provided" }, { status: 500 });
    }
    if (!sheet_id) {
        return NextResponse.json({ error: "No sheet ID provided" }, { status: 500 });
    }

    const sheetRef = doc(db, "users", uid, "sheet_list", sheet_id);
    const sheetDoc = await getDoc(sheetRef);

    if (!sheetDoc.exists()) {
        return NextResponse.json(
            { error: "Sheet document does not exist" },
            { status: 500 }
        );
    }

    const sheetData = sheetDoc.data();

    return NextResponse.json({ sheetData: sheetData }, { status: 200 });
}

export async function PUT(request) {
    const body = await request.json();
    const { uid, sheet } = body;

    if (!uid) {
        return NextResponse.json({ error: "No UID provided" }, { status: 500 });
    }
    if (!sheet) {
        return NextResponse.json({ error: "No sheet provided" }, { status: 500 });
    }

    const sheetRef = doc(db, "users", uid, "sheet_list", sheet.id);
    const sheetDoc = await getDoc(sheetRef);

    if (!sheetDoc.exists()) {
        return NextResponse.json(
            { error: "Sheet document does not exist" },
            { status: 500 }
        );
    }

    await setDoc(sheetRef, sheet);

    return NextResponse.json({ success: "Sheet updated" }, { status: 200 });

}

export async function DELETE(request) {
    const body = await request.json();
    const { uid, sheet_id } = body;

    if (!uid) {
        return NextResponse.json({ error: "No UID provided" }, { status: 500 });
    }
    if (!sheet_id) {
        return NextResponse.json({ error: "No sheet provided" }, { status: 500 });
    }

    const userRef = doc(db, "users", uid);

    const sheet_list = userRef.collection("sheet_list");
    const query = sheet_list.where("id", "==", sheet_id);
    const snapshot = await query.get();

    if (snapshot.empty) {
        return NextResponse.json({ error: "No sheet found" }, { status: 500 });
    }

    snapshot.forEach((doc) => {
        doc.ref.delete();
    }
    );

    return NextResponse.json({ success: "Sheet deleted" }, { status: 200 });
}
