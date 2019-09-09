var config = require('config.json');
var express = require('express');
var router = express.Router();
var perguntaService = require('services/pergunta.service');

// routes
//router.post('/authenticate', authenticatePergunta);
router.post('/register', registerPergunta);
router.get('/current', getCurrentPergunta);
router.put('/:_id', updatePergunta);
router.delete('/:_id', deletePergunta);

module.exports = router;

function authenticatePergunta(req, res) {
    perguntaService.authenticate(req.body.pergunta, req.body.pergunta)
        .then(function (response) {
            if (response) {
                // authentication successful
                res.send({ perguntaId: response.perguntaId, token: response.token });
            } else {
                // authentication failed
                res.status(401).send('Perguntaname or password is incorrect');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function registerPergunta(req, res) {
    perguntaService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrentPergunta(req, res) {
    perguntaService.getById(req.session.perguntaId)
        .then(function (pergunta) {
            if (pergunta) {
                res.send(pergunta);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updatePergunta(req, res) {
    var perguntaId = req.session.perguntaId;
    if (req.params._id !== perguntaId) {
        // can only update own account
        return res.status(401).send('You can only update your own account');
    }

    perguntaService.update(perguntaId, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function deletePergunta(req, res) {
    var perguntaId = req.session.perguntaId;
    if (req.params._id !== perguntaId) {
        // can only delete own account
        return res.status(401).send('You can only delete your own account');
    }

    perguntaService.delete(perguntaId)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}