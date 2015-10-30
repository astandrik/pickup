function parseNumber(num) {
    if (num.toString().split(' ').length > 1) return num;
    num = num.toString().split('').reverse();
    for (var i = 2; i < num.length; i += 3) {
        num[i] = " " + num[i];
    }
    return num.reverse().join('');
}


function parseDate(date) {
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

function getProjects($projects, $scope, type) {
    $projects[type].success(function (json) {
        $scope.projects = [];
        switch (type) {
            case 'orderers':
                json.forEach(function (item) {
                    for (var e in item) {
                        if (item[e] == null || item[e] == 'null') {
                            item[e] = '';
                        }
                    }
                    item['DOGOVOR_PERIOD_END'] = parseDate(item['DOGOVOR_PERIOD_END']);
                    item['DOGOVOR_PERIOD_START'] = parseDate(item['DOGOVOR_PERIOD_START']);
                    item['DOGOVOR_NUMBER_AND_DATE'] = '';
                    item['DOGOVOR_NUMBER_AND_DATE'] = item['DOGOVOR_PERIOD_START'] == '' ?
                        item['DOGOVOR_NUMBER']
                        :
                        item['DOGOVOR_NUMBER'] + ' от ' + item['DOGOVOR_PERIOD_START'];
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
                break;
            case 'coExecutors':
                json.forEach(function (item) {
                    for (var e in item) {
                        if (item[e] == null || item[e] == 'null') {
                            item[e] = '';
                        }
                    }
                    item['DOGOVOR_PERIOD_START'] = parseDate(item['DOGOVOR_PERIOD_START']);
                    item['DOGOVOR_PERIOD_END'] = parseDate(item['DOGOVOR_PERIOD_END']);
                    item['DOGOVOR_NUMBER_AND_DATE'] = item['DOGOVOR_PERIOD_START'] == '' ?
                        item['DOGOVOR_NUMBER']
                        :
                        item['DOGOVOR_NUMBER'] + ' от ' + item['DOGOVOR_PERIOD_START'];

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
                break;
        } 
    }).error(function () { debugger; }).then(function () { $scope.isContentShown = true; });
}