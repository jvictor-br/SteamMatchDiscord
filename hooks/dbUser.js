const { db } = require("../firestore/firestore");
const { getDoc, doc, setDoc } = require("firebase/firestore");
module.exports = {
  getDbUser: async (disc) => {
    try {
      const res = await getDoc(doc(db, "discord", disc));
      return res;
    } catch (error) {
      console.log(error);
    }
  },
};
