
const initialState = {
        firstname: '',
        lastname: ''
}

export const test = {
  namespaced: true,
  state: initialState,
  actions: {
    firstname({ commit, state }) {
          commit('firstname', state.firstname);
    },
    lastname({ commit, state }) {
        commit('lastname', state.lastname);
  },
  },
  mutations: {
    setFirstname(state, val) {
      state.firstname = val;
    },
    setLastname(state, val) {
        state.lastname = val;
      },
  }
};