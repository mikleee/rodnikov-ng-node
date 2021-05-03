module.exports = [
  {
    context: [
      "/api"
    ],
    target: "http://localhost:3000/",
    secure: false,
    bypass: function (req, res, proxyOptions) {

    }
  }
];
