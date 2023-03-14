const { reqMatch } = require("./useFirebase");
module.exports = {
  sortear: async (cod) => {
    try {
      const res = await reqMatch(cod);
      const list = res.data().semUnd;
      list.sort();
      const stg = " >>> ``` "+list[Math.floor(Math.random() * list.length)]+" ``` ";
      return stg;
    } catch (error) {
        return false
    }
  },
};
