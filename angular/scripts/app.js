/**
 * Created by JAIR on 4/4/2017.
 */

(function () {
    'use strict';

    angular.module('sys', [
        //dependencies
        'ui.router',

        'sys.utils.libraries',
        //'sys.templates',
        'sys.utils.services',
        'sys.app.guiaRemisions',
        'sys.utils.utils',
        'angucomplete-alt',
        'sys.utils.widgets',
        'sys.utils.filters',
        'sys.app.cancelarCerrarOcs',
        'sys.api',
        'sys.app.extends',
        'sys.app.home',
        'sys.app.tipoTraslados',
        'sys.app.reporteRepuestos',
        'sys.app.reporteCreditosAprobados',
        'sys.app.tipoProveedors',
        'sys.app.proveedors',
        'sys.app.configJerarquiaCompras',
        'sys.app.recepcionOrdenCompras',
        // Seguridad
        'sys.app.profiles',
        'sys.app.modules',
        'sys.app.users',
        'sys.app.permissions',
        'sys.app.configs',
        'sys.app.params',
        'sys.app.approvers_projects',
        'sys.app.reporteMetas',
        'sys.app.empresas',
        'sys.app.areas',
        'sys.app.solicitudCompras',
        'sys.app.sectors',
        'sys.app.registerOrdenCompras',
        'sys.app.anulacionOrdenCompras',
        'sys.app.devolucionOrdenCompras',
        'sys.app.conformidadServicios',
        // Maestros
        'sys.app.descuentos',
        'sys.app.brands',
        'sys.app.currencys',
        'sys.app.measures',
        'sys.app.entities',
        'sys.app.products',
        'sys.app.resources',
        'sys.app.typechanges',
        'sys.app.warehouses',
        'sys.app.fronts',
        'sys.app.buyers',
        'sys.app.reporteOrdenDiarios',
        'sys.app.payment_condition',
        'sys.app.categories',
        'sys.app.operations',
        'sys.app.head_accountans',
        'sys.app.families',
        'sys.app.subfamilies',
        'sys.app.lots',
        'sys.app.modelos',
        'sys.app.accoudets',
        'sys.app.shops',
        'sys.app.series',
        'sys.app.technicians',
        'sys.app.advisers',
        'sys.app.consecutives',
        'sys.app.maintenances',
        'sys.app.customers',
        'sys.app.group_cas',
        'sys.app.typeServicioMants',
        'sys.app.vehiculos_terceros',
        'sys.app.list_precios',
        'sys.app.orden_servicios',
        'sys.app.typeCustomers',
        'sys.app.typeObjets',
        'sys.app.objetivos',
        'sys.app.proformas',
        'sys.app.bancos',
        'sys.app.tipos_movimiento',
        'sys.app.formas_pago',
        'sys.app.denominaciones',
        'sys.app.convenios',
        'sys.app.cuentas_bancarias',
        'sys.app.aprobacion',
        'sys.app.cajas',
        'sys.app.consecutivos_comprobantes',
        'sys.app.vendedores',
        'sys.app.cobradors',
        'sys.app.configJerarquias',
        'sys.app.personas',
        'sys.app.movimiento_cierres',
        'sys.app.factor_credito',
        'sys.app.periodos',
        'sys.app.categoriaVehiculars',
        'sys.app.resetearContrasenias',
        'sys.app.reporteVentaClientes',
        'sys.app.resumenMensualActividads',
        'sys.app.carroceria',
        // Compras
        'sys.app.requirements',
        'sys.app.requirements_contests',
        'sys.app.approval_requirements',
        'sys.app.assignment_requirements',
        'sys.app.quotations',
        'sys.app.approval_contests',
        'sys.app.purchase_orders',
        'sys.app.approval_purchase_orders',
        'sys.app.approval_autonomy',
        'sys.app.accounts_pay',
        'sys.app.revision_cas',
        'sys.app.aprobacionSolicituds',
        'sys.app.motivos',
        'sys.app.cuentasxcobrars',
        
        //Ventas
        'sys.app.solicitud',
        'sys.app.ventas',
        'sys.app.movimientoCajas',

        // creditos y cobranzas
        'sys.app.renegociacion_mora',
        'sys.app.reprogramacion_fechas',
        'sys.app.refinanciamientos',
        'sys.app.visita_cliente',
        'sys.app.lista_cobranza_cuotas',
        'sys.app.avance_morosidad',
        
        // Almacen
        'sys.app.receptions',
        'sys.app.transfers',
        'sys.app.receptiontransfers',
        'sys.app.entrys',
        'sys.app.consumptions',
        'sys.app.referral_guides',
        'sys.app.departures',
        'sys.app.consumer_returns',
        'sys.app.register_movements',
        'sys.app.register_transfers',
        'sys.app.generation_remisions',
        'sys.app.query_stocks',
        'sys.app.query_movements',
        'sys.app.report_stocks',
        'sys.app.report_movements',
        'sys.app.aperturaCajas',
        'sys.app.aprobacionOrdenCompras',
        // Proyectos
        'sys.app.projects',
        'sys.app.direct_billing',
        'sys.app.valorizations',
        'sys.app.consolidated_projects',
        'sys.app.project_approval',
        // Tesoreria
        'sys.app.cash_expense_girls',
        'sys.app.replenishment_cashs',
        'sys.app.sales_charges',
        'sys.app.purchase_payments',
        'sys.app.writing_checks',
        'sys.app.petty_cash',
        'sys.app.companias',
        //Servicio tecnico 
        'sys.app.asignacioncobradors',
        'sys.app.devolucion_servicesTecnicos',
        'sys.app.entrega_servicesTecnicos',
        'sys.app.quality_controls',
        // Reportes
        'sys.app.stocks',

    ]).run(Run)
        .controller('OverloadCtrl', OverloadCtrl)
        .config(Config);

    Config.$inject = [
        '$interpolateProvider',
        '$httpProvider',
        '$locationProvider',
        '$stateProvider',
        '$urlRouterProvider',
        '$resourceProvider'
    ];

    OverloadCtrl.$inject = ['$scope', '_', 'AlertFactory', 'RESTService'];
    Run.$inject = ['$rootScope', '$state', '$window', 'RESTService'];

    function Run($rootScope, $state, $window, RESTService) {

        $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
            if (toState.name !== 'home') {
              
                RESTService.all('validate', 'url=' + toState.name, function (response) {
                    if (!response.status) {
                        $state.go('home', {location: true});
                        location.reload();
                    }
                }, function () {
                    $state.go('home', {location: true});
                    location.reload();
                });
            }
        });

        //region verify internet
        $rootScope.online = navigator.onLine;

        $window.addEventListener("offline", function () {
            $rootScope.$apply(function () {
                $rootScope.online = false;
            });
        }, false);

        $window.addEventListener("online", function () {
            $rootScope.$apply(function () {
                $rootScope.online = true;
            });
        }, false);
        //endregion
    }

    function Config($interpolateProvider, $httpProvider, $locationProvider,
                    $stateProvider, $urlRouterProvider, $resourceProvider) {
        // The alternative is using {% verbatim %}
        $interpolateProvider.startSymbol('[[').endSymbol(']]');

        // CSRF Support
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

        // This only works in angular 3!
        // It makes dealing with Django slashes at the end of everything easier.
        $resourceProvider.defaults.stripTrailingSlashes = false;

        //add loading
        $httpProvider.interceptors.push(['$q', '$rootScope', function ($q, $rootScope) {
            var numLoadings = 0;
            return {
                'request': function (config) {
                    // intercepts the request
                    numLoadings++;

                    // Show loader
                    $rootScope.$broadcast("loader_show");

                    return config;
                },
                'requestError': function (rejection) {
                    if (!(--numLoadings)) {
                        // Hide loader
                        $rootScope.$broadcast("loader_hide");
                    }
                    return $q.reject(rejection);
                },
                'response': function (response) {
                    if ((--numLoadings) === 0) {
                        // Hide loader
                        $rootScope.$broadcast("loader_hide");
                    }
                    return response;
                    // intercepts the response. you can examine things like status codes
                },
                'responseError': function (rejection) {
                    if (!(--numLoadings)) {
                        // Hide loader
                        $rootScope.$broadcast("loader_hide");
                    }
                    // intercepts the response when the response was an error
                    return $q.reject(rejection);
                }
            }

        }]);

        $urlRouterProvider.otherwise('/home');

        // use the HTML5 History API
        $locationProvider.html5Mode(true);
    }

    function OverloadCtrl($scope, _, AlertFactory, RESTService) {
        $scope.$on("loader_show", function () {
            $scope.show_loading = true;
        });

        $scope.$on("loader_hide", function () {
            $scope.show_loading = false;
        });

        $scope.openDoc = function (url, params) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                cache: false,
                url: base_url + '/' + url,
                data: params,
                success: function (response) {
                    // createExcel(response.file, response.name);
                    var a = document.createElement("a");
                    a.href = response.file;
                    a.download = response.name;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: "Hubo un error",
                        message: ajaxContext.responseText
                    });
                }
            });
        };
        $scope.openDocExeclDiario = function (url, params) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                cache: false,
                url: base_url + '/' + url,
                data: params,
                success: function (response) {
                    if(response!='N'){
                    var a = document.createElement("a");
                    a.href = response.file;
                    a.download = response.name;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    angular.element('#show_loading').addClass('ng-hide');
                 }else{
                     angular.element('#show_loading').addClass('ng-hide');
                      AlertFactory.textType({
                        title: '',
                      message: 'No existe datos en este año',
                        type: 'info'
                    });
                 }
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: "Hubo un error",
                        message: ajaxContext.responseText
                    });
                }
            });
        };
        $scope.openDocExeclMes = function (url, params) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                cache: false,
                url: base_url + '/' + url,
                data: params,
                success: function (response) {
                    console.log(response);
                    console.log("algo excel");
                    if(response!='N'){

                                      
                    // createExcel(response.file, response.name);
                    var a = document.createElement("a");
                    a.href = response.file;
                    a.download = response.name;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    angular.element('#show_loading').addClass('ng-hide');
                 }else{
                     angular.element('#show_loading').addClass('ng-hide');
                      AlertFactory.textType({
                        title: '',
                      message: 'No existe datos en este año',
                        type: 'info'
                    });
                 }
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: "Hubo un error",
                        message: ajaxContext.responseText
                    });
                }
            });
        };
        $scope.openDocExeclMesMetas = function (url, params) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                cache: false,
                url: base_url + '/' + url,
                data: params,
                success: function (response) {
                    
                        var a = document.createElement("a");
                        a.href = response.file;
                        a.download = response.name;
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                        angular.element('#show_loading').addClass('ng-hide');
                     
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: "Hubo un error",
                        message: ajaxContext.responseText
                    });
                }
            });
        };

        $scope.loadPDF = function (url, params) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: params,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                        create_pdf(response);
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            }); 
        };
        $scope.loadPDFVC = function (url, params) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: params,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                        create_pdfVC(response);
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            }); 
        };
         $scope.loadCCPDF = function (url, params) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: params,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                        create_CCpdf(response);
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            });
        };
 
        $scope.loadVouchersPDF = function (url, params) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: params,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                        create_vouchers_pdf(response);
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            });
        };
        $scope.loadTransferPDF = function (url, id) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: id,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                       
                        create_pdf_transfer(response);
                       
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            });
        };
         $scope.loadTransferPDF = function (url, id) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: id,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                       
                        create_pdf_transfer(response);
                       
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            });
        };
         $scope.loadQueryStockPDF = function (url, id) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: id,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                       
                        create_pdf_Querystock(response);
                       
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            });
        };
        $scope.loadQueryStockPDFCierre = function (url, id) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: id,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                       
                        create_pdf_QuerystockCierre(response);
                       
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            });
        };
        $scope.loadQueryMovimientoPDF = function (url, id) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: id,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                       
                        create_pdf_Querymovimiento(response);
                       
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            });
        };
        $scope.loadMovimientoEntregaPDF = function (url, id) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: id,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                       
                        create_pdf_movimientoEntrega(response);
                       
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            });
        };
        $scope.loadMovimientoPDF = function (url, id) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: id,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                       
                        create_pdf_movimiento(response);
                       
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            });
        };
        $scope.loadOrdenServicioPDF = function (url, id) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: id,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                       
                        create_pdf_ordenServicio(response);
                       
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            });
        };
        $scope.loadOrdenServicioXpressPDF = function (url, id) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: id,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                       
                        create_pdf_ordenServicioXpress(response);
                       
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            });
        };
        $scope.loadMovimientoCajaPDF = function (url, id) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: id,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                       
                        create_pdf_movimientoCaja(response);
                       
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            });
        };
        $scope.loadMovimientoCuadreCajaPDF = function (url, id) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: id,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                       
                        create_pdf_movimientoCuadreCaja(response);
                       
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                } 
            });
        };
        $scope.loadTarjetaCobranzaPDF = function (url, id) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: id,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                       
                        createTarjetaCobranzaPDF(response);
                       
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            });
        };
        $scope.loadReporteRepuestoPDF = function (url, id) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: id,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                       
                        createReporteRepuestoPDF(response);
                       
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            });
        };
        $scope.loadReporResumenMensualPDF = function (url, id) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: id,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                       
                        createReporteMensualPDF(response);
                       
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            });
        };
        $scope.loadReporteCreditosAprobadoPDF = function (url, id) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: id,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                       
                        createReporteCreditosAprobadosPDF(response);
                       
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            });
        };
        $scope.loadReporteGuiaRemisionPDF = function (url, id) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: id,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                       
                        createReporteGuiaRemisionPDF(response);
                       
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            });
        };
         $scope.loadMovimientoEmisionComproPDF = function (url, id) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: id,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                        
                        create_pdf_emisionComproCaja(response);
                       
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            });
        };
        // $scope.loadMovimientoEmisionComproPDF = function (url, id) {
        //     angular.element('#show_loading').removeClass('ng-hide');
        //     $.ajax({
        //         url: base_url + '/' + url,
        //         data: id,
        //         success: function (response) {
        //             if (!_.isUndefined(response.status) && response.status) {
        //                 // toDataUrl(response.img, function (base64Img) {
        //                 // });
                       
        //                 create_pdf_emisionComproCaja(response);
                       
        //             }
        //             angular.element('#show_loading').addClass('ng-hide');
        //         },
        //         error: function (ajaxContext) {
        //             angular.element('#show_loading').addClass('ng-hide');
        //             AlertFactory.showErrors({
        //                 title: 'Hubo un error',
        //                 message: 'Intente nuevamente'
        //             });
        //         }
        //     });
        // };
        $scope.loadProformaPDF = function (url, id) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: id,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                       
                        create_pdf_proforma(response);
                       
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            });
        };
        $scope.loadQualityControlPDF = function (url, id) {
            angular.element('#show_loading').removeClass('ng-hide');
            $.ajax({
                url: base_url + '/' + url,
                data: id,
                success: function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // toDataUrl(response.img, function (base64Img) {
                        // });
                       
                        create_pdf_qualityControl(response);
                       
                    }
                    angular.element('#show_loading').addClass('ng-hide');
                },
                error: function (ajaxContext) {
                    angular.element('#show_loading').addClass('ng-hide');
                    AlertFactory.showErrors({
                        title: 'Hubo un error',
                        message: 'Intente nuevamente'
                    });
                }
            });
        };

        $scope.showAlert = function (title, msg, type) {
            AlertFactory.textType({
                title: title,
                message: msg,
                type: type
            });
        };

        $scope.showConfirm = function (title, msg, callback) {
            AlertFactory.confirm({
                title: title,
                message: msg,
                confirm: 'Si',
                cancel: 'No'
            }, function(){
                callback();
            });
        };
    }
})();
