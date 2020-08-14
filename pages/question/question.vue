<template>
  <v-row>
    <v-container sm12>
      <v-layout row wrap>
        <v-layout row>
          <v-flex xs5>
            <p class="message-successful">{{status}}</p>
          </v-flex>
        </v-layout>
      </v-layout>
      <v-layout row wrap>
        <v-layout row>
          <v-flex xs1>
            <AddDialog />
          </v-flex>
        </v-layout>
      </v-layout>
      <v-layout row>
        <!-- data table start -->
        <v-flex lg15>
          <v-card>
            <v-toolbar card color="white">
              <v-text-field
                flat
                solo
                prepend-icon="search"
                placeholder="Type something"
                v-model="search"
                hide-details
                class="hidden-sm-and-down"
              ></v-text-field>
              <v-btn icon>
                <v-icon>filter_list</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="complex.headers"
                :search="search"
                :items="complex.items"
                :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                class="elevation-1"
                item-key="name"
                v-model="complex.selected"
              >
                <template slot="items" slot-scope="props">
                  <!-- <td>
                      <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
                  </td>-->
                  <td>
                    <v-avatar size="32">
                      <img :src="props.item.avatar" alt />
                    </v-avatar>
                  </td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.email }}</td>
                  <td>{{ props.item.phone }}</td>
                  <td>
                    <v-btn depressed outline icon fab dark color="primary" small>
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn depressed outline icon fab dark color="pink" small>
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-row>
</template>
<script>
import AddDialog from "./components/AddDialog";
import { Items as Users } from "@/api/user";
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
export default {
  layout: "dashboard",
  components: {
    AddDialog,
  },
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
  methods: {},
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
