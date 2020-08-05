
export default {
    SET_ITEM(state, items) {
        state.items = items
        console.log(items)
    },
    SET_SUB_TYPE(state, typesSub) {
        state.typesSub = typesSub
        console.log(typesSub)
    }
}
