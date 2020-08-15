
export default {
    SET_ITEM(state, items) {
        state.items = items
        console.log(items)
    },
    SET_SUB_TYPE(state, typesSub) {
        state.typesSub = typesSub
        console.log(typesSub)
    },
    SET_STATUS(state, status) {
        state.status = status
        console.log(status)
    },
    GET_QUESTIONS(state, questions) {
        state.questions = questions
        console.log(questions[0].idQuestion)
    }

}
