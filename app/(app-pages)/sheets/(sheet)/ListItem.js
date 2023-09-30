// This class need to hold the data for the list item
// It will be used by the list view to render the list item
// It will be used by the detail view to render the detail view
// It will be used by the edit view to render the edit view

// It will need to be able to update the data in both the sheet database and the CRM database

import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

import { app, db } from "../../../../components/initializeFirebase";

class ListItem {
  constructor(params) {
    // Lead fields
    this.name = params.name || null;
    this.siteLink = params.siteLink || null;
    this.phoneNumber = params.phoneNumber || null;
    this.email = params.email || null;
    this.address = params.address || null;
    this.desktopScreenshot = params.desktopScreenshot || null;
    this.mobileScreenshot = params.mobileScreenshot || null;
    this.thumbnailScreenshot = params.thumbnailScreenshot || null;
    this.hasSSL = params.hasSSL || null;
    this.contactUs = params.contactUs || null;
    this.facebook = params.facebook || null;
    this.instagram = params.instagram || null;
    this.twitter = params.twitter || null;
    this.linkedin = params.linkedin || null;
    this.youtube = params.youtube || null;
    this.favorite = params.favorite || null;
    this.template = params.template || null;
    this.emails = params.emails || null;
    this.emailBody = params.emailBody || null;
    this.fbEmail = params.fbEmail || null;
    this.emailSubject = params.emailSubject || "Boost Your Business with a Professional Website";

    // CRM fields
    this.gatekeeperName = params.gatekeeperName || null;
    this.ownerName = params.ownerName || null;
    this.notes = params.notes || null;
    this.followUpDate = params.followUpDate || null;

    // Database fields
    this.idSheet = params.idSheet || null; // the id of the sheet
    this.sheetItemId = params.sheetItemId || null; // id of the item in the sheet database
    this.userId = params.userId || null; // the id of the user
    this.crmItemId = params.crmItemId || null; // the id of the item in the CRM database
    this.changedFlag = false;

    // need all of the fields in params to be added to this object

    this.obj = params.obj;
  }

  async updateIfChanged() {
    // This function will check if the data needs to be updated then update it in the database
    // It will also update the changedFlag to false
    if (this.changedFlag) {
      await this.updateSheet();
      this.changedFlag = false;
    }
  }

  static async updateItem(item) {
    const {
      name,
      siteLink,
      phoneNumber,
      email,
      address,
      desktopScreenshot,
      mobileScreenshot,
      thumbnailScreenshot,
      hasSSL,
      contactUs,
      facebook,
      instagram,
      twitter,
      linkedin,
      youtube,
      idSheet,
      crmItemId,
      sheetItemId,
      gatekeeperName,
      favorite,
      ownerName,
      notes,
      followUpDate,
      userId,
      emailBody,
    } = item;

    const data = {
      idSheet,
      name,
      siteLink,
      phoneNumber,
      email,
      address,
      desktopScreenshot,
      mobileScreenshot,
      thumbnailScreenshot,
      hasSSL,
      contactUs,
      facebook,
      instagram,
      twitter,
      linkedin,
      youtube,
      crmItemId,
      gatekeeperName,
      sheetItemId,
      ownerName,
      favorite,
      notes,
      followUpDate,
      emailBody,
    };
    const userRef = await doc(db, "users", userId);
    const sheetRef = await doc(db, `sheets/${idSheet}`);

    // inside of the sheet ref there is an array of items. I need to to update the item with the id of this object
    if (idSheet) {
      const sheetArray = await getDoc(sheetRef).then((doc) => doc.data().lists);
      console.log(this.sheetItemId);
      let sheetIndex = sheetArray.findIndex(
        (item) => item.sheetItemId === sheetItemId
      );
      console.log(sheetItemId);
      sheetArray[sheetIndex] = data;
      console.log("SHEET ARRAY: ", sheetArray);
      await updateDoc(sheetRef, { lists: sheetArray });
    }

    // I need to update the CRM database with the data in this object
    if (favorite) {
      const crmArray = await getDoc(userRef).then((doc) => doc.data().crm);
      console.log(crmArray);
      if (!crmArray) {
        await updateDoc(userRef, { crm: [data] });
      }
      console.log(crmArray);
      // we need to create a new item in the CRM database
      // need to update this item onto the array called lists in the CRM database
      if (crmArray === undefined) {
        await updateDoc(userRef, { crm: crmArray });
      } else {
        const crmIndex = crmArray.findIndex(
          (item) => item.sheetItemId === sheetItemId
        );
        if (crmIndex === -1) {
          crmArray.push(data);
        } else {
          crmArray[crmIndex] = data;
        }
        await updateDoc(userRef, { crm: crmArray });
      }
    } else {
      // we need to check if it was a favorite before
      // if it was a favorite before we need to delete it from the CRM database
      const crmArray = await getDoc(userRef).then((doc) => doc.data().crm);
      if (crmArray) {
        const crmIndex = crmArray.findIndex(
          (item) => item.sheetItemId === sheetItemId
        );
        if (crmIndex !== -1) {
          crmArray.splice(crmIndex, 1);
          await updateDoc(userRef, { crm: crmArray });
        }
      }
    }
  }

