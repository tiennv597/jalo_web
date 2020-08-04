export default {
    addAnswer({ commit }, items) {
        let index = items.items.length + 1;
        const item = {
            id: "answer " + index,
            hind: "Answer option " + index,
        }
        items.items.push(item);
        commit("SET_ITEM", items.items);

    }
}