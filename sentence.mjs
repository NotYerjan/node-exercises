class Sentence {
  constructor() {
    this.content = "Who";
  }

  appendToSentence(newContent) {
    this.content += ` ${newContent}`;
  }
}

export const sentence = new Sentence();
