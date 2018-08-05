var http = require('http'); 
http.createServer(function (req, res) { res.writeHead(200, { 'Content-Type': 'text/plain' }); 
res.end('Hello World'); }).listen(3000); 
console.log('Server running at http://localhost:3000/');

var request = require("request");
var cheerio = require("cheerio");
var iconv = require("iconv-lite");
var charset = require("charset");
var jschardet = require("jschardet");
var fs = require('fs');

//내부 모듈
var ScraperOpt = require("./scraper_option.js");
var SiteName = "naver";
var HeaderOption = ScraperOpt.SetOptions(SiteName);

request(HeaderOption, function(error, response, html)
{   
    const enc = charset(response.headers, html) // 해당 사이트의 charset값을 획득, encoding
    const decode_text = iconv.decode(html, enc)
    var $ = cheerio.load(decode_text.toString());

    var data = ScraperOpt.SetData(SiteName, $);

    //Json 배열을 문자열로 변경 후, 파일로 저장
    fs.writeFileSync(SiteName + ".txt", '\ufeff' + JSON.stringify(data), {encoding: 'utf8'});
});