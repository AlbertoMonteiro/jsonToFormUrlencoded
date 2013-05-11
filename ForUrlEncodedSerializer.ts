class ForUrlEncodedSerializer {
    public serializeJson(obj: any) {
        var serialized: string[] = [];

        for (var prop in obj) {
            var propValue = obj[prop];
            if (!propValue)
                continue;
            if (propValue instanceof Array) {
                this.serializeArray(prop, propValue).forEach(v => {
                    serialized.push(v);
                });
            } else if (propValue instanceof Object) {
                this.serializeObject(prop, propValue).forEach(v => {
                    serialized.push(v);
                });
            } else {
                serialized.push(this.formatString("{0}={1}", prop, propValue));
            }
        }

        return serialized.map(s => s.replace(/\s/g, "+")).join("&");
    }

    private serializeObject(propName: string, value: {}) {
        var serialized: string[] = [];

        for (var prop in value) {
            var propValue = value[prop];
            if (propValue instanceof Array) {

            } else if (propValue instanceof Object) {
                this.serializeObject(prop, propValue).forEach(v => {
                    serialized.push(this.formatString("{0}.{1}", propName, v));
                });
            } else {
                var formated = this.formatString("{0}.{1}={2}", propName, prop, propValue);
                serialized.push(formated);
            }
        }

        return serialized;
    }

    private serializeArray(propName: string, values: Array) {
        var serialized: string[] = [];

        values.forEach((value: any, index) => {
            if (value instanceof Object) {
                var splited = this.serializeJson(value).split("&");
                splited.forEach(element => {
                    var formated = this.formatString("{0}[{1}].{2}", propName, index, element);
                    serialized.push(formated);
                });
            } else {
                var formated = this.formatString("{0}[{1}]={2}", propName, index.toString(), value.toString());
                serialized.push(formated);
            }
        });

        return serialized;
    }

    private formatString(format: string, ...parts: string[]) {
        parts.forEach((value, index) => {
            format = format.replace("{" + index + "}", value);
        });
        return format;
    }
}