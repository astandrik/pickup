app.factory('$projects', ['$http', function ($http) {
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
            this.contract_start_date = new Date("01.01.2013");
            this.contract_end_date = new Date("11.25.2015");
            this.contract_name = "Управление и эксплуатация российского сегмента Международной космической станции";
            this.contract_code = "МКС (Эксплуатация)";
            this.contract_number = "351-8641/13/205";
            this.contract_date = new Date("06.24.2013");
            this.contract_main_designer = "Соловьев В.А.";
            this.contract_project_office = "ГПО";
            this.contract_ntc = "ГПО";
            this.contract_department = "ГПО";
            this.contract_deputy = "Черленяк Н.Н.";
            this.contract_curator = "Григорьев А.И.";
        };
        setDefaults.call(this);
        if (data) {
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
        createNew: function () { return new Project() },
        proto : Project.prototype
    };
}]);