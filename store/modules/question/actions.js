export default {
    addOption({ commit }, items) {
        let index = items.items.length + 1;
        const item = {
            id: "answer" + index,
            label: "Answer option " + index,
            content: "",
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
    clearStatus({ commit }) {
        commit("SET_STATUS", "");
    },
    changeSubType({ commit }, typesSub) {
        console.log(typesSub);
        commit("SET_SUB_TYPE", typesSub.typesSub);
    },
    // create a new question
    async createQuestion({ commit }, question) {
        try {
            const respronse = await this.$axios.$post('question', {
                question: question.question,
            })
            if (respronse.status == true) {
                commit("SET_STATUS", "Tạo mới câu hỏi thành công!");
            } else {
                commit("SET_STATUS", "Có lỗi khi tạo câu hỏi");
            }
            console.log(respronse);

        } catch (error) {
            console.log(error.respronse)
        }

    }
}