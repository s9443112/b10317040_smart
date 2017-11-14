var linebot = require('linebot');
var express = require('express');

var bot = linebot({
    channelId: '1546465131',
    channelSecret: '619970c732873283d90e86065c92c055',
    channelAccessToken: 'JiNLL7T/J4PvQtWI+zRo06jQztaBNfa89IVT2P2QQS2Le0EUlYWzEo1GKo5qgiVoJNBxAogjdT4vCa8HYrOyGy/lg7cd8m/qzOu8XdC6PoaB1wCpFGi37XhlwtZ2ikFmTqkGuemT/PReJjsBqLXoAQdB04t89/1O/w1cDnyilFU='
});

var get_userID;

var service_Msg ={
        "type": "template",
        "altText": "this is a buttons template",
        "template": {
            "type": "buttons",
            "thumbnailImageUrl": "https://upload.wikimedia.org/wikipedia/zh/thumb/7/79/Rem_from_Re-Zero_Episode_7.png/200px-Rem_from_Re-Zero_Episode_7.png",
            "title": "Menu",
            "text": "需要什麼服務",
            "actions": [
                {
                    "type": "postback",
                    "label": "查詢當下紅利餘額",
                    "data": "action=select"
                },
                {
                    "type": "postback",
                    "label": "匯入紅利代碼",
                    "data": "action=insert"
                },
                {
                    "type": "postback",
                    "label": "兌換免費遊玩",
                    "data": "action=change"
                },
                {
                    "type": "postback",
                    "label": "查詢機台地點",
                    "data": "action=select_where"
                }
            ]
        }
}



var userId = 'U6b9092b8b94288a689e880df6bd043e0';
var sendMsg = '智慧轉蛋機 我重開機了';
bot.push(userId, sendMsg);

bot.on('follow', function (event) {
    get_userID = event.source.userId;
    console.log('新用戶: ' + get_userID);
    var new_sendMSg = '歡迎使用智慧轉蛋機~\n使用功能請參照下列資訊\n並且輸入相對應代碼使用功能' + get_userID;
    bot.push(get_userID, new_sendMSg);
    bot.push(get_userID, service_Msg);
});

bot.on('message', function (event) {
    get_userID = event.source.userId; //取得使用者id
    msg = event.message.text;
    console.log("訊息來了");
    console.log("--------------");
    console.log(event); //顯示訊息格式
    console.log("--------------");
    if (event.message.type == 'text') {
        var msg = event.message.text;
        bot.push(get_userID, msg);
    }
});

bot.on('postback', function (event) {
    console.log('-----------------');
    console.log(event);
    console.log('-----------------');
    var reply = '';
    if (event.postback.data == 'action=select') {
        replyMsg = '請輸入機台編號';
        event.reply(replyMsg).then(function (data) {
            console.log("輸出line Msg " + replyMsg);
        }).catch(function (error) {
            console.log('輸出line error');
        });
    }
    if (event.postback.data == 'action=insert') {
        replyMsg = '請輸入紅利代碼';
        event.reply(replyMsg).then(function (data) {
            console.log("輸出line Msg " + replyMsg);
        }).catch(function (error) {
            console.log('輸出line error');
        });
    }
    if (event.postback.data == 'action=insert') {
        replyMsg = '免費遊玩開始';
        event.reply(replyMsg).then(function (data) {
            console.log("輸出line Msg " + replyMsg);
        }).catch(function (error) {
            console.log('輸出line error');
        });
    }
    if (event.postback.data == 'action=insert') {
        replyMsg = '機台位置目前在：';
        event.reply(replyMsg).then(function (data) {
            console.log("輸出line Msg " + replyMsg);
        }).catch(function (error) {
            console.log('輸出line error');
        });
    }
});





const app = express();
const linebotParser = bot.parser();

app.use(express.static(__dirname + '/templates'));
app.post('/', linebotParser);




var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});