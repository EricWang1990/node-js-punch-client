#!/bin/bash
#auto run punch-client script

EMP_ID="test"
EMP_PW="test123"
PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

#print run script local date
now=$(date +%Y-%m-%dT%H:%M:%S)
echo "================ 本地執行時間：$now ================"

#launchctl 執行的時候可能會找不到node path, 請確認NODE_HOME有export到.bash_profile
source ~/.bash_profile

#切換到專案目錄
cd $PROJECT_DIR

#判斷是否未安裝依賴套件
if [ ! -d "./node_modules" ]; then  #資料夾不存在進入
    npm install
    echo "初始化套件..."
fi

#Run punch.js punch command
node $PROJECT_DIR/punch.js -n $EMP_ID -p $EMP_PW
