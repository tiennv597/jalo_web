//import Api from "../../api/api_service"

export default {
    login(credentials) {
        console.log(credentials.username+credentials.password)
        return  this.$axios.$post('/users/signin', {
            email: credentials.username,
            password: credentials.password
        })
        // return console.log("show fc")
    },
    register() {
        return Api().post('users/signup')
    }
}