const { syncSum } = require("./syncSum");
const { syncGame } = require("./syncGame");

const mapear = async (list) => {
  const todos = await Promise.all(
    await list.map(async (e) => {
      const data = await syncSum(e);
      return data.games;
    })
  );
  return todos;
};

const mapearGames = async (list) => {
  const todosg = await Promise.all(
    await list.map(async (e) => {
      const data = await syncGame(e.toString());
      if (data.name != undefined) {
        return { name: data.name, appid: e };
      }
    })
  );
  return todosg;
};

function findDup(arr) {
  return [
    ...new Set(arr.filter((elem, idx, arr) => arr.indexOf(elem) !== idx)),
  ];
}

const encontrar = async (list) => {
  var lista = [];
  const todos = await mapear(list);
  todos.map((e, i) => {
    if (i === 0) {
      var listal = [];
      e.map((e) => {
        listal.push(e.appid);
      });
      lista = [...listal];
    } else {
      let listad = [];
      e.map((e) => {
        listad.push(e.appid);
      });
      let listac = [...lista, ...listad];
      const dupp = findDup(listac);
      lista = [...dupp];
    }
  });
  const nomes = await mapearGames([...lista]);
  return nomes;
};

module.exports = {
  getMatch: async (list) => {
    try {
      const match = await encontrar(list);
      return match;
    } catch (error) {
      console.log(error);
    }
  },
};
