var linebot = require('linebot');
var express = require('express');
var crypto = require('crypto');
var modules = require('/modules/modules.js');


var bot = linebot({
    channelId: '1523598858',
    channelSecret: 'd0fb193f3cb311760c7194039ea3f269',
    channelAccessToken: 'DLkKE+hL1Qu/1mGW6eiE5n/YfM08G0OHxMp6rE4c3K8toWn9i+ErQvx8a+woVDUkMCrCWiq/TCmDSTdtUbztN60l+8d+QytQ1iS4Ojg2us9gpALPP6EI/bIbe7mHVWhPhtnGYZiaRjlfOFckYHHJGQdB04t89/1O/w1cDnyilFU='
});

var get_userID;
var flag;
var new_sendMSg = '歡迎使用智慧轉蛋機~\n使用功能請參照下列資訊\n並且輸入相對應代碼使用功能' + get_userID;
var service_Msg = {
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
                "label": "生成隨機碼",
                "data": "action=insert"
            },
            {
                "type": "postback",
                "label": "查詢紅利代碼",
                "data": "action=select"
            }

        ]
    }
}




var userId = 'U6b9092b8b94288a689e880df6bd043e0';
var sendMsg = '智慧轉蛋機-管理者 我重開機了';
bot2.push(userId, sendMsg);

bot.on('follow', function (event) {
    get_userID = event.source.userId;
    console.log('新管理者: ' + get_userID);

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
        setTimeout(function () {
            bot.push(get_userID, service_Msg);
        }, 2000)

    } else {
        bot.push(get_userID, '我看不懂喔！');
    }
});

bot.on('postback', function (event) {
    console.log('-----------------');
    console.log(event);
    console.log('-----------------');
    var reply = '';
    if (event.postback.data == 'action=insert') {
      

        var buf = crypto.randomBytes(16);
        replyMsg = "隨機產生驗證碼"+buf.toString('hex');
        console.log(buf.toString('hex'));

        event.reply(replyMsg).then(function (data) {
            console.log("輸出line Msg " + replyMsg);
            flag = 1;
        }).catch(function (error) {
            console.log('輸出line error');
        });
    } 
    if (event.postback.data == 'action=select') {
      

       
        replyMsg = "還沒做好拉幹";
       

        event.reply(replyMsg).then(function (data) {
            console.log("輸出line Msg " + replyMsg);
            flag = 1;
        }).catch(function (error) {
            console.log('輸出line error');
        });
    }else {
        bot.push(get_userID, '錯誤回傳postback');
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