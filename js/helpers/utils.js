function parseNumber(num) {
    if (num.toString().split(' ').length > 1) return num;
    if (num == '' || num == null || num == 'null') return "0";
    num = num.toString().split('').reverse();
    for (var i = 2; i < num.length; i += 3) {
        num[i] = " " + num[i];
    }
    return num.reverse().join('');
}


function getDateFromJSDate(date) {
    if (!date) return "";
    var dd = date.getDate().toString().length == 1 ? '0' + date.getDate() : date.getDate() ;
    var mm = (date.getMonth() + 1).toString().length == 1 ? '0' + (date.getMonth()+1) : date.getMonth()+1;
    var yyyy= date.getYear() + 1900;
    return dd + '.' + mm + '.' + yyyy;
}

function parseDate(date) {
    if (!date) return date;
    if ((new Date(date)).toString() != "Invalid Date") return  new Date(date) ;
}

Array.prototype.findByParam = function (paramName, paramValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][paramName] == paramValue) {
            return this[i];
        }
    }
}

function getProjects($projects, $scope, type) {
    $projects[type].success(function (json) {
    $scope.projects = [];
        var field = $scope.sort_order;
        var ord = $scope.order;
        json.forEach(function (item) {
                    for (var e in item) {
                        if (item[e] == null || item[e] == 'null') {
                            item[e] = '';
                        }
                    }
                    item['DOGOVOR_PERIOD_END'] = (parseDate(item['DOGOVOR_PERIOD_END']));
                    item['DOGOVOR_PERIOD_START'] = (parseDate(item['DOGOVOR_PERIOD_START']));
                    item['DOGOVOR_DATE'] = (parseDate(item['DOGOVOR_DATE']));
                    item['DOGOVOR_NUMBER_AND_DATE'] = item['DOGOVOR_DATE'] == '' ?
                        item['DOGOVOR_NUMBER']
                        :
                        item['DOGOVOR_NUMBER'] + ' от ' + getDateFromJSDate(item['DOGOVOR_DATE']);
                    item['DOGOVOR_SUM'] = parseNumber(item['DOGOVOR_SUM']);
                    var obj = [];
                    obj.id = item['DOGOVOR_ID'] || 0;
                    $scope.headers.forEach(function (elem) {
                        if (elem.field == 'DOGOVOR_DATE' || elem.field == 'DOGOVOR_PERIOD_END' || elem.field == 'DOGOVOR_PERIOD_START') {
                            obj.push({ value: getDateFromJSDate(item[elem.field]), name: elem.field, grow: elem.width });
                        } else {
                            obj.push({ value: item[elem.field], name: elem.field, grow: elem.width });
                        }
                        if (elem.field == "DOGOVOR_CODE") {
                            obj.name = item[elem.field];
                        }
                    });
                    obj.show = "";
                    $scope.projects.push(obj);
                });
        if (field) {
            var field = field.split('.')[0];
            $scope.projects.sort(function (a, b) {
                var val1 = a.findByParam('name', field).value;
                var val2 = b.findByParam('name', field).value;
                if (field == "DOGOVOR_SUM") {
                    val1 = parseFloat(val1.split(' ').join(''));
                    val2 = parseFloat(val2.split(' ').join(''));
                }
                return ord == 'asc' ? val1 > val2 ? 1 : -1 : val1 < val2 ? 1 : -1;
            });
        }
    }).error(function () { debugger; }).then(function () { $scope.isContentShown = true; });
}