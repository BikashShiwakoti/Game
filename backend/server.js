const express = require('express');
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require('body-parser');
const firebase = require('firebase-admin');

const app = express();
app.use(express.json());

const PORT = 3000;


const serviceAccount = require('./game-eb7be-firebase-adminsdk-9lvy4-4e69a1950c.json');
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://game-eb7be-default-rtdb.firebaseio.com/'
});

const database = firebase.database();
app.use(bodyParser.json());


// Endpoint to handle updates
app.post('/update', (req, res) => {
  const { username, result } = req.body;

  // Generate a unique identifier for each result (e.g., using a timestamp)
  const timestamp = Date.now();
  const resultData = {
    timestamp,
    result
  };

  // Update data in Firebase Realtime Database under a new child node
  const userRef = database.ref(`/users/${username}/results`).push();
  userRef.set(resultData)
    .then(() => {
      res.json({ status: 'success' });
    })
    .catch((error) => {
      res.status(500).json({ status: 'error', message: error.message });
    });
});


// Endpoint to fetch leaderboard data
app.get('/leaderboard', (req, res) => {
  const leaderboardRef = database.ref('users');
  const leaderboard = [];

  leaderboardRef.once('value')
    .then(snapshot => {
      snapshot.forEach(userSnapshot => {
        const username = userSnapshot.key;
        const resultsSnapshot = userSnapshot.child('results');

        let correctCount = 0;
        resultsSnapshot.forEach(resultSnapshot => {
          const resultData = resultSnapshot.val();
          if (resultData.result == 'correct') {
            correctCount++;
          }
        });

        leaderboard.push({ username, correctCount });
      });

      // Sort the leaderboard based on correctCount (or any other criteria)
      leaderboard.sort((a, b) => b.correctCount - a.correctCount);

      // Take only the top 10 leaders
      const top10Leaders = leaderboard.slice(0, 10).map(entry => entry.username);

      // Send the top 10 leaders as the response
      res.json({ leaders: top10Leaders });
    })
    .catch(error => {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ error: 'Failed to fetch leaderboard' });
    });
});





const db = new sqlite3.Database('mydatabase.db');

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS users");

  db.run("CREATE TABLE users (username TEXT, password TEXT)");
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Query the database to check if the user exists
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
      if (err) {
        console.error(err);
        res.status(500).json({ status: 'error', message: `Internal Server Error! ` });
        return;
      }
  
      if (row) {
        // User exists, send success response
        res.json({ status: 'success', message: 'Login successful' });
      } else {
        // User not found or incorrect password, send failure response
        res.status(401).json({ status: 'failure', message: 'Username and/or password incorrect' });
      }
    });
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?',[username], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
      return;
    }
    if(row){
      res.json({status: 'failure', message: `user with ${username} already exist. Try another !!`})
    }else{
      db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ status: 'error', message: 'Internal server error' });
          return;
        }
      
        // Insertion successful, send success response
        res.json({ status: 'success', message: 'Signup Success' });
      });
    }
  });
});

// Backend API endpoint for performing math calculations
app.post('/calculate-answer', (req, res) => {
  const { num1, num2, userAnswer } = req.body;
  const sum = num1 + num2;
  const isCorrect = userAnswer === sum;
  res.json({ isCorrect, correctAnswer: sum });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
