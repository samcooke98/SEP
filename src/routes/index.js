var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();
var Team = require('../models/team');

var moment = require('moment');
import * as ResetLinkController from "../controllers/ResetLinkController.js";
import { ensureLoggedIn } from "connect-ensure-login"

router.get('/', function (req, res) {
    if(req.user != undefined)
        res.redirect('/feed');
        // res.render('index', { user: req.user });
    else 
        res.render('index');
});

router.get('/register', function (req, res) {
    res.render('register', {});
});

router.get('/reset', function(req, res) {
    res.render("reset", {rid: req.rid});
});
router.post('/reset', function(req, res) {
    ResetLinkController.createLink(30,req.body.username)
    res.render("reset", {snt: true, email: req.body.username});
});

router.get('/reset/confirm', function(req, res) {
    //Get the user from the RID variable
    //Load it into the view
    ResetLinkController.resetFromRID(req,res);
});
router.post('/reset/confirmAction', function(req, res) {
    //Put new password into the db
    ResetLinkController.changePassword(req.body.RID,req.body.password,res)
});


router.post('/register', function (req, res, next) {
    let newUser = new Account({ username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName });
    Account.register(newUser, req.body.password, function (err, account) {
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
            var team = (new Team({ owner: account._id, teamName: req.body.teamName, description: req.body.description, category: req.body.category, status: 'Invalid', creationDate: new moment().utc() }))
            team.save(function (err, team) {
                if (err) {
                    console.log(err);
                    console.log("^^^ DB ERROR ^^^");
                    res.render('/register', { error: err.message });
                } else {
                    //Add the team to the user
                    account.teams.push(team._id);
                    account.save();
                    res.redirect('/feed');
    
                }
            })
        });
    });
});


router.get('/feed', ensureLoggedIn(), function (req, res) {
    Account.findById(req.user._id, (err, user) => { 
        console.log(user);
        user.populate( 'teams', (err, userPopulated) => {
            let ownedTeams = [];
            let memberTeams = [];

            for( var team of userPopulated.teams) { 
                console.log(team);
                if(team.owner.equals(userPopulated._id)) 
                    ownedTeams.push(team);
                else memberTeams.push(team);
            }
            res.render('feed', { user: req.user.firstName + ' ' + req.user.lastName, ownedTeams: ownedTeams, memberTeams: memberTeams });            
        })
    })
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