/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.consecutives')
        .config(Config)
        .controller('ConsecutiveCtrl', ConsecutiveCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ConsecutiveCtrl.$inject = ['$scope'];

    function ConsecutiveCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Consecutive', 'search_b', 'LoadRecordsButtonConsecutive');

        var table_container_Consecutive = $("#table_container_Consecutive");

        table_container_Consecutive.jtable({
            title: "Lista de Consecutivos",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/consecutives/list',
                createAction: base_url + '/consecutives/create',
                updateAction: base_url + '/consecutives/update',
                deleteAction: base_url + '/consecutives/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Consecutivo',
                editRecord: 'Editar Consecutivo',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('consecutives/excel', {});
                    }
                }]
            },
            fields: {
                cCodConsecutivo: {
                    key: true,
                    title: 'Código Consecutivo',
                    create: true,
                    edit: true,
                    list: true,
                    input: function (data) {
                        if (data.record) {
                            return '<div class="jtable-input jtable-text-input col-md-9" ><input type="text" name="cCodConsecutivo" class="form-control input-sm " readonly value="' + data.record.cCodConsecutivo + '" /></div>';
                        } else {
                            return '<div class="jtable-input jtable-text-input col-md-9" > <input type="text" name="cCodConsecutivo" class="form-control input-sm " maxlength="10" /></div>';
                        }
                    }
                },
                cCodTipoCons: {
                    title: 'Tipo Consecutivo',
                    options: base_url + '/consecutives/getTipoConsecutivo' ,
                },
                cDetalle: {
                    title: 'Detalle',
                     
                },
                nCodTienda:{
                    title: 'Tienda',
                    options: base_url + '/consecutives/getTienda' , 
                },
                nConsecutivo: {
                    title: 'Consecutivo',
                    input: function (data) {
                        if (data.record) {
                            return '<div class="jtable-input jtable-text-input col-md-9" ><input type="text" name="nConsecutivo" class="form-control input-sm "  value="' + data.record.nConsecutivo + '" /></div>';
                        } else {
                            return '<div class="jtable-input jtable-text-input col-md-9" > <input type="text" name="nConsecutivo" class="form-control input-sm " readonly value="0"  onkeypress="return soloNumeros(event)"" /></div>';
                        }
                    }
                },
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

        generateSearchForm('frm-search-Consecutive', 'LoadRecordsButtonConsecutive', function(){
            table_container_Consecutive.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('consecutives', {
                url: '/consecutives',
                templateUrl: base_url + '/templates/consecutives/base.html',
                controller: 'ConsecutiveCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();