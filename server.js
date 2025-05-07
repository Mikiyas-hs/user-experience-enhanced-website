// console.log('Hier komt je server voor Sprint 10.');
// console.log('Gebruik uit Sprint 9 alleen de code die je mee wilt nemen.');
// console.log('Zet \'m op!');

import express from 'express';
import { Liquid } from 'liquidjs';

const apiEndpoint = 'https://fdnd-agency.directus.app/items/dropandheal_';
const apiTask = 'task';
const apiExercise = 'exercise';

// Fetch data van API
const taskResponse = await fetch(`${apiEndpoint}${apiTask}`);
const exerciseResponse = await fetch(`${apiEndpoint}${apiExercise}`);
const taskResponseJSON = await taskResponse.json();
const exerciseResponseJSON = await exerciseResponse.json();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// View engine setup
const engine = new Liquid();
app.engine('liquid', engine.express());

// Routes
app.get('/', async (req, res) => {
  const taskRes = await fetch(`${apiEndpoint}task/?filter={"id":1}`);
  const exerciseRes = await fetch(`${apiEndpoint}exercise/?filter={"task":1}`);
  const { data: tasks } = await taskRes.json();
  const { data: exercise } = await exerciseRes.json();

  res.render('index.liquid', { tasks, exercise });
});

app.get('/chat', async (req, res) => {
  const chatRes = await fetch('https://fdnd-agency.directus.app/items/dropandheal_messages?&limit=-1');
  const chatData = await chatRes.json();

  // Reverse order: nieuwste bericht komt boven
  const chat = chatData.data.reverse();
  res.render('chat.liquid', { chat });
});

//post functie
app.post('/chat', async (req, res) => {
  const { from, text } = req.body;

  await fetch('https://fdnd-agency.directus.app/items/dropandheal_messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, text }),
  });

  res.redirect(303, '/chat');
});

//delete functie
app.post('/chat/delete/:id', async (req, res) => {
  const { id } = req.params;
  const apiResponse = await fetch(
    `https://fdnd-agency.directus.app/items/dropandheal_messages/${id}`,
    { method: 'DELETE', headers: { 'Content-Type': 'application/json' } }
  );

  if (apiResponse.ok) {
    res.redirect(303, '/chat');
  } else {
    res.status(500).send('Er is iets misgegaan met het verwijderen van het bericht.');
  }
});

// Server setup
app.set('port', process.env.PORT || 8000);
app.listen(app.get('port'), () => {
  console.log(
    `Server draait op http://localhost:${app.get('port')}/`,
    '\nJe kunt de website bekijken'
  );
});
