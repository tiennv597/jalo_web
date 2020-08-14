export default {
    addOption({ commit }, items) {
        let index = items.items.length + 1;
        const item = {
            id: "answer" + index,
            label: "Câu trả lời " + index,
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

    },
    // get question
    async getQuestion({ commit }, searchBy) {
        console.log(searchBy.searchByType);
        console.log(searchBy.search);
        var respronse;
        try {
            if (searchBy.searchByType.id == "1") {
                respronse = await this.$axios.$post('question/getByContent', {
                    searchByType: searchBy.searchByType,
                    search: searchBy.search
                })
            } else if (searchBy.searchByType.id == "2") {
                respronse = await this.$axios.$post('question/getById', {
                    //question: question.question,
                })

            }
            else if (searchBy.searchByType.id == "3") {
                respronse = await this.$axios.$post('question/getByType', {
                    //question: question.question,
                })

            }
            else if (searchBy.searchByType.id == "4") {
                respronse = await this.$axios.$post('question/getBySubType', {
                    //question: question.question,
                })

            }
            else if (searchBy.searchByType.id == "5") {
                respronse = await this.$axios.$get('question/getByLevel', {
                    //question: question.question,
                })

            }

            // if (respronse.status == true) {
            //     commit("SET_STATUS", "Tạo mới câu hỏi thành công!");
            // } else {
            //     commit("SET_STATUS", "Có lỗi khi tạo câu hỏi");
            // }
            console.log(respronse);

        } catch (error) {
            console.log(error.respronse)
        }

    }
}