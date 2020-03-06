const express = require('express'),
  Bundler = require('parcel-bundler'),
  portNumber = parseInt(process.env.PORT, 10),
  app = express(),
  bundler = new Bundler('src/index.html', { sourceMaps: false, contentHash: false }),
  authUser = require('./mocks/auth-user.json'),
  userInfo = require('./mocks/user-info.json'),
  db = require("./database.js");

app.use(express.urlencoded({ limit: '50mb', extended: true }))
  .use(express.json({ limit: '50mb' }))
  .get('/api/navigation', (req, res) => {
    console.log('da vao')
    if (!req.headers.authorization) {
      res.sendStatus(401);
    } else {
      var sql = "select * from navigation";
      db.all(sql, (err, result) => {
        if (err) {
          res.status(500).json({ "error": err.message });
        } else {
          res.status(200).json(result);
        }
      });
    }
  })
  .get('/api/user', (req, res) => {
    if (!req.headers.authorization) {
      res.sendStatus(401);
    } else {
      res.json(authUser);
    }
  })
  .post('/api/login', (req, res) => { res.json(authUser); })
  .get('/api/user/info', (req, res) => {
    if (!req.headers.authorization) {
      res.sendStatus(401);
    } else {
      res.json(userInfo);
    }
  })
  .get('/api/users', (req, res) => {
    if (!req.headers.authorization) {
      res.sendStatus(401);
    } else {
      var sql = "select * from user";
      db.all(sql, (err, result) => {
        if (err) {
          res.status(500).json({ "error": err.message });
        } else {
          res.status(200).json(result);
        }
      });
    }
  })
  .post('/api/users', (req, res) => {
    if (!req.headers.authorization) {
      res.sendStatus(401); return;
    } else {
      const { user_name, mail, role } = req.body;
      if (!user_name || !mail || !role) {
        res.status(400); return;
      } else {
        const createdAt = new Date().getTime();
        const createdBy = 'system';
        var sql = 'INSERT INTO user (user_name, mail, role, created_at, created_by) VALUES (?,?,?,?,?)'
        var params = [user_name, mail, role, createdAt, createdBy];
        const stmt = db
          .prepare(sql, params)
          .run((err, result) => {
            if (err) {
              res.status(500).json({ 'error': err.message });
            } else {
              res.status(200).json({ employee_id: stmt.lastID, user_name, mail, role, created_at: createdAt, created_by: createdBy });
            }
          })
      }
    }
  })
  .put('/api/users/:id', (req, res) => {
    if (!req.headers.authorization) {
      res.sendStatus(401); return;
    } else {
      const { employee_id, user_name, mail, role } = req.body;
      db.run(`UPDATE user SET
              user_name = COALESCE(?,user_name),
              mail = COALESCE(?,mail),
              role = COALESCE(?,role)
              WHERE employee_id = ?`,
        [user_name, mail, role, req.params.id], (err, result) => {
          if (err) {
            res.status(500); return;
          }
          const updated_at = new Date().getTime();
          const updated_by = 'system';
          res.status(200).json({ ...req.body, updated_at, updated_by});
        });
    }
  })
  .get('/api/customers', (req, res) => {
    if (!req.headers.authorization) {
      res.sendStatus(401);
    } else {
      res.json([]);
    }
  })
  .use(bundler.middleware())
  .listen(portNumber, err => {
    if (err) {
      console.error('Unable to start Express.', err);
    } else {
      console.log(`Now listening on: http://localhost:${portNumber}`);
      console.log('Application started. Press Ctrl+C to shut down.');
    }
  });