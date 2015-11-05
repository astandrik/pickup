﻿app.factory('$projects', ['$http', '$filter', function ($http, $filter) {
    function Project(data) {
        function setDefaults() {
            this.has_no_dates = false;
            this.contract_type = "Государственный контракт";
            this.contract_status = "Текущий";
            this.contract_order = "Роскосмос";
            this.contract_executor = "ОАО РКК Энергия";
            this.contract_sum_rub = 12189157400;
            this.contract_sum_model = "Твердая";
            this.contract_sum = 12189157400;
            this.contract_currency = "рубль";
            this.contract_start_date = "";
            this.contract_end_date = "";
            this.contract_name = "Управление и эксплуатация российского сегмента Международной космической станции";
            this.contract_code = "МКС (Эксплуатация)";
            this.contract_number = "351-8641/13/205";
            this.contract_date = new Date();
            this.contract_main_designer = "Соловьев В.А.";
            this.contract_project_office = "ГПО";
            this.contract_ntc = "ГПО";
            this.contract_department = "ГПО";
            this.contract_deputy = "Черленяк Н.Н.";
            this.contract_curator = "Григорьев А.И.";
            var rows = [];
            var headers = [];
            var financeHeaders = ['ФОТ', 'ОСН', 'Материалы', 'Командировки', 'Прочие', 'Накладные',
                'Себестоимость собственных работ', 'Смежники', 'Полная себестоимость', 'Прибыль', 'Цена'];
            var startDate = 2010;
            var endDate = 2015;

            for (var i = startDate; i <= endDate; i++) {
                headers.push({ name: i });
            }
            financeHeaders.forEach(function (header) {
                var row = [{ value: header, name: 'Наименование статей затрат' }, { value: '0', name: 'Всего (руб.)' }];
                for (var i = startDate; i <= endDate; i++) {
                    row.push({ value: '0', name: i , cl: Math.random() * (100 - 1) + 1 > 30 ? 'editable' : 'non-editable' });
                }
                rows.push(row);
            });

            this.dogovorFinanceStructure = {
                headers: headers,
                rows: rows,
                start: startDate,
                end: endDate,
                reCalculateFinanceStructure: function (e) {
                    rows.forEach(function (row) {
                        var overall = row.findByParam('name', 'Всего (руб.)');
                        overall.value = 0;
                        for (var i = 2; i < row.length; i++) {
                            if ((e.which < 48 || e.which > 57) && (e.which != 8)) {
                                row[i].value = row[i].oldVal ? row[i].oldVal : '0';
                                continue;
                            }
                            var val = row[i].value.split(' ').join('');
                            overall.value += parseInt(val);
                            row[i].value = $filter('numberRU')(val);
                            row[i].oldVal = row[i].value;
                        }
                        overall.value = $filter('numberRU')(overall.value);
                    })
                }
            }
        };
        function setEmpty() {
            this.contract_type = "Государственный контракт";
            this.contract_status = "";
            this.contract_order = "";
            this.contract_executor = "";
            this.contract_sum_rub = 0;
            this.contract_sum_model = "";
            this.contract_sum = 0;
            this.contract_currency = "";
            this.contract_start_date = new Date("01.01.2013");
            this.contract_end_date = new Date("01.01.2013");
            this.contract_name = "";
            this.contract_code = "";
            this.contract_number = "";
            this.contract_date = new Date("");
            this.contract_main_designer = "";
            this.contract_project_office = "";
            this.contract_ntc = "";
            this.contract_department = "";
            this.contract_deputy = "";
            this.contract_curator = "";
        }
        setDefaults.call(this);
        if (data == 'new') {
            setEmpty.call(this);
        }
        if (data) {
            var self = this;
            this.id = data.DOGOVOR_ID;
            this.contract_status = data.DOGOVOR_STATUS || this.contract_status;
            this.contract_executor = data.DOGOVOR_EXECUTOR_NAME || this.contract_executor;
            this.contract_sum_rub = data.DOGOVOR_SUM || this.contract_sum_rub;
            this.contract_order = data.DOGOVOR_ORDER_NAME || this.contract_order;
            this.contract_sum = data.DOGOVOR_SUM || this.contract_sum;
            this.contract_start_date = parseDate(data.DOGOVOR_PERIOD_START) || this.contract_start_date;
            this.contract_end_date = parseDate(data.DOGOVOR_PERIOD_END) || this.contract_end_date;
            this.contract_name = data.DOGOVOR_CODE || this.contract_name;
            this.contract_code = data.DOGOVOR_CODE || this.contract_name;
            this.contract_date = parseDate(data.DOGOVOR_DATE) || parseDate(data.DOGOVOR_PERIOD_START) || this.contract_start_date;
            this.contract_start_date = new Date(this.contract_start_date);
            this.contract_end_date = new Date(this.contract_end_date);
            this.contract_date = new Date(this.contract_date);


            $http.get('testData/projectsFinancies.json').success(function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (self.id == data[i][data[i].length - 1].ID) {
                        var financeData = data[i];
                        var rows = [];
                        var headers = [];
                        var financeHeaders = ['ФОТ', 'ОСН', 'Материалы', 'Командировки', 'Прочие', 'Накладные',
              'Себестоимость собственных работ', 'Смежники', 'Полная себестоимость', 'Прибыль', 'Цена'];
                        var startDate = financeData[0].StartYear;
                        var endDate = financeData[0].CostsValues.length + startDate - 1;
                        for (var i = startDate; i <= endDate; i++) {
                            headers.push({ name: i });
                        }
                        financeHeaders.forEach(function (header, j) {
                            var row = [{ value: header, name: 'Наименование статей затрат' }, { value: '0', name: 'Всего (руб.)' }];
                            var k = 0;
                            for (var i = startDate; i <= endDate; i++) {
                                row.push({ value: financeData[j].CostsValues[k++], name: i, cl: Math.random() * (100 - 1) + 1 > 30 ? 'editable' : 'non-editable' });
                            }
                            rows.push(row);
                        });
                        self.dogovorFinanceStructure = {
                            headers: headers,
                            rows: rows,
                            start: startDate,
                            end: endDate,
                            reCalculateFinanceStructure: function (e) {
                                rows.forEach(function (row) {
                                    var overall = row.findByParam('name', 'Всего (руб.)');
                                    overall.value = 0;
                                    for (var i = 2; i < row.length; i++) {
                                        if ((e.which < 48 || e.which > 57) && (e.which != 8)) {
                                            row[i].value = row[i].oldVal ? row[i].oldVal : '0';
                                            continue;
                                        }
                                        var val = row[i].value.toString().split(' ').join('');
                                        overall.value += parseInt(val);
                                        row[i].value = $filter('numberRU')(val);
                                        row[i].oldVal = row[i].value;
                                    }
                                    overall.value = $filter('numberRU')(overall.value);
                                })
                            }
                        }
                        self.dogovorFinanceStructure.reCalculateFinanceStructure({ which: 49 });
                    }
                }
            });
            
          
           



        }
        return this;
    }

    Project.prototype =
    {
        orderers: $http.get('testData/projectsOrderers.json').success(function (data) { return data }).error(function (err) { return err }),
        coExecutors: $http.get('testData/projectsCoExecuters.json').success(function (data) { return data }).error(function (err) { return err }),
        getById: function (id, type, callBack) {
            var result = null;
            switch (type) {
                case 'orderers':
                     this.orderers.success(function (data) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].DOGOVOR_ID == id) {
                                result = data[i];
                                callBack(new Project(result));
                                break;
                            }
                        }
                    });
                    break;
                case 'coExecutors':
                     this.coExecutors.success(function (data) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].DOGOVOR_ID == id) {
                                result = data[i];
                                callBack(new Project(result));
                                break;
                            }
                        }
                    });
                    break
            }
        }
    };

    return {
        createNew: function () { return new Project('new') },
        proto : Project.prototype
    };
}]);