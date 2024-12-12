import cron from "node-cron";

const croncron = cron.schedule("* * * * *", () => {
  console.log(new Date().toLocaleDateString());
});

export { croncron };