  // This function will not check if the data needs to be updated then update it in the database
  async updateSheet() {
    const {
      name,
      siteLink,
      phoneNumber,
      email,
      address,
      desktopScreenshot,
      mobileScreenshot,
      thumbnailScreenshot,
      hasSSL,
      contactUs,
      facebook,
      instagram,
      twitter,
      linkedin,
      youtube,
      idSheet,
      crmItemId,
      sheetItemId,
      gatekeeperName,
      favorite,
      ownerName,
      notes,
      followUpDate,
      userId,
      emailBody,
    } = this;

    const data = {
      idSheet,
      name,
      siteLink,
      phoneNumber,
      email,
      address,
      desktopScreenshot,
      mobileScreenshot,
      thumbnailScreenshot,
      hasSSL,
      contactUs,
      facebook,
      instagram,
      twitter,
      linkedin,
      youtube,
      crmItemId,
      gatekeeperName,
      sheetItemId,
      ownerName,
      favorite,
      notes,
      followUpDate,
      emailBody,
    };
    const userRef = await doc(db, "users", userId);
    const sheetRef = await doc(db, `sheets/${idSheet}`);

    // inside of the sheet ref there is an array of items. I need to to update the item with the id of this object
    if (idSheet) {
      const sheetArray = await getDoc(sheetRef).then((doc) => doc.data().lists);
      console.log(this.sheetItemId);
      let sheetIndex = sheetArray.findIndex(
        (item) => item.sheetItemId === sheetItemId
      );
      console.log(sheetItemId);
      sheetArray[sheetIndex] = data;
      console.log("SHEET ARRAY: ", sheetArray);
      await updateDoc(sheetRef, { lists: sheetArray });
    }

    // I need to update the CRM database with the data in this object
    if (favorite) {
      const crmArray = await getDoc(userRef).then((doc) => doc.data().crm);
      console.log(crmArray);
      if (!crmArray) {
        await updateDoc(userRef, { crm: [data] });
      }
      console.log(crmArray);
      // we need to create a new item in the CRM database
      // need to update this item onto the array called lists in the CRM database
      if (crmArray === undefined) {
        await updateDoc(userRef, { crm: crmArray });
      } else {
        const crmIndex = crmArray.findIndex(
          (item) => item.sheetItemId === sheetItemId
        );
        if (crmIndex === -1) {
          crmArray.push(data);
        } else {
          crmArray[crmIndex] = data;
        }
        await updateDoc(userRef, { crm: crmArray });
      }
    } else {
      // we need to check if it was a favorite before
      // if it was a favorite before we need to delete it from the CRM database
      const crmArray = await getDoc(userRef).then((doc) => doc.data().crm);
      if (crmArray) {
        const crmIndex = crmArray.findIndex(
          (item) => item.sheetItemId === sheetItemId
        );
        if (crmIndex !== -1) {
          crmArray.splice(crmIndex, 1);
          await updateDoc(userRef, { crm: crmArray });
        }
      }
    }
  }

  static async deleteAll(items) {
    // This function will delete all of the items in the array
    // It will also delete the items from the sheet database
    // It will also delete the items from the CRM database
    const { idSheet, userId } = items[0];
    const userRef = await doc(db, "users", userId);
    const sheetRef = await doc(db, `sheets/${idSheet}`);
    const sheetArray = await getDoc(sheetRef).then((doc) => doc.data().lists);
    const crmArray = await getDoc(userRef).then((doc) => doc.data().crm);
    
    // Delete the items from the sheet database
    for (let i = 0; i < items.length; i++) {
      const { sheetItemId } = items[i];
      const sheetIndex = sheetArray.findIndex(
        (item) => item.sheetItemId === sheetItemId
      );
      sheetArray.splice(sheetIndex, 1);
    }
    await updateDoc(sheetRef, { lists: sheetArray });

    // Delete the items from the CRM database
    for (let i = 0; i < items.length; i++) {
      const { sheetItemId } = items[i];
      const crmIndex = crmArray.findIndex(
        (item) => item.sheetItemId === sheetItemId
      );
      crmArray.splice(crmIndex, 1);
    }
    await updateDoc(userRef, { crm: crmArray });
  }

  async delete() {
    // This function will delete the item from the database
    // It will also delete the item from the sheet database
    // It will also delete the item from the CRM database
    const { idSheet, sheetItemId, crmItemId, userId } = this;
    const userRef = await doc(db, "users", userId);
    const sheetRef = await doc(db, `sheets/${idSheet}`);
    const sheetArray = await getDoc(sheetRef).then((doc) => doc.data().lists);
    const crmArray = await getDoc(userRef).then((doc) => doc.data().crm);

    // Delete the item from the sheet database
    const sheetIndex = sheetArray.findIndex(
      (item) => item.sheetItemId === sheetItemId
    );
    sheetArray.splice(sheetIndex, 1);
    await updateDoc(sheetRef, { lists: sheetArray });

    // Delete the item from the CRM database
    const crmIndex = crmArray.findIndex(
      (item) => item.crmItemId === crmItemId
    );
    crmArray.splice(crmIndex, 1);
    await updateDoc(userRef, { crm: crmArray });

    // Delete the item from the database
    await deleteDoc(doc(db, `users/${userId}/lists/${sheetItemId}`));
  }

  async duplicate() {
    throw new Error("Not implemented");
  }
}

export default ListItem;
