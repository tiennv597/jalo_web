
export default {
    SET_ITEM(state, items) {
        state.items = items
    },
    SET_SUB_TYPE(state, typesSub) {
        state.typesSub = typesSub
    },
    SET_STATUS(state, status) {
        state.status = status
    },
    GET_QUESTIONS(state, questions) {
        state.questions = questions
    },
    UPDATE_STATUS(state, status) {
        state.status = status
        console.log(status)
    },

}
