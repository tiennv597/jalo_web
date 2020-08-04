
export default {
    SET_USER(state, user) {
        state.user = user
        console.log(user.firstName)
        console.log(state.user.lastName)
    }
}
