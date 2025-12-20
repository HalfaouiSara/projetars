const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testRegister() {
  try {
    const register = await axios.post(`${BASE_URL}/auth/register`, {
      username: 'testuser',
      email: 'test@test.com',
      password: '123456',
      interests: ['sport', 'music']
    });
    console.log('User registered:', register.data);
  } catch (err) {
    if (err.response) {
      // Le backend a renvoyé une réponse (ex: 400, 500)
      console.error('Erreur du backend:', err.response.status, err.response.data);
    } else if (err.request) {
      // La requête a été envoyée mais aucune réponse reçue
      console.error('Pas de réponse du serveur:', err.request);
    } else {
      // Autre erreur
      console.error('Erreur:', err.message);
    }
  }
}

testRegister();
