export default {
    async login({ commit }, credentials) {
        try {
            const respronse = await this.$axios.$post('users/signin', {
                email: credentials.username,
                password: credentials.password
            })
            //  const respronse = await AuthSercices.login(credentials);
            console.log("respronse");
            console.log(respronse);
            if (respronse.email == 'admin1@gmail.com') {
                commit("SET_USER", respronse)
            } else {
                commit("SET_USER", "có lỗi")
            }
            //console.log(credentials.username + credentials.password);

        } catch (error) {
            console.log(error)
        }

    }
}