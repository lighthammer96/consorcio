/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.vehiculos_terceros')
        .config(Config)
        .controller('Vehiculos_terceroCtrl', Vehiculos_terceroCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    Vehiculos_terceroCtrl.$inject = ['$scope'];

    function Vehiculos_terceroCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Vehiculos_tercero', 'search_b', 'LoadRecordsButtonVehiculos_tercero');

        var table_container_Vehiculos_tercero = $("#table_container_Vehiculos_tercero");

        table_container_Vehiculos_tercero.jtable({
            title: "Lista de Vehículos Terceros",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/vehiculos_terceros/list',
                createAction: base_url + '/vehiculos_terceros/create',
                updateAction: base_url + '/vehiculos_terceros/update',
                deleteAction: base_url + '/vehiculos_terceros/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Vehículo',
                editRecord: 'Editar Vehículo',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('vehiculos_terceros/excel', {});
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
                // idTipoVehiculo: {
                //     title: 'Tipo Vehículo',
                //     options: base_url + '/vehiculos_terceros/getTipoVehiculo' ,
                // },
                idMarca: {
                    title: 'Marca',
                    options: base_url + '/vehiculos_terceros/getMarca' ,
                },
                idModelo: {
                    title: 'Modelo',
                    dependsOn: 'idMarca',
                     options: function (data) {
                        if (data.source == 'list') {
                            //Return url of all countries for optimization. 
                            //This method is called for each row on the table and jTable caches options based on this url.
                            var url=base_url + '/vehiculos_terceros/getModelo/'+data.dependedValues.idMarca;
                            return url;
                           
                        }
 
                        //This code runs when user opens edit/create form or changes continental combobox on an edit/create form.
                        //data.source == 'edit' || data.source == 'create'
                        var url=base_url + '/vehiculos_terceros/getModelo/'+data.dependedValues.idMarca;
                        return url;
                    },

                },
                motor: {
                    title: 'Motor',
                },
                n_chasis: {
                    title: 'Chasis',
                },
                anio_fabricacion: {
                    title: 'Año Fabricación',
                },
                color: {
                    title: 'Color',
                },
                placa: {
                    title: 'Placa',
                },


            },
           

            formCreated: function (event, data) {
                data.form.find('input[name="Categoria"]').attr('onkeypress','return soloLetras(event)');
                $('#Edit-estado').parent().addClass('i-checks');
                 data.form.find('input[name="anio_fabricacion"]').attr('onkeypress','return soloNumeros(event)');
                  $('input[name="anio_fabricacion"]').attr('maxlength', 4);
                   $('input[name="placa"]').attr('maxlength', 10);
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

        generateSearchForm('frm-search-Vehiculos_tercero', 'LoadRecordsButtonVehiculos_tercero', function(){
            table_container_Vehiculos_tercero.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('vehiculos_terceros', {
                url: '/vehiculos_terceros',
                templateUrl: base_url + '/templates/vehiculos_terceros/base.html',
                controller: 'Vehiculos_terceroCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();