const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database("management.db", err => {
  if (err) {
    console.error(`Could not connect to "management" caused by: ${err.message}`)
  } else {
      db.run(`CREATE TABLE IF NOT EXISTS user (
        employee_id INTEGER PRIMARY KEY AUTOINCREMENT,
        display_name TEXT,
        user_name TEXT,
        job_title TEXT,
        mail TEXT,
        mobile_phone TEXT,
        role TEXT,
        created_at INTEGER,
        created_by TEXT,
        updated_at INTEGER,
        updated_by TEXT
      )`, err => {
        if (err) {
          console.error(err);
        } else {
          var insert = 'INSERT INTO user (display_name, user_name, job_title, mail, mobile_phone, role, created_at, created_by, updated_at, updated_by) VALUES (?,?,?,?,?,?,?,?,?,?)'
          db.run(insert, ["Hoa Nguyen", "hoanguyen", "Employee", "hoa.nguyen@backery.vn", "09111111111", "ROLE_ADMIN", new Date().getTime(), "system", '', ''])
        }
      });
      db.run(`CREATE TABLE IF NOT EXISTS navigation (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
      )`, err => {
        if (err) {
          console.error(err);
        } else {
          var insert = 'INSERT INTO navigation (name) VALUES (?)';
          db.run(insert, ["Dashboard"]);
        }
      });
  }
});

module.exports = db;