#!/usr/bin/env node

/**
 * Created by eric on 2016/8/7.
 */
var argv = require('yargs').argv;

var isDebug = false;
var serverUrl = isDebug ? 'http://localhost:3000/login' : 'https://afternoon-beyond-50970.herokuapp.com/login';
var ssidName = isDebug ? 'W-WiFi_5G' : 'Punch-WiFi';
var userAccount = isDebug ? 'test' : (argv.n || '');
var userPassword = isDebug ? 'test123' : (argv.p || '');

module.exports = {
    isDebug: isDebug,
    serverUrl: serverUrl,
    ssidName: ssidName,
    empId: userAccount,
    empPw: userPassword
};
