import { defineStore } from "pinia";

export default defineStore("words", {
  id: "words",
  state: () => ({
    words: [],
  }),
  actions: {
    async saveNewWords(words) {
      console.log(words);
      this.words.push(words);
    },
  },
});
