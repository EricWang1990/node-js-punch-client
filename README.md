
===
#從此不會再忘記打卡囉！！！   
===
1. 請確認已安裝 [nodejs](https://nodejs.org/en/) 環境
2. Open `auto-run.sh` 設定你的 EMP_ID、EMP_PW (Default: `test`/`test123`)
3. Open `config.js` 設定你的 WiFi SSID (Default: `Punch-Wifi`)
4. Run  `sh ./auto-run.sh`

### 懶人安裝包(-測試中, 目前無法正常Work-)
下載、安裝、執行一次打卡  

```
git clone https://github.com/ericwang16/node-js-punch-client.git node-js-punch-client && cd node-js-punch-client && ./auto-run.sh
```

下載、安裝、註冊自動打卡功能、執行一次打卡(OSX)

```
git clone https://github.com/ericwang16/node-js-punch-client.git node-js-punch-client && cd node-js-punch-client && ./regist-osx-launchctl.sh
```

修改員工帳號密碼  

````
$ open ./auto-run.sh
````

修改config檔 

````
$ open ./config.js

var isDebug = false; //true
````

### Installation

安裝依賴套件

````
$ npm install
````

執行打卡命令

````
$ node punch.js -n {EMP_ID} -p {EMP_PW}
````

#### Optional
You can use "punch" command

````
$ npm link
````

````
$ punch -n {EMP_ID} -p {EMP_PW}
````

````
$ npm unlink
````


### 自動打卡設定
編輯員工帳號(EMP_ID), 密碼(EMP_PW)

````
$ open ./AutoRun.sh
````

註冊自動打卡功能

````
$ ./regist-osx-launchctl.sh
````

查詢是否已註冊自動打卡(無echo結果表示未註冊)

````
$ launchctl list | grep tw.itiman.punch.client
$ -    0    tw.itiman.punch.client
````

移除自動打卡功能  

````
$ launchctl unload -w ~/Library/LaunchAgents/tw.itiman.punch.client.plist
````

移除自動打卡功能的plist檔

````
$ rm -f ~/Library/LaunchAgents/tw.itiman.punch.client.plist
````


### Reference
一開始使用OSX的Automator來自動打卡  
<http://stackoverflow.com/questions/6442364/running-script-upon-login-mac>

Creating and writing into .plist with Terminal OR bah script  
<http://stackoverflow.com/questions/27379507/creating-and-writing-into-plist-with-terminal-or-bah-script>

How do I tell if a regular file does not exist in bash?  
<http://stackoverflow.com/questions/638975/how-do-i-tell-if-a-regular-file-does-not-exist-in-bash>

Can a Bash script tell which directory it is stored in?  
<http://stackoverflow.com/questions/59895/can-a-bash-script-tell-which-directory-it-is-stored-in>

shell如何寫function  
<http://tldp.org/HOWTO/Bash-Prog-Intro-HOWTO-8.html>

shell如何取得日期時間  
<http://stackoverflow.com/questions/1401482/yyyy-mm-dd-format-date-in-shell-script>

測試shell語法  
<https://www.shellcheck.net>

shell載入使用者的bash_profile(launchctl執行時找不到node路徑)  
<http://stackoverflow.com/questions/2518127/how-do-i-reload-bashrc-without-logging-out-and-back-in>

Markdown語法  
<http://markdown.tw>

Mac - 使用 Launchd 管理例行性任務
<http://hatemegalaxy.blogspot.tw/2016/01/mac-launchd-use-launchd-to-manage-and.html>

Mac OSX launchd  
<https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man5/launchd.plist.5.html>

Using Launchd to run a script every 5 mins on a Mac
<http://www.splinter.com.au/using-launchd-to-run-a-script-every-5-mins-on/>

Creating Launch Daemons and Agents
<https://developer.apple.com/library/mac/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CreatingLaunchdJobs.html#//apple_ref/doc/uid/10000172i-SW7-BCIEDDBJ>


