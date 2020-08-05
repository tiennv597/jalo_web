<template>
  <v-form>
    <v-container sm12>
      <v-layout row wrap>
        <v-flex sm11 id="question">
          <!--  -->
          <v-card>
            <v-layout row>
              <v-flex xs1></v-flex>
              <v-flex xs1>
                <v-select
                  v-model="level"
                  :hint="`${level.name}, ${level.id}`"
                  :items="levels"
                  item-text="name"
                  item-value="id"
                  label="Select"
                  persistent-hint
                  return-object
                  single-line
                ></v-select>
              </v-flex>
              <v-flex xs1></v-flex>
              <v-flex xs1>
                <v-select
                  v-model="type"
                  :hint="`${type.name}, ${type.id}`"
                  :items="types"
                  item-text="name"
                  item-value="id"
                  label="Select"
                  persistent-hint
                  return-object
                  single-line
                  @input="onChangeType"
                ></v-select>
              </v-flex>
              <v-flex xs1></v-flex>
              <v-flex xs2>
                <v-select
                  v-model="typeSub"
                  :hint="`${typeSub.name}, ${typeSub.id}`"
                  :items="typesSub"
                  item-text="name"
                  item-value="id"
                  label="Lựa chọn lại bài tập"
                  persistent-hint
                  return-object
                  single-line
                ></v-select>
              </v-flex>
            </v-layout>
          </v-card>
          <!-- question -->
          <v-card>
            <v-layout row>
              <v-flex xs1></v-flex>
              <v-flex xs10>
                <v-text-field
                  multi-line
                  rows="2"
                  shaped="false"
                  v-model="question"
                  outlined
                  clearable
                  label="Write your question here"
                  type="text"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card>
          <!-- Answer option  -->
          <div v-for="item in items" :key="item.id">
            <!-- nội dung -->
            <v-card>
              <v-layout row>
                <v-flex xs1>
                  <v-subheader>
                    <v-checkbox
                      v-model="result"
                      :id="item.checked"
                      color="blue"
                      :value="item.checked"
                      hide-details
                    ></v-checkbox>
                  </v-subheader>
                </v-flex>
                <v-flex xs10>
                  <v-text-field
                    multi-line
                    rows="1"
                    v-model="item.content"
                    clearable
                    :label="item.label"
                    type="text"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card>
          </div>
          <v-card>
            <v-layout row>
              <v-flex xs1></v-flex>
              <v-flex xs10>
                <v-text-field
                  multi-line
                  rows="2"
                  shaped="false"
                  v-model="question"
                  outlined
                  clearable
                  label="Viết đáp án tại đây"
                  type="text"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card>
          <span>Checked names: {{ content1 }} {{ content2}}{{content3}}{{content4}}</span>
          <v-card>
            <v-layout row>
              <v-flex xs1>
                <v-subheader></v-subheader>
              </v-flex>
              <v-flex xs11>
                <v-btn color="error" v-on:click="deleteOption">Delete answer option</v-btn>
                <v-btn color="info" v-on:click="addOption">Add answer option</v-btn>
                <v-btn color="success" v-on:click="saveQuestion">Save</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
          <!--  -->
          <v-card>
            <v-layout row>
              <v-flex xs1>
                <v-subheader></v-subheader>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>
