
#!/bin/bash
#regist osx launchd script. Create by eric.w 2016/08/06

LAUNCHCTL_FILE_NAME="tw.itiman.punch.client.plist"
LAUNCHCTL_SERVICE_NAME="tw.itiman.punch.client"
APP_FILE_NAME="punch.js"
AUTO_RUN_FILE_NAME="auto-run.sh"
#300秒(5分鐘自動執行一次)
START_INTERVAL="300"
#auto-run.sh path
SOURCE="${BASH_SOURCE[0]}"
#project root path
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

function copyPlistToLaunchLaunchAgentsDir {
        echo "複製plist檔案到 ~/Library/LaunchAgents/ 目錄!"
                        cp ./$LAUNCHCTL_FILE_NAME ~/Library/LaunchAgents/
                        if [ ! -f ~/Library/LaunchAgents/$LAUNCHCTL_FILE_NAME ];
                                then
                                        echo "複製plist檔案失敗!"
                                else
                                        echo "複製plist檔案成功!"
                                        #載入 plist
                                        launchctl load -w ~/Library/LaunchAgents/$LAUNCHCTL_FILE_NAME
                        fi
}

function requestLaunchctl {
        #複製plist檔到 "~/Library/LaunchAgents/" 目錄
        if [ ! -f ~/Library/LaunchAgents/$LAUNCHCTL_FILE_NAME ];
                then
                        copyPlistToLaunchLaunchAgentsDir
                else
                        echo "plist檔已存在!"
                        launchctl unload -w ~/Library/LaunchAgents/$LAUNCHCTL_FILE_NAME
                        rm -f ~/Library/LaunchAgents/$LAUNCHCTL_FILE_NAME
                        copyPlistToLaunchLaunchAgentsDir
        fi
}

function buildPlist {
        cat > $LAUNCHCTL_FILE_NAME <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
        <key>StartInterval</key>
        <integer>$START_INTERVAL</integer>
        <key>ProgramArguments</key>
        <array>
                <string>/bin/sh</string>
                <string>$DIR/$AUTO_RUN_FILE_NAME</string>
        </array>
        <key>StandardErrorPath</key>
        <string>$DIR/log/error.log</string>
        <key>StandardOutPath</key>
        <string>$DIR/log/output.log</string>
        <key>Label</key>
        <string>$LAUNCHCTL_SERVICE_NAME</string>
        <key>RunAtLoad</key>
        <true/>
</dict>
</plist>
EOF
}

#切換到專案目錄
cd $DIR

if [ ! -d "./log" ];
	then
        echo "log dir not found! make it..."
        mkdir log
fi

#檢查自動打卡的設定檔
if [ ! -f ./$LAUNCHCTL_FILE_NAME ];
	then
        echo $LAUNCHCTL_FILE_NAME "file not found!"
        buildPlist
fi

requestLaunchctl
