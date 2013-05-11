var ForUrlEncodedSerializer = (function () {
    function ForUrlEncodedSerializer() { }
    ForUrlEncodedSerializer.prototype.serializeJson = function (obj) {
        var serialized = [];
        for(var prop in obj) {
            var propValue = obj[prop];
            if(!propValue) {
                continue;
            }
            if(propValue instanceof Array) {
                this.serializeArray(prop, propValue).forEach(function (v) {
                    serialized.push(v);
                });
            } else if(propValue instanceof Object) {
                this.serializeObject(prop, propValue).forEach(function (v) {
                    serialized.push(v);
                });
            } else {
                serialized.push(this.formatString("{0}={1}", prop, propValue));
            }
        }
        return serialized.map(function (s) {
            return s.replace(/\s/g, "+");
        }).join("&");
    };
    ForUrlEncodedSerializer.prototype.serializeObject = function (propName, value) {
        var _this = this;
        var serialized = [];
        for(var prop in value) {
            var propValue = value[prop];
            if(propValue instanceof Array) {
            } else if(propValue instanceof Object) {
                this.serializeObject(prop, propValue).forEach(function (v) {
                    serialized.push(_this.formatString("{0}.{1}", propName, v));
                });
            } else {
                var formated = this.formatString("{0}.{1}={2}", propName, prop, propValue);
                serialized.push(formated);
            }
        }
        return serialized;
    };
    ForUrlEncodedSerializer.prototype.serializeArray = function (propName, values) {
        var _this = this;
        var serialized = [];
        values.forEach(function (value, index) {
            if(value instanceof Object) {
                var splited = _this.serializeJson(value).split("&");
                splited.forEach(function (element) {
                    var formated = _this.formatString("{0}[{1}].{2}", propName, index, element);
                    serialized.push(formated);
                });
            } else {
                var formated = _this.formatString("{0}[{1}]={2}", propName, index.toString(), value.toString());
                serialized.push(formated);
            }
        });
        return serialized;
    };
    ForUrlEncodedSerializer.prototype.formatString = function (format) {
        var parts = [];
        for (var _i = 0; _i < (arguments.length - 1); _i++) {
            parts[_i] = arguments[_i + 1];
        }
        parts.forEach(function (value, index) {
            format = format.replace("{" + index + "}", value);
        });
        return format;
    };
    return ForUrlEncodedSerializer;
})();
