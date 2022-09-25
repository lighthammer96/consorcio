/**
 * Created by JAIR on 4/5/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.accoudets')
        .config(Config)
        .controller('AccoudetCtrl', AccoudetCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    AccoudetCtrl.$inject = ['$scope'];

    function AccoudetCtrl($scope)
    {
        var search = getFormSearch('frm-search-Accoudet', 'search_b', 'LoadRecordsButtonAccoudet');

        var table_container_Accoudet = $("#table_container_Accoudet");

        table_container_Accoudet.jtable({
            title: "Lista Contable Detalle",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/accoudets/list',
                createAction: base_url + '/accoudets/create',
                updateAction: base_url + '/accoudets/update',
                deleteAction:base_url + '/accoudets/delete',
               

            },
            messages: {
                addNewRecord: 'Nuevo Contable Detalle',
                editRecord: 'Editar Contable Detalle',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('accoudets/excel', {});
                    }
                }]
            },
            fields: {
                Contabledet: {
                       title: 'Grupo Contable',
                        options: base_url + '/accoudets/getGrupoContable' ,
                         listClass: 'text-center',
                },
                Operacion: {
                    title: 'Operación',
                     options: base_url + '/accoudets/getTipoOperacion' ,
                      listClass: 'text-center',
                },
                
                cuenta: {
                    title: 'Cuenta',
                     listClass: 'text-center',
                },
                centrocosto: {
                    title: 'Centro Costo',
                     listClass: 'text-center',
                },
                  idgrup: {
                      title: 'Cuenta',
                      type:'hidden',
                },
                 idoper: {
                    title: 'Cuenta',
                    type:'hidden',
                },
                 identificador: {
                     key: true,
                    create: false,
                    edit: false,
                    list: false
                },
    //             customDelete: {
    //             title: '',
    //             width: '0.3%',
    //             display: function(data) {
    //             var $but = $('<a  data-target="#" title="Eliminar" class="jtable-command-button" ><i class="fa fa-trash fa-1-5x fa-red"><span>Eliminar</span></i></a>');
    //                 $but.click(function(){
    //                  return $.Deferred(function ($dfd) {
    //                      $.ajax({
    //                         url: '/admin/configuration/delete',
    //                         type: 'POST',
    //                         dataType: 'json',
    //                         data: data.record,
    //                         success: function (data) {
    //                             $dfd.resolve(data);
    //                             $('#Container').jtable('load') ;

    //                         },
    //                         error: function () {
    //                             $dfd.reject();
    //                         }
    //                     });
    //                     });   
    //         });
    //         return $but;
    //     }
    // },


            },

            formCreated: function (event, data) {
                data.form.find('input[name="Moneda"]').attr('onkeypress','return soloLetras(event)');
                var contd = data.form.find('select[name="Contabledet"]');
                var data_opera = data.form.find('select[name="Operacion"]');
                var data_ident = data.form.find('input[name="centrocosto"]');
                if (data_ident.val() !== '') {
                    contd.prop('disabled', true);
                    data_opera.prop('disabled', true);
                }
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="Contabledet"]').required();
                bval = bval && data.form.find('input[name="Operacion"]').required();
                bval = bval && data.form.find('input[name="cuenta"]').required();
                bval = bval && data.form.find('input[name="centrocosto"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-Accoudet', 'LoadRecordsButtonAccoudet', function(){
            table_container_Accoudet.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }


    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('accoudets', {
                url: '/accoudets',
                templateUrl: base_url + '/templates/accoudets/base.html',
                controller: 'AccoudetCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();