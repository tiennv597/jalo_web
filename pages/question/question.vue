<template>
  <v-form>
    <v-container sm12>
      <v-layout row wrap>
        <v-flex sm11>
          <!--  -->
          <v-card>
            <v-layout row>
              <v-flex xs1></v-flex>
              <v-flex xs1>
                <v-select
                  v-model="level"
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
                <span>Nhập câu hỏi</span>
                <div id="text" contenteditable="true" @input="onInput">
                  <input type="hidden" v-model="question" placeholder="edit me" />
                </div>
                <v-btn v-on:click="setBold">toggle bold</v-btn>
                <v-btn v-on:click="setItalic">toggle italic</v-btn>
                <v-btn v-on:click="setUnderline">toggle underline</v-btn>
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
                      v-model="results"
                      :id="item.id"
                      color="blue"
                      :value="item.checked"
                      c
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
                  v-model="explain"
                  outlined
                  clearable
                  label="Viết đáp án tại đây"
                  type="text"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card>
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
          checked: 1,
        },
        {
          id: "answer2",
          label: "Answer option 2",
          content: "",
          checked: 2,
        },
        {
          id: "answer3",
          label: "Answer option 3",
          content: "",
          checked: 3,
        },
        {
          id: "answer4",
          label: "Answer option 4",
          content: "",
          checked: 4,
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
      results: [],
      bold: [],
      italic: [],
      underline: [],
      loading: false,
      question: "",
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
    setBold() {
      document.execCommand("bold");
      if (document.getSelection) {
        // all browsers, except IE before version 9
        var sel = document.getSelection();
        // sel is a string in Firefox and Opera,
        // and a selectionRange object in Google Chrome, Safari and IE from version 9
        // the alert method displays the result of the toString method of the passed object
        this.bold.push(sel.toString());
        //console.log(this.bold[0]);
      } else {
        if (document.selection) {
          var textRange = document.selection.createRange();
          this.bold.push(textRange.text.toString());
        }
      }
    },
    setItalic() {
      if (document.getSelection) {
        var sel = document.getSelection();
        this.italic.push(sel.toString());
      } else {
        if (document.selection) {
          var textRange = document.selection.createRange();
          this.italic.push(textRange.text.toString());
        }
      }
      document.execCommand("italic");
    },
    setUnderline() {
      if (document.getSelection) {
        var sel = document.getSelection();
        this.underline.push(sel.toString());
        console.log(this.underline);
      } else {
        if (document.selection) {
          var textRange = document.selection.createRange();
          this.underline.push(textRange.text.toString());
          console.log(this.underline[0]);
        }
      }
      document.execCommand("underline");
    },
    addOption() {
      // let textarea = this.$refs.ta;
      // let start = textarea.selectionStart;
      // let end = textarea.selectionEnd;
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
      const options = [];
      for (let index = 0; index < this.items.length; index++) {
        let option = {
          answer: this.items[index].content,
          result: false,
        };
        options.push(option);
      }
      for (let index = 0; index < this.results.length; index++) {
        switch (this.results[index]) {
          case 1:
            options[0].result = true;
            break;
          case 2:
            options[1].result = true;
            break;
          case 3:
            options[2].result = true;
            break;
          case 4:
            options[3].result = true;
            break;
          default:
            break;
        }
      }
      var question = {
        level: this.level,
        type: this.type,
        subType: this.typeSub,
        question: this.question,
        explain: this.explain,
        answer: options,
        result: this.result,
        bold: this.bold,
        italic: this.italic,
        underline: this.underline,
      };
      this.$store.dispatch("QUESTION/createQuestion", {
        question: question,
      });
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
    onInput(e) {
      return (this.question = e.target.innerText);
      console.log(this.question);
    },
  },
};
</script>
<style scoped lang="css">
div:focus {
  border-style: none;
  border-color: Transparent;
  overflow: auto;
  outline: none !important;
  border: 1px solid rgb(39, 6, 221);
}
#text {
  border-color: Transparent;
  outline: none !important;
  border: 1px solid rgb(24, 157, 190);
  height: 50px;
  margin-top: 8px;
  margin-bottom: 8px;
}
</style>
