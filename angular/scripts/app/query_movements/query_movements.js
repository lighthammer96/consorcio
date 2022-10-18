/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.query_movements')
        .config(Config)
        .controller('Query_MovementCtrl', Query_MovementCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    Query_MovementCtrl.$inject = ['$scope','_', 'RESTService', 'AlertFactory', 'Notify'];

    function Query_MovementCtrl($scope, _, RESTService, AlertFactory, Notify)
    {
        
        
        var titlemodalQueryMovement=$("#titlemodalQueryMovement");
        var modalQueryMovement=$("#modalQueryMovement");

        function newQueryMovement()
        {
            titlemodalQueryMovement.html('Nueva Consulta de Movimiento');
            modalQueryMovement.modal('show');
        }


         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        var filtro_idAlm= '<select id="filtro_idAlm" class="form-control input-sm""><option value="">Almacen</option></select>';
        var filtro_idLoc = '<select id="filtro_idLoc" class="form-control input-sm""><option value="">Localizacion</option></select>';
        var filtro_cate = '<select id="filtro_cate" class="form-control input-sm""><option value="">Categoría</option></select>';
        var filtro_art = '<select id="filtro_art" class="form-control input-sm""><option value="">Árticulo</option></select>';
        var filtro_nat = '<select id="filtro_nat" class="form-control input-sm""><option value="">Naturaleza</option></select>';
        var filtro_oper = '<select id="filtro_oper" class="form-control input-sm""><option value="">Tipo Operación</option></select>';
        
        var search = getFormSearch3('frm-search-Query_Movement', 'search_b', 'LoadRecordsButtonQuery_Movement');

        var table_container_Query_Movement = $("#table_container_Query_Movement");
        var states = '<select id="project_states" class="search_input"></select>';
        
        table_container_Query_Movement.jtable({
           title: "Lista de Movimientos por Articulo",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/query_movements/list',
                // createAction: base_url + '/query_stocks/create',
                // updateAction: base_url + '/query_stocks/update',
                // deleteAction: base_url + '/query_stocks/delete',
            },
            messages: {
                addNewRecord: 'Nueva Categoría',
                editRecord: 'Editar Categoría',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                }]
            }, 
            fields: {
                idTransaccion: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false,
                },
                id: {
                    key: false,
                    create: false,
                    edit: false,
                    list: false
                },
                fecha_registro: {
                    key: false,
                    create: false,
                    edit: false,
                    list: false
                },
                fecha_proceso_s: {
                    title: 'F. Proceso',
                    sorting: false,
                },
                fecha_registro_s: {
                    title: 'F. Registro',
                     sorting: false,
                },
                 code_article: {
                    title: 'Cod. Artículo',
                },
                Articulo: {
                    title: 'Articulo'
                },
                Categoria: {
                    title: 'Categoria'
                },
                Unidad: {
                    title: 'Uni.',
                    width: '3%'
                },
                Tipo_Operacion: {
                    title: 'Tip.Ope.',
                    width: '3%'
                },
                Naturaleza: {
                    title: 'Nat.',
                    width: '3%'
                },
                Origen: {
                    title: 'Ori.',
                    width: '3%'
                },
                idOrigen: {
                    title: 'Id',
                    width: '3%'
                },
                Almacen: {
                    title: 'Alm.',
                    width: '6%'
                },
                Localizacion: {
                    title: 'Loc.',
                    width: '6%'
                },
                Cantidad: {
                    title:'Cant.',
                    listClass:'text-right',
                    width: '3%'
                },
                Costo_Unitario: {
                    title:'C.Unitario',
                    listClass:'text-right',
                    width: '3%'
                },
                Precio_Unitario: {
                    title:'P.Unitario',
                    listClass:'text-right',
                    width: '3%'
                },
                Costo_Total: {
                    title:'C.Total',
                    listClass:'text-right',
                    width: '3%'
                },
                Precio_Total: {
                    title:'P.Total',
                    listClass:'text-right',
                    width: '3%'
                },

                Lote: {
                    title: 'Lote'
                },
                Serie: {
                    title: 'Serie'
                },
                Obs: {
                    title: 'Obs',
                }

            },
           

            formCreated: function (event, data) {
                data.form.find('input[name="Categoria"]').attr('onkeypress','return soloLetras(event)');
                $('#Edit-estado').parent().addClass('i-checks');
               
                $('.i-checks').iCheck({
                    checkboxClass: 'icheckbox_square-green'
                }).on('ifChanged', function (e) {
                    $(e.target).click();
                     if(e.target.value=='A'){
                        $("#Edit-estado").val("I");
                        $(".i-checks span").text("Inactivo");

                     }else{
                        $("#Edit-estado").val("A");
                        $(".i-checks span").text("Activo");
                     };
                });
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="Categoria"]').required();
                return bval;
            }
        });
         $('#filtro_art').select2();
         $('#filtro_idAlm').change(function () {
            var descrip=$('#filtro_idAlm').val();
            RESTService.get('query_stocks/get_localizacion', descrip, function(response) {
                 filtro_idLoc.html("");
                 filtro_idLoc.append('<option value="">Localización</option>');
                _.each(response.localizaciones, function (item) {
                    filtro_idLoc.append('<option value="' + item.descripcion + '">' + item.descripcion + '</option>');
                });
              });
        });
        getDataFiltro();
        function getDataFiltro() {
            filtro_idAlm = $('#filtro_idAlm');
            filtro_idLoc = $('#filtro_idLoc');
            filtro_nat=$('#filtro_nat');
            filtro_oper=$('#filtro_oper');
            filtro_cate=$('#filtro_cate');
            filtro_art=$('#filtro_art');
            var hoy = new Date();
            var actu=hoy.getFullYear()+"-"+ (hoy.getMonth()+1)+ "-" +hoy.getDate() ;
            $("#fecha_inicio").val(actu);
            $("#fecha_fin").val(actu);
             // Notify.warning('Debe ingresar el cliente que realizará el pago');
            RESTService.all('query_movements/getDataFiltro', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                  
                    filtro_idAlm.append('<option value="">Almacén</option>');
                    _.each(response.d_Almacen, function (item) {
                        filtro_idAlm.append('<option value="'+item.description+'">' + item.description + '</option>');
                    });
                    filtro_idLoc.append('<option value="">Localización</option>');
                    // _.each(response.d_localizacion, function (item) {
                    //     filtro_idLoc.append('<option value="' + item.descripcion + '">' + item.descripcion + '</option>');
                    // });
                    filtro_cate.append('<option value="">Categoría</option>');
                    _.each(response.d_categoria, function (item) {
                        filtro_cate.append('<option value="' + item.descripcion + '">' + item.descripcion + '</option>');
                    });
                    filtro_art.append('<option value="">Artículo</option>');
                    _.each(response.d_articulo, function (item) {
                        filtro_art.append('<option value="' + item.code_article + '">' + item.code_article+' '+ item.description + '</option>');
                    });
                    filtro_nat.append('<option value="">Naturaleza</option>');
                    _.each(response.d_naturaleza, function (item) {
                        filtro_nat.append('<option value="' + item.descripcion + '">' + item.descripcion + '</option>');
                    });
                    filtro_oper.append('<option value="">Operación</option>');
                    _.each(response.d_tipoOperacion, function (item) {
                        filtro_oper.append('<option value="' + item.descripcion + '">' + item.descripcion + '</option>');
                    });
                  
                } else {
                    getDataFiltro();
                }
            }, function () {
                getDataFiltro();
            });
        }

        $("#btn_exportar_QM").click(function(e){
            var data_excel = {
                            filtro_idAlm:$('#filtro_idAlm').val(),
                            filtro_idLoc:$('#filtro_idLoc').val(),
                            filtro_nat:$('#filtro_nat').val(),
                            filtro_oper:$('#filtro_oper').val(),
                            filtro_cate:$('#filtro_cate').val(),
                            filtro_art:$('#filtro_art').val(),
                            n_movimiento:$('#n_movimiento').val(),
                            cod_lote:$('#cod_lote').val(),
                            cod_serie:$('#cod_serie').val(),
                            fecha_inicio:$('#fecha_inicio').val(),
                            fecha_fin:$('#fecha_fin').val(),
                            search: '',
             };
            //             $scope.openDoc('projects/excel', data_excel);
            $scope.openDoc('query_movements/excel',data_excel);
        });
        $("#btn_exportar_QM_PDF").click(function(e){
            var data_pdf = {
                            filtro_idAlm:$('#filtro_idAlm').val(),
                            filtro_idLoc:$('#filtro_idLoc').val(),
                            filtro_nat:$('#filtro_nat').val(),
                            filtro_oper:$('#filtro_oper').val(),
                            filtro_cate:$('#filtro_cate').val(),
                            filtro_art:$('#filtro_art').val(),
                            n_movimiento:$('#n_movimiento').val(),
                            cod_lote:$('#cod_lote').val(),
                            cod_serie:$('#cod_serie').val(),
                            fecha_inicio:$('#fecha_inicio').val(),
                            fecha_fin:$('#fecha_fin').val(),
                            search: '',
             };
                $scope.loadQueryMovimientoPDF('query_movements/pdf', data_pdf);
            //             $scope.openDoc('projects/excel', data_pdf);
            // $scope.openDoc('query_movements/pdf',data_pdf);
        });
        generateSearchForm('frm-search-Query_Movement', 'LoadRecordsButtonQuery_Movement', function(){
            table_container_Query_Movement.jtable('load', {
                search: $('#search_b').val(),
                filtro_idAlm:$('#filtro_idAlm').val(),
                filtro_idLoc:$('#filtro_idLoc').val(),
                filtro_nat:$('#filtro_nat').val(),
                filtro_oper:$('#filtro_oper').val(),
                filtro_cate:$('#filtro_cate').val(),
                filtro_art:$('#filtro_art').val(),
                n_movimiento:$('#n_movimiento').val(),
                cod_lote:$('#cod_lote').val(),
                cod_serie:$('#cod_serie').val(),
                fecha_inicio:$('#fecha_inicio').val(),
                fecha_fin:$('#fecha_fin').val(),
            });
        }, true);

        $(".jtable-title-text").removeClass('col-md-4');
        $(".jtable-title-text").addClass('col-md-3');

        $(".jtable-toolbar").removeClass('col-md-8');
        $(".jtable-toolbar").addClass('col-md-9');

    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('query_movements', {
                url: '/query_movements',
                templateUrl: base_url + '/templates/query_movements/base.html',
                controller: 'Query_MovementCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();