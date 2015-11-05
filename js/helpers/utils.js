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
    var dd = date.getDate().toString().length == 1 ? '0' + date.getDate() : date.getDate() ;
    var mm = date.getMonth().toString().length == 1 ? '0' + (date.getMonth()+1) : date.getMonth()+1;
    var yyyy= date.getYear() + 1900;
    return dd + '.' + mm + '.' + yyyy;
}

function parseDate(date) {
    if (typeof (date) == typeof (new Date())) return  getDateFromJSDate(date) ;
    if (!date) return date;
    date = date.split(' ')[0];
    if (date.toString().split('.').length == 3 || date == '') return date;
    var dateParams = date.split(' ')[0].split('/');
    if (dateParams.length == 1) dateParams = dateParams.join('').split('.');
    if (dateParams[0] == 'null') return '';
    if (dateParams[0].length == 1) dateParams[0] = '0' + dateParams[0];
    if (dateParams[1].length == 1) dateParams[1] = '0' + dateParams[1];
    return dateParams[1] + '.' + dateParams[0] + '.' + dateParams[2];
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

                    item['DOGOVOR_PERIOD_END'] = parseDate(item['DOGOVOR_PERIOD_END']);
                    item['DOGOVOR_PERIOD_START'] = parseDate(item['DOGOVOR_PERIOD_START']);
                    item['DOGOVOR_DATE'] = parseDate(item['DOGOVOR_DATE']);
                    item['DOGOVOR_NUMBER_AND_DATE'] = item['DOGOVOR_DATE'] == '' ?
                        item['DOGOVOR_NUMBER']
                        :
                        item['DOGOVOR_NUMBER'] + ' от ' + item['DOGOVOR_DATE'];
                    item['DOGOVOR_SUM'] = parseNumber(item['DOGOVOR_SUM']);
                    var obj = [];
                    obj.id = item['DOGOVOR_ID'] || 0;
                    $scope.headers.forEach(function (elem) {
                        obj.push({ value: item[elem.field], name: elem.field, grow: elem.width });
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