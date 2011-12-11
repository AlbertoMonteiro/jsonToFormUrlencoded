function jsonToFormUrlencoded(obj, currentLevel) {
    var serialized = "";
    for (var item in obj) {
        var value = "";
        if (obj[item] instanceof Array) {
            for (var i = 0; i < obj[item].length; i++) {
                if (obj[item][i] instanceof Object) {
                    if (currentLevel)
                        serialized += jsonToFormUrlencoded(obj[item][i], "{0}.{1}[{2}]".format(currentLevel, item, i)) + "&";
                    else
                        serialized += jsonToFormUrlencoded(obj[item][i], "{0}[{1}]".format(item, i)) + "&";
                } else {
                    if (!obj[item][i])
                        continue;

                    if (currentLevel)
                        serialized += "{0}.{1}[{2}]={3}&".format(currentLevel, item, i, obj[item][i].toString().trim());
                    else
                        serialized += "{0}[{1}]={2}&".format(item, i, obj[item][i].toString().trim());

                }
            }
        }
        else if (obj[item] instanceof Object) {
            if (currentLevel)
                serialized += jsonToFormUrlencoded(obj[item], "{0}.{1}".format(currentLevel, item)) + "&";
            else
                serialized += jsonToFormUrlencoded(obj[item], item) + "&";
        }
        else {
            if (!obj[item])
                continue;


            if (currentLevel)
                serialized += "{0}.{1}={2}&".format(currentLevel, item, obj[item].toString().trim());
            else
                serialized += "{0}={1}&".format(item, obj[item].toString().trim());

        }
    }
    return serialized.substr(0, serialized.length - 1).replace(/\s/g, "+");
}

String.prototype.format = function () {
    var format = this;
    for (var i = 0; i < arguments.length; i++) {
        format = format.replace('{' + (i) + '}', arguments[i]);
    }
    return format;
};

String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/, '');
};