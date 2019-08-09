function getArxivData(){
  var url = 'http://export.arxiv.org/api/query?search_query=all:electron&start=0&max_results=10';
  var res = UrlFetchApp.fetch(url,{'method':'get'});
  Logger.log(res)
  res = XmlService.parse(res.getContentText())
  entry_nsp = XmlService.getNamespace('entry', 'http://www.w3.org/2005/Atom')
  var rootDoc = res.getRootElement().getChildren('entry',entry_nsp);
  for (var i=0;i<rootDoc.length;i++){
    chil = rootDoc[i].getChild('summary',entry_nsp)
    
    Logger.log(chil)
  }
  return res
}
