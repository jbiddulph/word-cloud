<template>
  <div class="flex flex-row">
    <div class="left">
      <h2>My Topics Challenge</h2>
      <ul class="word-list">
        <!-- Looping words array and conditionalise result -->
        <li v-for="word in newWords[0]" :key="word.id">
          <template v-if="word.sentimentScore > 90">
            <span
              class="popularity-xl text-green"
              @click.prevent="showInfo(word)"
              >{{ word.label }} ({{ word.sentimentScore }}),</span
            >
          </template>
          <template v-else-if="word.sentimentScore >= 80">
            <span
              class="popularity-l text-green"
              @click.prevent="showInfo(word)"
              >{{ word.label }} ({{ word.sentimentScore }}),</span
            >
          </template>
          <template v-else-if="word.sentimentScore >= 70">
            <span
              class="popularity-m text-green"
              @click.prevent="showInfo(word)"
              >{{ word.label }} ({{ word.sentimentScore }}),</span
            >
          </template>
          <template v-else-if="word.sentimentScore >= 60">
            <span
              class="popularity-s text-green"
              @click.prevent="showInfo(word)"
              >{{ word.label }} ({{ word.sentimentScore }}),</span
            >
          </template>
          <template v-else-if="word.sentimentScore >= 55">
            <span class="popularity-xs" @click.prevent="showInfo(word)"
              >{{ word.label }} ({{ word.sentimentScore }}),</span
            >
          </template>
          <template v-else-if="word.sentimentScore < 40">
            <span
              class="popularity-xxs text-red"
              @click.prevent="showInfo(word)"
              >{{ word.label }} ({{ word.sentimentScore }}),</span
            >
          </template>
        </li>
      </ul>
    </div>
    <div class="right align-center justify-center">
      <div v-if="this.rightPanel">
        <!-- If the word has been clicked, show info here -->
        <p>Information on topic: {{ selectedWord.label }}</p>
        <p>Total mentions: {{ selectedWord.volume }}</p>
        <div>
          <span v-if="selectedWord.sentiment.positive" class="text-green">
            Positive mentions: {{ selectedWord.sentiment.positive }}<br />
          </span>
          <span v-if="selectedWord.sentiment.negative" class="text-red">
            Negative mentions: {{ selectedWord.sentiment.negative }}<br
          /></span>
          <span v-if="selectedWord.sentiment.neutral">
            Neutral mentions: {{ selectedWord.sentiment.neutral }}<br
          /></span>
        </div>
      </div>
    </div>
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
      rightPanel: false,
      selectedWord: {},
    };
  },
  mounted() {
    this.getWords();
  },
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
      // If there are words save to state
      if (this.words.length > 0) {
        this.saveNewWords(this.words);
      }
    },
    showInfo(val) {
      this.rightPanel = true;
      this.selectedWord = val;
    },
  },
};
</script>

<style scoped>
.right {
  font-size: 24px;
  display: inline-flex;
}
.right p {
  width: 100%;
  margin-bottom: 20px;
}
h2 {
  margin-bottom: 30px;
  text-decoration: underline;
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
.word-list li {
  cursor: pointer;
}
.left {
  width: 100%;
}
.right {
  width: 100%;
}
.flex {
  display: flex;
}
.flex-row {
  flex-direction: row;
}
.align-center {
  display: flex;
  align-items: center;
}
.justify-center {
  display: flex;
  justify-content: center;
}
.text-red {
  color: #990000;
}
.text-green {
  color: #00901a;
}
/* extra extra small text */
.popularity-xxs {
  font-size: 12px;
}
/* extra small text */
.popularity-xs {
  font-size: 15px;
}
/* small text */
.popularity-s {
  font-size: 20px;
}
/* medium text */
.popularity-m {
  font-size: 30px;
}
/* large text */
.popularity-l {
  font-size: 40px;
}
/* extra large text */
.popularity-xl {
  font-size: 50px;
}
</style>