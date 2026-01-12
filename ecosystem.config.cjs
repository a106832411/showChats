module.exports = {
  apps: [
    {
      name: "Chats",
      script: "npm",
      args: "run preview -- --port=3000",
      env: {
        PORT: 3000,
      },
    },
  ],
};
