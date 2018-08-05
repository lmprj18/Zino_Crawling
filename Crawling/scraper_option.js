
// Naver 뉴스 설정
var SetNaver = {};
SetNaver.SiteName = "naver";
SetNaver.HeaderOpt = {method: "GET" ,uri: "http://news.naver.com/main/list.nhn?mode=LPOD&mid=sec&sid1=001&sid2=140&oid=001&isYeonhapFlash=Y" 
                     ,headers: { "User-Agent": "Mozilla/5.0" } 
                     ,encoding: null };

SetNaver.SetData = function ($) {
    var ArrayData = new Array();

    var Idx = $(".type02 > li > a");
    Idx.each(function (index, item){

        var objData = new Object();

        objData.subject = $(item).children('strong').text();
        objData.URL = $(item).attr('href');

        console.log(objData.subject);
        console.log(objData.URL);

        ArrayData.push(objData);

    });

    return ArrayData;
}

// Nate 뉴스 설정
var SetNate = {};
SetNate.SiteName = "nate";
SetNate.HeaderOpt = {method: "GET" ,uri: "http://news.nate.com/rank/?mid=n1000" 
                     ,headers: { "User-Agent": "Mozilla/5.0" } 
                     ,encoding: null };

SetNate.SetData = function ($) {
    var ArrayData = new Array();
    var Idx = $(".mlt01");
    Idx.each(function (index, item){

        var objData = new Object();

        objData.subject = $(item).children('a').find('.tit').text();
        objData.URL = $(item).children('a').attr('href');

        console.log(objData.subject);
        console.log(objData.URL);

        ArrayData.push(objData);

        objData = null;
    });

    return ArrayData;
}

//헤더 설정 함수
function SetHeader(SiteName){
    var HeaderOpt = {};

    if(SiteName == SetNaver.SiteName) {
        HeaderOpt = SetNaver.HeaderOpt;
    }
    else if (SiteName == SetNate.SiteName){
        HeaderOpt = SetNate.HeaderOpt;
    }

    return HeaderOpt;
}

//데이터 파싱 함수
function SetData(SiteName, data){
    var ParseData = {};

    if(SiteName == SetNaver.SiteName) {
        ParseData = SetNaver.SetData(data);
    }
    else if(SiteName == SetNate.SiteName){
        ParseData = SetNate.SetData(data);
    }

    return ParseData;
}

exports.SetOptions = function(SiteName){
    return SetHeader(SiteName);
}

exports.SetData = function(SiteName, data){
    return SetData(SiteName, data);
}