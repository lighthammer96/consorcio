/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.technicians')
        .config(Config)
        .controller('TechnicianCtrl', TechnicianCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    TechnicianCtrl.$inject = ['$scope'];

    function TechnicianCtrl($scope)
    {
        
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        
        var search = getFormSearch('frm-search-Technician', 'search_b', 'LoadRecordsButtonTechnician');

        var table_container_Technician = $("#table_container_Technician");

        table_container_Technician.jtable({
            title: "Lista de Técnicos",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/technicians/list',
                createAction: base_url + '/technicians/create',
                updateAction: base_url + '/technicians/update',
                deleteAction: base_url + '/technicians/delete',
            },
            messages: {
                addNewRecord: 'Nuevo Técnico',
                editRecord: 'Editar Técnico',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('technicians/excel', {});
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
                descripcion: {
                    title: 'Técnico',
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
                data.form.find('input[name="meta_cantidad"]').attr('onkeypress','return soloNumeros(event)');
                data.form.find('input[name="meta_monto"]').attr('onkeypress','return validDecimals(event, this, 4)')
                    .attr('onblur','return roundDecimals(this, 2)');
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
                bval = bval && data.form.find('input[name="Técnico"]').required();
                bval = bval && data.form.find('input[name="meta_cantidad"]').required();
                bval = bval && data.form.find('input[name="meta_monto"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-Technician', 'LoadRecordsButtonTechnician', function(){
            table_container_Technician.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('technicians', {
                url: '/technicians',
                templateUrl: base_url + '/templates/technicians/base.html',
                controller: 'TechnicianCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();