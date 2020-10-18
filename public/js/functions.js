function startAnimationOpacity(element) {
    $(element).css("display", "block");
    $(element).animate({
        opacity: 1
    }, 500);
}

function endAnimationOpacity(element) {
    $(element).animate({
        opacity: 0
    }, 500);
    setTimeout(function(){
        $(element).css("display", "none");
    },500);
}

function setCookie(name, value){
    var date = new Date();
    var days = 30;
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    $.cookie(name, value, { expires: date });
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name){
    $.removeCookie(name);
}

function shorterTitle(str) {
    if (str.length > 13) {
        return str.substr(0, 13) + "...";
    }else{
        return str;
    }
}

function shorterText(str) {
    if (str.length > 32) {
        return str.substr(0, 32) + "...";
    }else{
        return str;
    }
}

function copyToClipboard(str) {
    var area = document.createElement('textarea');

    document.body.appendChild(area);
    area.value = str;
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
}

function entersConvert(str){
    var newstr = "";
    var lines = str.split(/[\n\r]+/);
    for (let i = 0; i < lines.length; i++) {
        newstr += lines[i] + "<@>";
    }

    return newstr;
}

function entersUnConvert(str){
    var newstr = "";
    var lines = str.split('<@>');
    for (let i = 0; i < lines.length; i++) {
        newstr += lines[i] + "\n";
    }

    return newstr;
}

function entersUnConvertInput(str){
    var newstr = "";
    var lines = str.split('<@>');

    return lines[0];
}

function getAllUrlParams(url) {
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    var obj = {};

    if (queryString) {

        queryString = queryString.split('#')[0];

        var arr = queryString.split('&');

        for (var i=0; i<arr.length; i++) {
            var a = arr[i].split('=');

            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function(v) {
                paramNum = v.slice(1,-1);
                return '';
            });

            var paramValue = typeof(a[1])==='undefined' ? true : a[1];

            paramName = paramName.toLowerCase();
            paramValue = paramValue.toLowerCase();

            if (obj[paramName]) {
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                if (typeof paramNum === 'undefined') {
                    obj[paramName].push(paramValue);
                }
                else {
                    obj[paramName][paramNum] = paramValue;
                }
            }
            else {
                obj[paramName] = paramValue;
            }
        }
    }
    return obj;
}
