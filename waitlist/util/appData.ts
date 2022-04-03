//Data about notium that may be changed, such as name, description, keywords etc
export const appData = {
  name: "Notium",
  get description() {
    return `${this.name} is the all-in-one platform for trip management. Manage packing lists, schedule your day, and keep track of your bookings in one central place.`;
  },
  url: "https://notium.vercel.app",
  keywords:
    "trip,trip management,tripley,trip planner,how to easily plan trip,booking manager,group trip platform", //placeholder, change later
};
