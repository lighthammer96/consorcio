/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.resetearContrasenias')
        .config(Config)
        .controller('ResetearContraseniaCtrl', ResetearContraseniaCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ResetearContraseniaCtrl.$inject = ['$scope','AlertFactory', 'RESTService', '_'];

    function ResetearContraseniaCtrl($scope,AlertFactory, RESTService, _)
    {
        var contrasenia=$("#contrasenia");
        var btn_ResetearCont=$("#btn_ResetearCont"); 
        var usuarioActual;
        var new_pass=$("#new_pass");
        var re_pass=$("#re_pass");
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };

        function getDataForProforma () {
               console.log("gdgdgdgdgd");
            RESTService.all('resetearContrasenias/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                        console.log("fffff");
                    console.log(response.userid);
                     usuarioActual=response.userid;
                } 
            }, function() {
                getDataForProforma();
            });
        }
        getDataForProforma();  
        $('#btn_ResetearCont').click(function (e) {

            var bval = true;
            bval = bval && new_pass.required(); 
            bval = bval && re_pass.required(); 
            var newp=new_pass.val();
            var cnep=re_pass.val();
            if(newp.length<6 || cnep.length<6 ){
                AlertFactory.textType({
                            title: '',
                            message: 'La contraseña no puede tener menos de 6 dígitos',
                            type: 'info'
                });
                // bval=false;
                return false;

            } 
            if (bval) {
                var id=0;
                var new_p=new_pass.val();
                var re_p=re_pass.val();
                  var params = {
                    'new_pass': new_pass.val(),
                    're_pass': re_pass.val(),
                 };
                RESTService.updated('resetearContrasenias/change_password_user', id, params, function(response) { 
                    if (!_.isUndefined(response.status) && response.status) {
                                AlertFactory.textType({
                                    title: '',
                                    message: 'La contraseña del usuario se reseteó correctamente.',
                                    type: 'success'
                                });
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar resetear. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                }); 
            }  
        });
        
        var search = getFormSearch('frm-search-ResetearContrasenia', 'search_b', 'LoadRecordsButtonResetearContrasenia');

        var table_container_ResetearContrasenia = $("#table_container_ResetearContrasenia");

        table_container_ResetearContrasenia.jtable({
            title: "Lista de Categorías",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/resetearContrasenias/list',
                createAction: base_url + '/resetearContrasenias/create',
                updateAction: base_url + '/resetearContrasenias/update',
                deleteAction: base_url + '/resetearContrasenias/delete',
            },
            messages: {
                addNewRecord: 'Nueva Categoría',
                editRecord: 'Editar Categoría',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('resetearContrasenias/excel', {});
                    }
                }]
            },
            fields: {
                idCategoria: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                Categoria: {
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
            },
            formSubmitting: function (event, data) {
                var bval = true;
                bval = bval && data.form.find('input[name="Categoria"]').required();
                return bval;
            }
        });

        generateSearchForm('frm-search-ResetearContrasenia', 'LoadRecordsButtonResetearContrasenia', function(){
            table_container_ResetearContrasenia.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('resetearContrasenias', {
                url: '/resetearContrasenias',
                templateUrl: base_url + '/templates/resetearContrasenias/base.html',
                controller: 'ResetearContraseniaCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();