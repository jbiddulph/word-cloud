<template>
  <div>
    <h2>My Topics Challenge</h2>
    <ul class="word-list">
      <li v-for="word in newWords[0]" :key="word.id" :class="popularity1">
        <template v-if="word.volume > 80">
          <span class="popularity-xl"
            >{{ word.label }} ({{ word.volume }}),</span
          >
        </template>
        <template v-else-if="word.volume >= 40">
          <span class="popularity-l"
            >{{ word.label }}, ({{ word.volume }}),</span
          >
        </template>
        <template v-else-if="word.volume >= 20">
          <span class="popularity-m"
            >{{ word.label }}, ({{ word.volume }}),</span
          >
        </template>
        <template v-else-if="word.volume >= 10">
          <span class="popularity-s"
            >{{ word.label }}, ({{ word.volume }}),</span
          >
        </template>
        <template v-else-if="word.volume < 9">
          <span class="popularity-xs"
            >{{ word.label }}, ({{ word.volume }}),</span
          >
        </template>
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
/* extra small text */
.popularity-xs {
  font-size: 12px;
}
/* small text */
.popularity-s {
  font-size: 20px;
}
/* medium text */
.popularity-m {
  font-size: 36px;
}
/* large text */
.popularity-l {
  font-size: 50px;
}
/* extra large text */
.popularity-xl {
  font-size: 70px;
}
</style>