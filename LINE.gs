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
                        //ここに抽出したタイトル情報を代入する。
                        "text": "Hello, World!",
                        "wrap": true
                      }]},
                  //１つ目のバブルのbody要素
                  "body": {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                      {
                        "type": "text",
                        //ここに要約を代入する。
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
                          //ここにid情報から抽出したURLを設定する。
                          "uri": "https://google.com"
                        }
                      }
                    ]
                  }
                }
           ]}
  }
 ]


function reply_flex(contents,replyToken){
  var url = 'https://api.line.me/v2/bot/message/reply';
    UrlFetchApp.fetch(url, {
      'headers':HEADER,
      'method': 'post',
      'payload': JSON.stringify({
        'replyToken': replyToken,
        'messages': contents,
      }),
    });
}

function reply_msg(msg,replyToken){
  var url = 'https://api.line.me/v2/bot/message/reply';
    UrlFetchApp.fetch(url, {
      'headers':HEADER,
      'method': 'post',
      'payload': JSON.stringify({
        'replyToken': replyToken,
        "type": "message",
        'messages': [
        {
            "type":"text",
            "text":"入力は以下の様にしてください。\n"
        },
        {
            "type":"text",
            "text":"検索文字:\n著者:\nカテゴリ:\n"
        },
        {
            "type":"text",
            "text":msg,
        }
    ],
      }),
    })
}

function getUserProfile(userId){ 
  var url = 'https://api.line.me/v2/bot/profile/' + userId;
  var userProfile = UrlFetchApp.fetch(url,{
    'headers': {
      'Authorization' :  'Bearer ' + CHANNEL_ACCESS_TOKEN,
    },
  })
  return JSON.parse(userProfile).displayName;
}
