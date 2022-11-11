import fs from "fs";

export default class Messages {
  constructor(file) {
    this.file = `./desafio9/src/db/files/${file}.json`;
  }

  async saveMessage(object) {
    try {
      const messagesToParse = await fs.promises.readFile(this.file, "utf-8");
      let messages = JSON.parse(messagesToParse);
      object.id = messages.length + 1;
      messages.push(object);
      const updatedFile = JSON.stringify(messages, null, " ");
      await fs.promises.writeFile(this.file, updatedFile);

      return messages;
    } catch (error) {
      console.error(`Se produjo un error en saveMessage:${error}`);
    }
  }

  async readMessages() {
    try {
      const messagesToParse = await fs.promises.readFile(this.file, "utf-8");
      let messages = JSON.parse(messagesToParse);
      return messages;
    } catch (error) {
      console.error(`Se produjo un error en readMessages: ${error}`);
    }
  }
}
