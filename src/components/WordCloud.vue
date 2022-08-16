<template>
  <div>
    <button @click.prevent="getWords">Load Word Cloud</button>
    <div v-for="word in words" :key="word.id">{{ word.label }}</div>

    <div v-if="newWords">{{ newWords }}</div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "pinia";
import useWordsStore from "@/stores/player";

export default {
  name: "WordCloud",
  data() {
    return {
      words: [],
    };
  },
  computed: {
    ...mapState(useWordsStore, ["newWords"]),
    saveNewWords(){
      if (this.words != null) {
        saveWords(words);
      }
    }
  },
  mounted: {
    saveNewWords()
  },
  methods: {
    ...mapActions(useWordsStore, ["saveNewWords"]),
    getWords() {
      axios
        .get(
          "https://gist.githubusercontent.com/raymondmuller/1092b8c9eec53d931a86961f7e635465/raw/ff2f9afdea00efd8d95a8d10654455dd68bd3f43/topics.json"
        )
        .then((response) => {
          this.words = response.data.topics;
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    },
  },
};
</script>