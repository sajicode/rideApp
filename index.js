const {app} = require('./app'),
      port = process.env.PORT;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

module.exports = {app};