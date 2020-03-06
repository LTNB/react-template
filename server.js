const express = require('express'),
      portNumber = parseInt(process.env.PORT, 10),
      app = express();

app .use(express.urlencoded({ limit: '50mb', extended: true }))
    .use(express.json({ limit: '50mb' }))
    .use('/', express.static('dist'))
    .listen(portNumber, err => {
      if (err) {
        console.error('Unable to start Express.', err);
      } else {
        console.log(`Now listening on: http://localhost:${portNumber}`);
        console.log('Application started. Press Ctrl+C to shut down.');
      }
    });