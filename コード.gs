var CHANNEL_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('LINE_AC_TK'); // Channel_access_tokenを登録
Logger.log(CHANNEL_ACCESS_TOKEN)
var HEADER = {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
      }
//if http POST coming ,this function will execute
function doPost(e) {
  /*
  param
  e: event object of request
  e.postData.contents: the data link with post method
  */
  var event = JSON.parse(e.postData.contents).events[0];

  var contents = [
  {
        "type": "flex",
        "altText": "this is a flex message",
        "contents": {
              "type": "carousel",
          //ここからカルーセルに表示するバブル要素の辞書
              "contents": [
                //一つ目のバブルの設定
                {
                  "type": "bubble",
                  //１つ目のバブルのheader要素
                  "header":{"type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "text",
                        "text": String(event),
                        "wrap": true
                      }]},
                  //１つ目のバブルのbody要素
                  "body": {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "text",
                        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                        "wrap": true
                      }
                    ]
                  },
                  //一つ目のバブルのfooter要素
                  "footer": {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "style": "primary",
                        "action": {
                          "type": "uri",
                          "label": "Go",
                          "uri": "https://google.com"
                        }
                      }
                    ]
                  }
                },
                
                {
                  "type": "bubble",
                  
                  "body": {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "text",
                        "text": event.message.text,
                        "wrap": true
                      }
                    ]
                  },
                  
                  "footer": {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "button",
                        "style": "primary",
                        "action": {
                          "type": "uri",
                          "label": "Go",
                          "uri": "https://example.com"
                        }
                      }
                    ]
                  }
                }
              ]
         }
        }
  ]
  
  var replyToken= event.replyToken;

  if (typeof replyToken === 'undefined') {
    return; // エラー処理
  }
  var userId = event.source.userId;
  var nickname = getUserProfile(userId);

  if(event.type == 'follow') { 
    // ユーザーにbotがフォローされた場合に起きる処理
  }
  
//ユーザーからのイベントを検知する。文章であればmessage
  else if(event.type == 'message') {
    
    //ここで入力をスプリットして受け取ります。
    var userMessage = String(event.message.text.split(' '));
    
    //リクエストがヘルプである場合、また入力文字列が適切でない場合に返答します。
    if(userMessage[0] == 'ヘルプ' || userMessage.length != 2){
      reply_help(replyToken)
    }
    else{
      
      var res = getArxivData(q)
      reply_msg(userMessage,replyToken)
      
    }
    
    
    
    return ContentService.createTextOutput(
      JSON.stringify({'content': 'post ok'})
    ).setMimeType(ContentService.MimeType.JSON);
  }
}


function make_ArxivQuwery(eventType,quwery){
  if(eventType == '著者'){
    Arquwery = 'au:' + quwery;
  }
}
