const state = () => ({
    drawer: true
})

const mutations = {
    toggleDrawer(state) {
        state.drawer = !state.drawer
    },
    drawer(state, val) {
        state.drawer = val
    }
}

export default {
    namespaced: true,
    state,
    mutations,
}