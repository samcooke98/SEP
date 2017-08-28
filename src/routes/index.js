var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var Team = require('../models/team');
var moment = require('moment');
import { ensureLoggedIn } from "connect-ensure-login"

router.get('/', function (req, res) {
    res.render('index', { user: req.user });
});

router.get('/register', function (req, res) {
    res.render('register', {});
});

router.post('/register', function (req, res, next) {

    Account.register(new Account({ username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName }), req.body.password, function (err, account) {
        if (err) {
            return res.render('register', { error: err.message });
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    console.log(err);

                }
                //     res.redirect('/');
            });
        });


        console.log(req.body);
        var team = (new Team({ owner: account._id, teamName: req.body.teamName, description: req.body.description, category: req.body.category, status: 'Invalid', creationDate: new moment().utc() }))
        team.save(function (err, team) {
            if (err) {
                console.log(err);
                console.log("^^^ DB ERROR ^^^");
                res.render('/register', { error: err.message });
            } else {
                res.redirect('/feed');

            }
        })
    });
});


router.get('/feed', ensureLoggedIn(), function (req, res) {
    res.render('feed', { user: req.user.firstName + ' ' + req.user.lastName });
});

router.get('/login', function (req, res) {
    res.render('login', { user: req.user });
});

router.post('/login', passport.authenticate('local', { successReturnToOrRedirect: '/feed', failureRedirect: '/login' }))

router.get('/teamSignUp', function (req, res) {
    res.render('teamSignUp', { user: req.user });
});


router.post('/teamSignUp', function (req, res, next) {
    console.log(req.body);
    var team = (new Team({ teamName: req.body.teamName, description: req.body.description, category: req.body.category, status: 'Invalid', creationDate: new moment().utc() }))
    team.save(function (err, team) {
        if (err) {
            console.log(err);
            console.log("^^^ DB ERROR ^^^");
            return res.render('teamSignUp', { error: err.message });
        }
        res.redirect('/');
    })

});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function (req, res) {
    res.status(200).send("pong!");
});

module.exports = router;