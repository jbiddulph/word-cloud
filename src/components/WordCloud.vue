<template>
  <div>
    <h2>My Topics Challenge</h2>
    <div v-for="word in newWords[0]" :key="word.id">{{ word.label }}</div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "pinia";
import useWordsStore from "@/stores/words";

export default {
  name: "WordCloud",
  data() {
    return {
      words: [],
    };
  },
  mounted() {
    this.getWords();
  },
  created() {},
  computed: {
    ...mapState(useWordsStore, ["newWords"]),
  },
  methods: {
    ...mapActions(useWordsStore, ["saveNewWords"]),
    async getWords() {
      await axios
        .get(
          "https://gist.githubusercontent.com/raymondmuller/1092b8c9eec53d931a86961f7e635465/raw/ff2f9afdea00efd8d95a8d10654455dd68bd3f43/topics.json"
        )
        .then((response) => {
          this.words = response.data.topics;
        })
        .catch((error) => {
          console.log("Error: ", error);
        });

      if (this.words.length > 0) {
        this.saveNewWords(this.words);
      }
    },
  },
};
</script>