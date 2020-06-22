const state = {
  id: "" || JSON.parse(sessionStorage.getItem("infoId")),
  title: "" || JSON.parse(sessionStorage.getItem("infoTitle")),
};
const getters = {
  infoId: (state) => state.id,
  infoTitle: (state) => state.title
};
const mutations = {
  SET_ID(state, value) {
    state.id = value;
    sessionStorage.setItem("infoId", JSON.stringify(state.id));
  },
  SET_TITLE(state, value) {
    state.title = value;
    sessionStorage.setItem("infoTitle", JSON.stringify(state.title));
  },
};
const actions = {};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
