//Data about notium that may be changed, such as name, description, keywords etc
export const appData = {
  name: "Notium",
  get description() {
    return `${this.name}, revolutionalized notetaking for CS.`;
  },
  url: "https://notium.vercel.app",
  keywords:
    "notes,notetaking,computer science,java,notetaking app for coding,notion alternatives,cs notetaking", //placeholder, change later
};
