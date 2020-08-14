<template>
  <v-dialog v-model="dialog" persistent max-width="1400">
    <template v-slot:activator="{ on, attrs }">
      <v-layout row>
        <v-flex lg1></v-flex>
        <v-flex xs16>
          <v-btn color="primary" dark v-bind="attrs" v-on="on">Thêm câu hỏi</v-btn>
        </v-flex>
      </v-layout>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>Thêm Câu hỏi</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form>
        <v-container sm10>
          <v-layout row>
            <v-flex sm12>
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
                  <v-flex xs10>
                    <v-btn color="warning" v-on:click="clearForm">Xóa trắng toàn bộ</v-btn>
                    <v-btn color="error" v-on:click="deleteOption">Xóa một lựa chọn đáp án</v-btn>
                    <v-btn color="info" v-on:click="addOption">Thêm một lựa chọn đáp án</v-btn>
                    <v-btn
                      :disabled="dialogSave"
                      :loading="dialogSave"
                      color="success"
                      v-on:click="saveQuestion"
                    >Lưu</v-btn>
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
        <!-- dialog start -->
        <v-dialog v-model="dialogSave" width="300">
          <v-card color="primary" dark>
            <v-card-text>
              Đang lưu câu hỏi
              <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- dialog end -->
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
import Types from "@/api/types";
import { Items as Users } from "@/api/user";
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
export default {
  layout: "dashboard",
  components: {},
  data() {
    return {
      // data test
      search: "",
      complex: {
        selected: [],
        headers: [
          {
            text: "Avatar",
            value: "avatar",
          },
          {
            text: "Name",
            value: "name",
          },
          {
            text: "Email",
            value: "email",
          },
          {
            text: "Phone",
            value: "phone",
          },
          {
            text: "Action",
            value: "",
          },
        ],
        items: Users,
      },
      // data test
      dialog: false,
      dialogSave: false,
      items: [
        {
          id: "answer1",
          label: "Câu trả lời 1",
          content: "",
          checked: 1,
        },
        {
          id: "answer2",
          label: "Câu trả lời 2",
          content: "",
          checked: 2,
        },
        {
          id: "answer3",
          label: "Câu trả lời 3",
          content: "",
          checked: 3,
        },
        {
          id: "answer4",
          label: "Câu trả lời 4",
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
      status: "QUESTION/status",
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
      } else {
        if (document.selection) {
          var textRange = document.selection.createRange();
          this.underline.push(textRange.text.toString());
        }
      }
      document.execCommand("underline");
    },
    addOption() {
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
      this.dialogSave = true;
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
      setTimeout(() => {
        this.$store.dispatch("QUESTION/createQuestion", {
          question: question,
        });
        this.bold = [];
        this.italic = [];
        this.underline = [];
        this.dialog = false;
      }, 3000);
      console.log(this.italic + " " + this.bold + " " + this.underline);
    },
    onChangeType() {
      switch (this.level.id) {
        case "1":
          switch (this.type.id) {
            case "1":
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
      this.$store.dispatch("QUESTION/clearStatus", {});
      return (this.question = e.target.innerText);
    },
    clearForm() {
      this.question = "";
      document.getElementById("text").innerHTML = "";
      for (let index = 0; index < this.items.length; index++) {
        this.items[index].content = "";
      }
      this.results = [];
      this.explain = "";
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
.message-successful {
  color: brown;
}
</style>