<script>
import Types from "@/api/types";
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
new Vue({ el: "#question" });
export default {
  layout: "dashboard",
  components: {},
  data() {
    return {
      items: [
        {
          id: "answer1",
          label: "Answer option 1",
          content: "",
          checked: "1",
        },
        {
          id: "answer2",
          label: "Answer option 2",
          content: "",
          checked: "2",
        },
        {
          id: "answer3",
          label: "Answer option 3",
          content: "",
          checked: "3",
        },
        {
          id: "answer4",
          label: "Answer option 4",
          content: "",
          checked: "4",
        },
      ],
      levels: [
        { id: "1", name: "N1" },
        { id: "2", name: "N2" },
        { id: "3", name: "N3" },
        { id: "4", name: "N4" },
        { id: "5", name: "N5" },
      ],
      level: { id: "5", name: "N5" },
      subTypeVocabularys: [
        { id: "1", name: "Từ vựng" },
        { id: "2", name: "Ngữ pháp" },
        { id: "3", name: "Đọc" },
        { id: "4", name: "Nghe" },
      ],
      type: { id: "1", name: "Từ vựng" },
      types: [
        { id: "1", name: "Từ vựng" },
        { id: "2", name: "Ngữ pháp" },
        { id: "3", name: "Đọc" },
        { id: "4", name: "Nghe" },
      ],
      typeSub: {},
      result: [],
      loading: false,
      content1: "",
      content2: "",
      content3: "",
      content4: "",
      content5: "",
    };
  },
  computed: {
    ...mapActions({
      changeSubType: "QUESTION/changeSubType",
    }),
    ...mapGetters({
      typesSub: "QUESTION/typesSub",
    }),
  },
  methods: {
    addOption() {
      console.log("test add question");
      this.$store.dispatch("QUESTION/addOption", {
        items: this.items,
      });
    },
    deleteOption() {
      console.log("test add question");
      this.$store.dispatch("QUESTION/deleteOption", {
        items: this.items,
      });
    },

    saveQuestion() {
      const answer = [];
      for (let index = 0; index < this.items.length; index++) {
        answer.push(this.items[index].content);
      }
      var question = {
        level: this.level,
        type: this.type,
        subType: this.typeSub,
        question: this.question,
      };
      console.log(question);
    },
    onChangeType() {
      switch (this.level.id) {
        case "1":
          switch (this.type.id) {
            case "1":
              console.log("N1");
              this.$store.dispatch("QUESTION/changeSubType", {
                typesSub: Types.subTypesVocabularyN1,
              });
              break;
            case "2":
              this.$store.dispatch("QUESTION/changeSubType", {
                typesSub: Types.subTypesGrammarN1,
              });
              break;
            case "3":
              this.$store.dispatch("QUESTION/changeSubType", {
                typesSub: Types.subTypesReadN1,
              });
              break;
            case "4":
              this.$store.dispatch("QUESTION/changeSubType", {
                typesSub: Types.subTypesListenN1,
              });
              break;
            default:
          }
          break;
        case "2":
          switch (this.type.id) {
            case "1":
              console.log("N2");
              this.$store.dispatch("QUESTION/changeSubType", {
                typesSub: Types.subTypesVocabularyN2,
              });
              break;
            case "2":
              this.$store.dispatch("QUESTION/changeSubType", {
                typesSub: Types.subTypesGrammarN2,
              });
              break;
            case "3":
              this.$store.dispatch("QUESTION/changeSubType", {
                typesSub: Types.subTypesReadN2,
              });
              break;
            case "4":
              this.$store.dispatch("QUESTION/changeSubType", {
                typesSub: Types.subTypesListenN2,
              });
              break;
            default:
          }
          break;
        case "3":
          switch (this.type.id) {
            case "1":
              this.$store.dispatch("QUESTION/changeSubType", {
                typesSub: Types.subTypesVocabularyN3,
              });
              break;
            case "2":
              this.$store.dispatch("QUESTION/changeSubType", {
                typesSub: Types.subTypesGrammarN3,
              });
              break;
            case "3":
              this.$store.dispatch("QUESTION/changeSubType", {
                typesSub: Types.subTypesReadN3,
              });
              break;
            case "4":
              this.$store.dispatch("QUESTION/changeSubType", {
                typesSub: Types.subTypesListenN3,
              });
              break;
            default:
          }
          break;
        case "4":
          switch (this.type.id) {
            case "1":
              this.$store.dispatch("QUESTION/changeSubType", {
                typesSub: Types.subTypesVocabularyN4,
              });
              break;
            case "2":
              this.$store.dispatch("QUESTION/changeSubType", {
                typesSub: Types.subTypesGrammarN4,
              });
              break;
            case "3":
              this.$store.dispatch("QUESTION/changeSubType", {
                typesSub: Types.subTypesReadN4,
              });
              break;
            case "4":
              this.$store.dispatch("QUESTION/changeSubType", {
                typesSub: Types.subTypesListenN4,
              });
              break;
            default:
          }
          break;
        case "5":
          switch (this.type.id) {
            case "1":
              this.$store.dispatch("QUESTION/changeSubType", {
                typesSub: Types.subTypesVocabularyN5,
              });
              break;
            case "2":
              this.$store.dispatch("QUESTION/changeSubType", {
                typesSub: Types.subTypesGrammarN5,
              });
              break;
            case "3":
              this.$store.dispatch("QUESTION/changeSubType", {
                typesSub: Types.subTypesReadN5,
              });
              break;
            case "4":
              this.$store.dispatch("QUESTION/changeSubType", {
                typesSub: Types.subTypesListenN5,
              });
              break;
            default:
          }
          break;
        default:
      }
    },
  },
};
</script>
