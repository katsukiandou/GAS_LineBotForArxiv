/*

event.type : String. event type of line messageing api (ex. text flex ....)
event.replytoken: String. reply token  for return the messaging api
event.source: Object. source data for line user info
event.message.text : String. text information from user input



return headder info------
messages: LIST[] : contains message info list ,the num of list will sending message num

技術的制限
* リプライトークンの有効期限は30秒以内
* LINEのカルーセルで一度にアップできる数は５つまで。(arxivで取ってくる論文数も5つまででよい。)

ユーザアンケート
* 使用する際には出版年が早いものから、要約とタイトルがほしい。
* 原文と翻訳文を選べる様にしてほしい
* カテゴリで選べる様にしてほしい。
* 著者名で検索させてほしい、要約文で検索させてほしい
* メッセージのテンプレートがほしい

明日の実装内容

データ構造
arxiv側{id:url情報, title:論文タイトル summary:論文の要約}

LINE側
カルーセル:
  type:bubble
    header:title
    body:summary
    footer:url button



arxiv側-1
1.arXivから戻ってきたXmlからParseしたentry情報(1,id:url情報, 2,title:論文タイトル 3,summary:論文の要約)をオブジェクト化する、
2.1のリストからオブジェクトを取り出し、summaryを翻訳した後にsummaryに戻す
3.2をリストの形で戻し、LINEのcontentsにリストとして渡す。



LINE側
UI面
1.タイトルを載せる部分、要約の翻訳文を載せる部分、論文のURLと結びついたボタンをもつカルーセルを作成する。
2.contentsの雛形（type：buble以下)にarxivからのデータを渡す。
3.表示する。

Controller面
1.ユーザからの入力を受け取る。
2.入力から適切な形に検索する様に変換する。

arXivの検索
参考URL https://qiita.com/KMD/items/bd59f2db778dd4bf6ed2
       　https://arxiv.org/help/api/user-manual
urlのsearch?=以下につけるパラメータの名称とデータ型
parameters	type	defaults	required

search_query	string	None	No　:  クエリから論文を探す。複数単語で検索する場合, " の代わりに%22で囲む
例 　http://export.arxiv.org/api/query?search_query=au:%22 Gopal Krishna %22
# 著作者がDonaldかつタイトルにLegesgueが入る論文を検索するときはANDを使う
http://export.arxiv.org/api/query?search_query=au:Donald +AND+ti:Lebesgue

id_list	comma-delimited string	None	No: 論文IDのリストを使用して論文を探す。
例 http://export.arxiv.org/api/query?id_list＝［1302010]

start	int	0	none  : 論文を検索するインデックスの
max_results	int	10 none

修飾子　(検索クエリの後に指定する search_quwery=修飾子:クエリ　の順番)
prefix	explanation
ti	タイトル(Title) 論文のタイトルで検索する
au	著作者(Author)論文の著作者で検索する
abs	概要(Abstract)論文のアブストラクトで検索する
co	コメント(Comment)論文のコメントで検索する
jr	雑誌名(Journal Reference)論文のジャーナルで検索する
cat	サブジャンルカテゴリー(Subject Category) 論文のサブカテゴリで検索する。
rn	Report Number
id	Id (use id_list instead)論文IDで検索する。
all	上記の全て

サブジャンルカテゴリのキーワード一覧 (search_quwery=cat:キーワード)
prefix  category
cs.AI	Artificial Intelligence
cs.MS	Mathematical Software
cs.NA	Numerical Analysis
cs.NE	Neural and Evolutionary Computing
cs.GT	Computer Science and Game Theory
cs.HC	Human-Computer Interaction
cs.CL	Computation and Language
cs.CR	Cryptography and Security
cs.CV	Computer Vision and Pattern Recognition
cs.CE	Computational Engineering, Finance, and Science


*/
