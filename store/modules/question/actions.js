export default {
    addOption({ commit }, items) {
        let index = items.items.length + 1;
        const item = {
            id: "answer" + index,
            label: "Answer option " + index,
            content:"content" + index,
            checked: index,
        }
        items.items.push(item);
        commit("SET_ITEM", items.items);

    },
    deleteOption({ commit }, items) {
        let index = items.items.length - 1;
        items.items.splice(index, 1);
        commit("SET_ITEM", items.items);

    },
    changeSubType({ commit }, typesSub) {
        console.log(typesSub);
        commit("SET_SUB_TYPE", typesSub.typesSub);
    }
}