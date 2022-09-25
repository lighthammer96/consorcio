/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.categoriaVehiculars')
        .config(Config)
        .controller('CategoriaVehicularCtrl', CategoriaVehicularCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    CategoriaVehicularCtrl.$inject = ['$scope', '_', 'RESTService','AlertFactory'];

    function CategoriaVehicularCtrl($scope,_, RESTService ,AlertFactory)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-CategoriaVehicular', 'search_b', 'LoadRecordsButtonCategoriaVehicular');

        var table_container_CategoriaVehicular = $("#table_container_CategoriaVehicular");

        table_container_CategoriaVehicular.jtable({
            title: "Lista de Categorías Vehículares",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/categoriaVehiculars/list',
                createAction: function (postData) {
                    console.log("creating from custom function...");
                    return $.Deferred(function ($dfd) {
                        $.ajax({
                            url: '/categoriaVehiculars/create',
                            type: 'POST',
                            dataType: 'json',
                            data: postData,
                            success: function (data) {
                                console.log(data.data_ide);
                                if(data.data_ide=='A'){
                                    $dfd.resolve(data);
                                }else{
                                    $("#AddRecordDialogSaveButton").prop("disabled",false);
                                     AlertFactory.textType({
                                                    title: '',
                                                    message: 'El Identificador de la categoría ya existe',
                                                    type: 'info'
                                    });
                                     $("#AddRecordDialogSaveButton").prop("disabled",false);
                                     $("#AddRecordDialogSaveButton").removeClass("ui-state-disabled");
                                }
                                
                            },
                            error: function () {
                               
                            }
                        });
                    });
                },
                updateAction: base_url + '/categoriaVehiculars/update',
                deleteAction: base_url + '/categoriaVehiculars/delete',
            },
            messages: {
                addNewRecord: 'Nueva Categoría Vehícular',
                editRecord: 'Editar Categoría Vehícular',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('categoriaVehiculars/excel', {});
                    }
                }]
            },
            fields: {
                idCatVeh: {
                    title: 'Identificador',
                    key: true,
                    create: true,
                    edit: true,
                    list: true
                },
                descripcion: {
                    title: 'Categoría',
                     

                },
                estado: {
                    title: 'Estado',
                    values: { 'I': 'Inactivo', 'A': 'Activo' },
                    type: 'checkbox',
                    defaultValue: 'A',
                   
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
                if(data.formType=='edit') {
                $('#Edit-idCatVeh').prop('readonly', true);
                $('#Edit-idCatVeh').addClass('jtable-input-readonly');
            }
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="Categoria"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-CategoriaVehicular', 'LoadRecordsButtonCategoriaVehicular', function(){
            table_container_CategoriaVehicular.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('categoriaVehiculars', {
                url: '/categoriaVehiculars',
                templateUrl: base_url + '/templates/categoriaVehiculars/base.html',
                controller: 'CategoriaVehicularCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();