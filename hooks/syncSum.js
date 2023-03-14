const { getSum } = require("./useFirebase");
const { regGameVinc } = require("./request");
module.exports = {
  syncSum: async (disc) => {
    try {
      const get = await getSum(disc);
      if (get) {
        return get;
      } else {
        const add = await regGameVinc(disc);
        if (add) {
          return await getSum(disc);
        } else {
          return false;
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};
