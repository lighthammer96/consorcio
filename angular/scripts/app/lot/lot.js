/**
 * Created by JAIR on 4/5/2017.
 */ 
  
(function () {
    'use strict';
    angular.module('sys.app.lots')
        .config(Config)
        .controller('LotCtrl', LotCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    LotCtrl.$inject = ['$scope', '_', 'RESTService','AlertFactory'];

    function LotCtrl($scope, _, RESTService,AlertFactory)
    {
        var modalLote = $('#modalLote');
        var producto = $('#p_product_id');
        var lote = $('#lote');
        var fech_ingreso = $('#fech_ingreso');
        var cantidad = $('#cantidad');
        var fecha_vencimiento = $('#fecha_vencimiento');
        var titleModalLote = $('#titleModalLote');
        var modalCC = $('#modalArticulo');
        var p_product_name = $('#p_product_name');
        var msg_cont = $('#msg_cont');
        var lote_id=$('#lote_id');

        function cleanLote () {
            cleanRequired();
            titleModalLote.html('');
            producto.val('');
            lote.val('');
            fech_ingreso.val('');
            cantidad.val('');
            fecha_vencimiento.val('');
            p_product_name.val('');
            lote_id.val('');
            msg_cont.addClass('hide');
        };
        modalLote.on('hidden.bs.modal', function (e) {
              cleanLote();
        });

        function newLote()
        {
            titleModalLote.html('Nuevo Lote');
            $('#cantidad').attr('onkeypress','return soloNumeros(event)');
            modalLote.modal('show');
        }

        $scope.type_cc = '';
        $scope.openCC = function(type) {
            $scope.type_cc = type;
            modalCC.modal('show');
            $('#search_cc2').val('');
            $('#LoadRecordsButtonCC2').click();
        };
         $scope.clearCC = function(type) {
                producto.val('');
                p_product_name.val('');
        };
        $scope.saveLote = function()
        {
            msg_cont.addClass('hide');
            var bval = true;
            bval = bval && producto.required();
            if (!bval) {
              msg_cont.removeClass('hide');
                return false;
            }
            bval = bval && lote.required();
            bval = bval && cantidad.required();
            bval = bval && fech_ingreso.required();
            bval = bval && fecha_vencimiento.required();
            if(bval){
                 var params = {
                    'producto': producto.val(),
                    'lote': lote.val(),
                    'cantidad': cantidad.val(),
                    'fech_ingreso': fech_ingreso.val(),
                    'fecha_vencimiento': fecha_vencimiento.val(),
                 };
                var loteIde_id = (lote_id.val() === '') ? 0 : lote_id.val();

                  RESTService.updated('lots/createLote', loteIde_id, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        // AlertFactory.textType({
                        //     title: '',
                        //     message: 'El registro se guardó correctamente con el código '+response.code,
                        //     type: 'success'
                        // });
                        modalLote.modal('hide');
                        LoadRecordsButtonLot.click();
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al guardar el Lote. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
            }

        };
        
         function findLote(id)
        {
            titleModalLote.html('Editar Lote');
            RESTService.get('lots/find', id, function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    producto.val(data_p[0].idArticulo);
                    lote.val(data_p[0].Lote);
                    fech_ingreso.val(data_p[0].fechaIngreso);
                    cantidad.val(data_p[0].cantidad);
                    fecha_vencimiento.val(data_p[0].fechaVencimiento);
                    p_product_name.val(data_p[0].description);
                    lote_id.val(data_p[0].idLote);
                    modalLote.modal('show');
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Lote. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        var search = getFormSearch('frm-search-Lot', 'search_lot', 'LoadRecordsButtonLot');
       
        var table_container_Lot = $("#table_container_Lot");
        


        table_container_Lot.jtable({
            title: "Lista de Lotes",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/lots/list',
                deleteAction: base_url + '/lots/delete',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('lots/excel', {});
                    }
                },
                {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nuevo Lote',
                    click: function () {
                        newLote();
                    }
                }

                ]
            },
            fields: {
                idLote: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                idArticulo: {
                    title: 'Artículo',
                
                    options: base_url + '/lots/getArticulos' 
                },
                Lote: {
                    title: 'Lote',
                     

                },
                  cantidad: {
                    title: 'Cantidad',
                },
                
                fechaIngreso: {
                    title: 'Fecha de Ingreso',
                    type: 'date',
                    displayFormat: 'dd/mm/yy'

                },
                FechaVencimiento: {
                    title: 'Fecha de Vencimiento',
                    type: 'date',
                    displayFormat: 'dd/mm/yy'
                }, 
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-lote" data-id="'+data.record.idLote
                            +'" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }
                }
              

            },

            recordsLoaded: function(event, data) {
                $('.edit-lote').click(function(e){
                    var id = $(this).attr('data-id');
                    findLote(id);
                    e.preventDefault();
                });
           } 
           
        });

        generateSearchForm('frm-search-Lot', 'LoadRecordsButtonLot', function(){
            table_container_Lot.jtable('load', {
                search: $('#search_lot').val()
            });
        }, true);

        modalCC.on('hidden.bs.modal', function (e) {
            modalLote.attr('style', 'display:block;');
        });
        modalCC.on('show.bs.modal', function (e) {
            modalLote.attr('style', 'display:block; z-index:2030 !important');
        });
         var search_cc2 = getFormSearch('frm-search-cc2', 'search_cc2', 'LoadRecordsButtonCC2');
        var table_container_cc2 = $("#table_container_cc2");
        table_container_cc2.jtable({
            title: "Lista de Articulos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/lots/getArticulosLote'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_cc2
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                description: {
                    title: 'Articulos'

                },
                select: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Seleccionar" class="select_cc" data-name="'+
                            data.record.description+'" data-code="'+data.record.id+'"><i class="fa fa-'+
                            icon_select+' fa-1-5x"></i></a>';
                   }
                }
            },
            recordsLoaded: function(event, data) {
                $('.select_cc').click(function(e){
                    var code = $(this).attr('data-code');
                    var name_cc = $(this).attr('data-name');
                    producto.val(code);
                    p_product_name.val(name_cc);
                    modalCC.modal('hide');
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-cc2', 'LoadRecordsButtonCC2', function(){
            table_container_cc2.jtable('load', {
                search: $('#search_cc2').val()
            });
        }, false);

    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('lots', {
                url: '/lots',
                templateUrl: base_url + '/templates/lots/base.html',
                controller: 'LotCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();