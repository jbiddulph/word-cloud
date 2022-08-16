<template>
  <div>
    <h2>My Topics Challenge</h2>
    <ul class="word-list">
      <li
        v-for="word in newWords[0]"
        :key="word.id"
        :class="popularity(word.volume)"
        :style="'font-size:' + word.volume + 'px'"
      >
        {{ word.label }},
      </li>
    </ul>
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
  computed: {
    ...mapState(useWordsStore, ["newWords"]),
    popularity() {
      return (amount) => `${amount}`;
    },
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

<style scoped>
h2 {
  margin-bottom: 30px;
}
.word-list {
  padding-left: 0;
  text-align: center;
}
.word-list li {
  list-style-type: none;
  display: inline-flex;
  align-content: center;
  justify-content: center;
  padding-left: 5px;
  padding-right: 5px;
}
</style>