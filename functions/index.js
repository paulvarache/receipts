const express = require('express');
const cors = require('cors');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const app = express();
app.use(cors());

app.get('/all', async (req, res) => {
    const snap = await admin.firestore()
        .collection('users')
        .limit(2)
        .get();
    const users = await Promise.all(snap.docs.map(async (userDoc) => {
        const receiptsSnap = await admin.firestore()
            .collection('users')
            .doc(userDoc.id)
            .collection('receipts')
            .orderBy('timestamp', 'desc')
            .get();
        const user = userDoc.data();
        return {
            name: user.name,
            receipts: receiptsSnap.docs.map(d => d.data()),
        };
    }));
    res.send(users);
});

app.get('/:uid', async (req, res) => {
    const snap = await admin.firestore()
        .collection('users')
        .doc(req.params.uid)
        .collection('receipts')
        .orderBy('timestamp', 'desc')
        .get();
    const data = [];
    snap.forEach((snapItem) => {
        data.push(Object.assign(snapItem.data(), { id: snapItem.id }));
    });
    res.send(data);
});

app.post('/:uid', async (req, res) => {
    const receipt = {
        type: req.body.type,
        value: req.body.value,
        timestamp: req.body.timestamp,
        label: req.body.label,
    };
    const ref = await admin.firestore()
        .collection('users')
        .doc(req.params.uid)
        .collection('receipts')
        .add(receipt);
    res.send(ref.id);
});
app.delete('/:uid/:id', async (req, res) => {
    await admin.firestore()
        .collection('users')
        .doc(req.params.uid)
        .collection('receipts')
        .doc(req.params.id)
        .delete();
    res.send({});
});

const users = express();
users.use(cors());

users.get('/:name', async (req, res) => {
    const db = admin.firestore();
    const user = {
        name: req.params.name,
    };
    const userSnapshot = await db.collection('users').where('name', '==', user.name).limit(1).get();
    if (!userSnapshot.empty) {
        res.send(userSnapshot.docs[0].id);
    } else {
        const ref = await db.collection('users').add(user);
        res.send(ref.id);
    }
});

exports.receipts = functions.https.onRequest(app);
exports.users = functions.https.onRequest(users);
