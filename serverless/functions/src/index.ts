
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as bodyParser from "body-parser";

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const app = express();
const main = express();

main.use('/api/v1', app);
main.use(bodyParser.json());

export const webApi = functions.https.onRequest(main);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.post('/utilisateurs', async (request, response) => {
  try {

    const { idUtilisateur, nom, prenom, mail, telephone, photo } = request.body;
    const data = {
      idUtilisateur,
      nom,
      prenom,
      mail,
      telephone,
      photo
    }

    await db.collection('utilisateurs').doc(idUtilisateur).set(data);
    await db.collection('commandes').doc(idUtilisateur).set({});

    response.json({
      id: idUtilisateur
    });


  } catch (error) {

    response.status(500).send(error);

  }
});

app.delete('/utilisateurs', async (request, response) => {
  try {

    const idUtilisateur = request.query.idUtilisateur;

    if (!idUtilisateur) throw new Error('idUtilisateur is blank');

    await db.collection('utilisateurs')
      .doc(idUtilisateur)
      .delete();

    response.json({
      id: idUtilisateur,
    })


  } catch (error) {

    response.status(500).send(error);

  }

});

app.get('/utilisateurs', async (request, response) => {
  try {
    const idUtilisateur = request.query.idUtilisateur;

    if (!idUtilisateur) throw new Error('Utilisateur ID is required');

    const utilisateur = await db.collection('utilisateurs').doc(idUtilisateur).get();

    if (!utilisateur.exists) {
      throw new Error('Utilisateur doesnt exist.')
    }

    response.json({
      id: utilisateur.id,
      data: utilisateur.data()
    });

  } catch (error) {

    response.status(500).send(error);

  }
});



app.post('/favoris', async (request, response) => {
  try {

    const { idUtilisateur, films } = request.body;
    const data = {
      films
    }


    await db.collection('favoris').doc(idUtilisateur).set(data);

    response.json({
      id: idUtilisateur,
      films: films
    })

  } catch (error) {

    response.status(500).send(error);

  }
});

app.get('/favoris', async (request, response) => {
  try {
    const idUtilisateur = request.query.idUtilisateur;

    if (!idUtilisateur) throw new Error('Utilisateur ID is required');

    const favoris = await db.collection('favoris').doc(idUtilisateur).get();

    if (!favoris.exists) {
      throw new Error('Favoris doesnt exist.')
    }

    response.json({
      id: favoris.id,
      data: favoris.data()
    });

  } catch (error) {

    response.status(500).send(error);

  }
});

app.delete('/favoris', async (request, response) => {
  try {

    const idUtilisateur = request.query.idUtilisateur;

    if (!idUtilisateur) throw new Error('idUtilisateur is blank');

    await db.collection('favoris')
      .doc(idUtilisateur)
      .delete();

    response.json({
      id: idUtilisateur,
    })


  } catch (error) {

    response.status(500).send(error);

  }

});


app.post('/commandes', async (request, response) => {
  try {
    const { idUtilisateur, films, date } = request.body;
    const data = {
      films,
      date
    }

    const docRef = await db.collection('commandes').doc(idUtilisateur);

    await docRef.update("achats",admin.firestore.FieldValue.arrayUnion(data))

    const commandes = await db.collection('commandes').doc(idUtilisateur).get();

    response.json({
      achats: commandes.data()
    })


  } catch (error) {

    response.status(500).send(error);

  }
});

app.get('/commandes', async (request, response) => {
  try {

    const idUtilisateur = request.query.idUtilisateur;

    if (!idUtilisateur) throw new Error('Utilisateur ID is required');

    const commande = await db.collection('commandes').doc(idUtilisateur).get();

    if (!commande.exists) {
      throw new Error('Commandes doesnt exist.')
    }

    response.json({
      id: commande.id,
      data: commande.data()
    });

  } catch (error) {

    response.status(500).send(error);

  }


});

app.delete('/commandes', async (request, response) => {
  try {

    const idUtilisateur = request.query.idUtilisateur;

    if (!idUtilisateur) throw new Error('idUtilisateur is blank');

    await db.collection('commandes')
      .doc(idUtilisateur)
      .delete();

    response.json({
      id: idUtilisateur,
    })


  } catch (error) {

    response.status(500).send(error);

  }

});
