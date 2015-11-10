app.factory('$projects', ['$http', '$filter', function ($http, $filter) {
    function Project(data) {
        var financeHeaders = ['FOT', 'OSN', 'Materials', 'Departs', 'Others', 'Tickets',
'SelfCost', 'CoExecuters', 'FullSelfCost', 'ReveNue', 'Price'];
        var self = this;

        this.reCalculateProject = function () {
            this.contract_start_date = this.contract_start_date ? new Date(this.contract_start_date) : null;
            this.contract_end_date = this.contract_end_date ? new Date(this.contract_end_date) : null;
            this.contract_date = this.contract_date ? new Date(this.contract_date) : null;
            this.length = this.contract_end_date && this.contract_start_date ? this.contract_end_date.getYear() - this.contract_start_date.getYear() + 1 : 0;
            window.currentProject.contract_start_date = this.contract_start_date;
            window.currentProject.contract_end_date = this.contract_end_date;
            if (this.length > 0 && !self.dogovorFinanceStructure) {
                window.currentProject.contract_start_date = this.contract_start_date;
                window.currentProject.contract_end_date = this.contract_end_date;
                var rows = {
                        "FOT": { "name": "ФОТ", "years": [] },
                        "OSN": { "name": "ОСН", "years": [] },
                        "Materials": { "name": "Материалы", "years": [] },
                        "Departs": { "name": "Командировки", "years": [] },
                        "Others": { "name": "Прочие", "years": [] },
                        "Tickets": { "name": "Накладные", "years": [] },
                        "SelfCost": { "name": "Себестоимость собственных работ", "years": [] },
                        "CoExecuters": { "name": "Смежники", "years": [] },
                        "FullSelfCost": { "name": "Полная себестоимость", "years": [] },
                        "ReveNue": { "name": "Прибыль", "years": [] },
                        "Price": { "name": "Цена", "years": [] }
                };

                var headers = [];
                var startDate = this.contract_start_date.getYear() + 1900;
                var endDate = this.contract_end_date.getYear() + 1900;

                for (var i = startDate; i <= endDate; i++) {
                    headers.push({ name: i });
                    for (var key in rows) {
                        rows[key].years.push({ name: i, value: 0 });
                    }
                }
                self.dogovorFinanceStructure = {
                    headers: headers,
                    rows: rows,
                    start: startDate,
                    end: endDate,
                    reCalculateFinanceStructure: function (e) {
                        financeHeaders.forEach(function (header) {
                            self.dogovorFinanceStructure.rows[header].OverallSum = 0;
                            self.dogovorFinanceStructure.rows[header].years.forEach(function (elem) {
                                self.dogovorFinanceStructure.rows[header].OverallSum += parseInt(elem.value.toString().split(' ').join(''));
                                elem.value = $filter('numberRU')(elem.value.toString().split(' ').join(''));
                            });
                            self.dogovorFinanceStructure.rows[header].OverallSum =
                                $filter('numberRU')(self.dogovorFinanceStructure.rows[header].OverallSum.toString().split(' ').join(''));
                        });
                    }
                }
                self.dogovorFinanceStructure.reCalculateFinanceStructure();
            }
        }

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
            var startDate = 2010;
            var endDate = 2015;
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
            this.contract_start_date = null;
            this.contract_end_date = null;
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
        if (data && data != "new") {
            this.id = data.DOGOVOR_ID;
            this.contract_status = data.DOGOVOR_STATUS || this.contract_status;
            this.contract_executor = data.DOGOVOR_EXECUTOR_NAME || this.contract_executor;
            this.contract_sum_rub = data.DOGOVOR_SUM || this.contract_sum_rub;
            this.contract_order = data.DOGOVOR_ORDER_NAME || this.contract_order;
            this.contract_sum = data.DOGOVOR_SUM || this.contract_sum;
            this.contract_start_date = parseDate(data.DOGOVOR_PERIOD_START) || null;
            this.contract_end_date = parseDate(data.DOGOVOR_PERIOD_END) || null;
            this.contract_name = data.DOGOVOR_CODE || this.contract_name;
            this.contract_code = data.DOGOVOR_CODE || this.contract_name;
            this.contract_date = parseDate(data.DOGOVOR_DATE) || null;
            //this.length = parseInt(this.contract_end_date.split('.')[2]) - parseInt(this.contract_start_date.split('.')[2]) + 1;
            this.contract_start_date = this.contract_start_date ? new Date(this.contract_start_date) : null;
            this.contract_end_date =  this.contract_end_date  ?  new Date(this.contract_end_date) : null;
            this.contract_date = this.contract_date ?  new Date(this.contract_date) : null;
            $http.get('testData/projectsFinancies.json').success(function (data) {
                var projectFinStructure = data.findByParam('id', self.id);
                var rows = projectFinStructure.financies;
                var headers = [];
                var startDate = projectFinStructure.startYear;
                var endDate = projectFinStructure.startYear + projectFinStructure.length - 1;

                for (var i = startDate; i <= endDate; i++) {
                    headers.push({ name: i });
                }
                self.dogovorFinanceStructure = {
                    headers: headers,
                    rows: rows,
                    start: startDate,
                    end: endDate,
                    reCalculateFinanceStructure: function (e) {
                        financeHeaders.forEach(function (header) {
                            self.dogovorFinanceStructure.rows[header].OverallSum = 0;
                            self.dogovorFinanceStructure.rows[header].years.forEach(function (elem) {
                                self.dogovorFinanceStructure.rows[header].OverallSum += parseInt(elem.value.toString().split(' ').join(''));
                                elem.value = $filter('numberRU')(elem.value.toString().split(' ').join(''));
                            });
                            self.dogovorFinanceStructure.rows[header].OverallSum =
                                $filter('numberRU')(self.dogovorFinanceStructure.rows[header].OverallSum.toString().split(' ').join(''));
                        });
                    }
                }
                self.dogovorFinanceStructure.reCalculateFinanceStructure();
            });
            
          
           



        }
        return this;
    }

    Project.prototype =
    {
        ProjectsOrderers: $http.get('testData/projectsOrderers.json').success(function (data) { return data }).error(function (err) { return err }),
        ProjectsCoExecutors: $http.get('testData/projectsCoExecuters.json').success(function (data) { return data }).error(function (err) { return err }),
        getById: function (id, type, callBack) {
            if (window.currentProject && window.currentProject.id && window.currentProject.id == id) {
                callBack(window.currentProject);
            } else {
                this[type].success(function (data) {
                    window.currentProject = new Project(data.findByParam('DOGOVOR_ID', id));
                    callBack(window.currentProject);
                });
            }
        }
    };

    return {
        createNew: function () { return new Project('new') },
        proto : Project.prototype
    };
}]);