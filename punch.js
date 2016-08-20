#!/usr/bin/env node
/**
 * Created by eric on 2016/7/31.
 */

var md5 = require('md5');
var ws = require('unirest');
var format = require('string-format');
var airport = require('airport-wrapper');
var notifier = require('node-notifier');
var config = require('./config');
var fs = require('fs');
var logFolderName = "log";
var punchJsonPath = './' + logFolderName + '/' + config.empId + '.json';

fs.readFile(punchJsonPath, "utf8", function (err, data) {
    if (err) {
        console.log(err);
        data = '{"nextPunchDate": "", "timestamp":0}';
        // writeNextPunchDateToFile();
    }

    var nextPunchTimestamp = JSON.parse(data).timestamp || 0;
    if (nextPunchTimestamp != 0 && nextPunchTimestamp > (new Date().getTime())) {
        console.log("Error : 未到指定的打卡時間");
    } else {
        scanWiFiAndPunch();
        // showMessageAndLog("還是有問題");
    }
});

function scanWiFiAndPunch() {
    return airport.scan(function (err, data) {
        if (config.empId == undefined || config.empPw == undefined) {
            showMessageAndLog("Error : " + '請輸入EIP帳號密碼\n(punch -n 帳號 -p 密碼)');
        }

        if (err) {
            showMessageAndLog("Error : " + err);
        }

        //find wifi SSID
        var isInScope = false;

        for (var i = 0; i < data.length; i++) {
            if (data[i].ssid == config.ssidName) {
                // console.log("您在公司內, 打卡中...");
                isInScope = true;
                break;
            } else {
                // console.log("找到SSID: " + data[i].ssid);
            }
        }

        (isInScope ? signIn() : showMessageAndLog("請開啟Wi-Fi, 並確認可接收到「" + config.ssidName + "」訊號."));
    });
}

function showMessageAndLog(msg) {
    var date = new Date();
    console.log(date + " " + msg);
    notifier.notify({
        'title': 'punch',
        'message': msg || "ERROR!",
    });
}

function signIn() {
    ws.post(config.serverUrl)
        .send({account: config.empId, password: config.empPw, hash: getClientHash()})
        .end(function (response) {
            if (response && response.body) {
                if (response.body.result) {
                    showMessageAndLog('打卡成功!');
                    writeNextPunchDateToFile();
                } else {
                    showMessageAndLog('打卡失敗: ' + response.body.error);
                }
            } else {
                showMessageAndLog('打卡失敗: Server無回應.');
            }
        });
}

function getClientHash() {
    var date = new Date();
    //yyyyMMdd-account-password
    return md5(format('{0}{1}{2}-{3}-{4}',
        date.getFullYear(),
        ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1),
        (date.getDate() < 10 ? '0' : '') + date.getDate(),
        config.empId,
        config.empPw));
}

function writeNextPunchDateToFile() {
    var date = new Date();
    var dayOfWeek = date.getDay() > 4 ? 1 : (date.getDay() + 1);
    date.setDate(date.getDate() + (dayOfWeek + 7 - date.getDay()) % 7);
    date.setHours(9);
    date.setMinutes(0);
    date.setSeconds(0);
    console.log('下次打卡時間：' + date);
    if (false == fs.existsSync(logFolderName)) {
        fs.mkdirSync(logFolderName);
    }
    fs.writeFile(punchJsonPath, JSON.stringify({
        nextPunchDate: date.toLocaleString(),
        timestamp: date.getTime()
    }), "utf8", null);
}
