/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.maintenances')
        .config(Config)
        .controller('MaintenanceCtrl', MaintenanceCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    MaintenanceCtrl.$inject = ['$scope'];

    function MaintenanceCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Maintenance', 'search_b', 'LoadRecordsButtonMaintenance');

        var table_container_Maintenance = $("#table_container_Maintenance");

        table_container_Maintenance.jtable({
            title: "Lista de Mantenimientos",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/maintenances/list',
                createAction: base_url + '/maintenances/create',
                updateAction: base_url + '/maintenances/update',
                deleteAction: base_url + '/maintenances/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Mantenimiento',
                editRecord: 'Editar Mantenimiento',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('maintenances/excel', {});
                    }
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                nombre: {
                    title: 'Revisión',
                },
                estado: {
                    title: 'Estado',
                    values: { 'I': 'Inactivo', 'A': 'Activo' },
                    type: 'checkbox',
                    defaultValue: 'A',
                   
                },
                // total: {
                //     title: 'Total',
                //     input: function (data) {
                //         if (data.record) {
                //             return '<div class="jtable-input jtable-text-input col-md-9" ><input type="text" name="total" class="form-control input-sm " readonly value="' + data.record.total + '" /></div>';
                //         } else {
                //             return '<div class="jtable-input jtable-text-input col-md-9" > <input type="text" name="total" class="form-control input-sm " readonly value="0" /></div>';
                //         }
                //     }
                // },
                

            },
           

            formCreated: function (event, data) {
                // data.form.find('input[name="mo_revision"]').attr('onkeypress','return validDecimals(event, this, 4)')
                //     .attr('onblur','return roundDecimals(this, 3)');
                // data.form.find('input[name="mo_mecanica"]').attr('onkeypress','return validDecimals(event, this, 4)')
                //     .attr('onblur','return roundDecimals(this, 3)');
                // data.form.find('input[name="terceros"]').attr('onkeypress','return validDecimals(event, this, 4)')
                //     .attr('onblur','return roundDecimals(this, 3)');
                // data.form.find('input[name="otros_mo"]').attr('onkeypress','return validDecimals(event, this, 4)')
                //     .attr('onblur','return roundDecimals(this, 3)');
                // data.form.find('input[name="repuestos"]').attr('onkeypress','return validDecimals(event, this, 4)')
                //     .attr('onblur','return roundDecimals(this, 3)');
                // data.form.find('input[name="accesorios"]').attr('onkeypress','return validDecimals(event, this, 4)')
                //     .attr('onblur','return roundDecimals(this, 3)');
                // data.form.find('input[name="lubricantes"]').attr('onkeypress','return validDecimals(event, this, 4)')
                //     .attr('onblur','return roundDecimals(this, 3)');
                // data.form.find('input[name="otros_rep"]').attr('onkeypress','return validDecimals(event, this, 4)')
                //     .attr('onblur','return roundDecimals(this, 3)');
                 $('input[name="nombre"]').attr('maxlength', 50);
                 function sumar(){
                     var  mo_revision=Number($('input[name="mo_revision"]').val());
                     var  mo_mecanica=Number($('input[name="mo_mecanica"]').val()); 
                     var  terceros=Number($('input[name="terceros"]').val());
                     var  otros_mo=Number($('input[name="otros_mo"]').val()); 
                     var  repuestos=Number($('input[name="repuestos"]').val());
                     var  accesorios=Number($('input[name="accesorios"]').val()); 
                     var  lubricantes=Number($('input[name="lubricantes"]').val());
                     var  otros_rep=Number($('input[name="otros_rep"]').val());   
                     var sumaTotal=mo_revision+mo_mecanica+terceros+otros_mo+repuestos+accesorios+lubricantes+otros_rep;
                     $('input[name="total"]').val(sumaTotal);
                 } ;  
                $('input[name="mo_revision"]').keyup(function (e) {
                    sumar();
                });
                 $('input[name="mo_mecanica"]').keyup(function (e) {
                      sumar();
                });
                  $('input[name="terceros"]').keyup(function (e) {
                    sumar();
                });
                   $('input[name="otros_mo"]').keyup(function (e) {
                     sumar();
                });
                    $('input[name="repuestos"]').keyup(function (e) {
                     sumar();
                });
                 $('input[name="accesorios"]').keyup(function (e) {
                     sumar();
                });
                 $('input[name="lubricantes"]').keyup(function (e) {
                     sumar();
                });
                 $('input[name="otros_rep"]').keyup(function (e) {
                     sumar();
                });
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
                bval = bval && data.form.find('input[name="nombre"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-Maintenance', 'LoadRecordsButtonMaintenance', function(){
            table_container_Maintenance.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('maintenances', {
                url: '/maintenances',
                templateUrl: base_url + '/templates/maintenances/base.html',
                controller: 'MaintenanceCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();