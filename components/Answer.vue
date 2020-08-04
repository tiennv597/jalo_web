<template v-for="(item, index) in items" :key="item.id">
  <div id="v-answer">
    <v-card>
      <v-layout row>
        <v-flex xs1>
          <v-subheader>
            <v-checkbox v-model="colors" color="red" value="red" hide-details></v-checkbox>
          </v-subheader>
        </v-flex>
        <v-flex xs10>
          <v-text-field
            multi-line
            rows="1"
            v-model="answer3"
            clearable
            label="item.hind"
            type="text"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card>
    <p>{{item}}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "v-answer",
  //   props: {
  //     id: {
  //       type: String,
  //     },
  //     hind: {
  //       type: String,
  //     },
  //   },

  data() {
    return {
      items: items,
    };
  },
  computed: {
    ...mapGetters({
      items: "QUESTION/items",
    }),
    
  },
};
</script>
