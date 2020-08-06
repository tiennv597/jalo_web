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
    changeSubType({ commit }, typesSub) {
        console.log(typesSub);
        commit("SET_SUB_TYPE", typesSub.typesSub);
    },
    async createQuestion({ commit }, question) {
        try {
            const respronse = await this.$axios.$post('question', {
                question: question.question,
            })
            //  const respronse = await AuthSercices.login(credentials);
            console.log(respronse);
            // if (respronse.email == 'admin1@gmail.com') {
            //     commit("SET_USER", respronse)
            // } else {
            //     commit("SET_USER", "có lỗi")
            // }
         

        } catch (error) {
            console.log(error.respronse)
        }

    }
}