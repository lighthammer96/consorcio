/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.sectors')
        .config(Config)
        .controller('SectorCtrl', SectorCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    SectorCtrl.$inject = ['$scope'  ,'_', 'RESTService', 'AlertFactory'];

    function SectorCtrl($scope, _, RESTService, AlertFactory)
    {
        var titleModalTienda = $('#titleModalTienda');
        var modaTiendas = $('#modaTiendas');
        var state_text = $('#state_text');
       
        var tienda_id = $('#tienda_id');
        var descripcion = $('#descripcion');
        var direccion = $('#direccion');
        var departamento = $('#departamento');
        var provincia = $('#provincia');
        var distrito = $('#distrito');
        var p_state = $('#p_state');

        function cleanTienda () {
            cleanRequired();
            titleModalTienda.html('');
            descripcion.val('');
            direccion.val('');
            departamento.val('');
            provincia.val(''); 
            tienda_id.val('');
            distrito.val('');
            p_state.prop('checked', true).iCheck('update');
            state_text.html('Activo');
            provincia.html('');
            provincia.html('');
            distrito.html('');
        };

        $scope.SectorGetProvincia=function(){
            console.log("cambio2");

        };

        function getDepartamento(bandera){
            var id="0";
            RESTService.get('sectors/TraerDepartamentos', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                     var data_p = response.data;
                     departamento.html('');
                      departamento.append('<option value="" selected>Seleccione</option>');
                     _.each(response.data, function(item) {
                        if(item.cDepartamento==bandera){
                             departamento.append('<option value="'+item.cDepartamento+'" selected >'+item.cDepartamento+'</option>');
                        }else{
                             departamento.append('<option value="'+item.cDepartamento+'" >'+item.cDepartamento+'</option>');
                        };
            
                    });

                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }

               });
        }
       function getProvincia(bandera,id){
                RESTService.get('sectors/TraerProvincias', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                     var data_p = response.data;
                     console.log(data_p);
                      provincia.html('');
                      provincia.append('<option value="" selected>Seleccione</option>');
                     _.each(response.data, function(item) {
                        if(item.cProvincia==bandera){
                             provincia.append('<option value="'+item.cProvincia+'" selected>'+item.cProvincia+'</option>');
                         }else{
                             provincia.append('<option value="'+item.cProvincia+'">'+item.cProvincia+'</option>');
                         }
                       
                    });

                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error . Intente nuevamente.',
                        type: 'error'
                    });
                }

               });
       }
       function getDistrito(bandera,id){
        RESTService.get('sectors/TraerDistritos', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                     var data_p = response.data;
                     console.log(data_p);
                       distrito.html('');
                      distrito.append('<option value="" selected>Seleccione</option>');
                     _.each(response.data, function(item) {
                        if(item.cCodUbigeo==bandera){
                             distrito.append('<option value="'+item.cCodUbigeo+'" selected>'+item.cDistrito+'</option>');
                         }else{
                             distrito.append('<option value="'+item.cCodUbigeo+'">'+item.cDistrito+'</option>');
                         }
                       
                    });

                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }

               });
       }
      
        departamento.change(function () {
            var bandera='xxxxxx';
            var id=departamento.val();
            getProvincia(bandera,id);
        });
        provincia.change(function () {
                var bandera='xxxxxx';
                var id=provincia.val();
                getDistrito(bandera,id);
           
        });
        modaTiendas.on('hidden.bs.modal', function (e) {
              cleanTienda();
             
               

        });

        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (event) {
            $(event.target).click();
            $scope.chkState();
        });

         $scope.chkState = function () {
            var txt_state = (p_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_text.html(txt_state);
        };
        
        function newTienda()
        {
            titleModalTienda.html('Nuevo Sector');
            modaTiendas.modal('show');
            var bandera='xxxxx';
            getDepartamento(bandera);
        }
         $scope.saveTienda = function()
        {
            var bval = true;
            bval = bval && descripcion.required();
            bval = bval && departamento.required();
            bval = bval && provincia.required();
            bval = bval && distrito.required();
            if(bval){
                 var params = {
                    'descripcion': descripcion.val(),
                    'distrito': distrito.val(),
                    'estado': ((p_state.prop('checked')) ? 'A' : 'I')
                 };
                var TiendaIde_id = (tienda_id.val() === '') ? 0 : tienda_id.val();

                  RESTService.updated('sectors/createTienda', TiendaIde_id, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        modaTiendas.modal('hide');
                        AlertFactory.textType({
                                title: '',
                                message: 'Se registró correctamente.',
                                type: 'success'
                            });
                        LoadRecordsButtonSector.click();
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

          function findTienda(id)
        {
            titleModalTienda.html('Editar Sector');
            RESTService.get('sectors/find', id, function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    tienda_id.val(data_p[0].id);
                    descripcion.val(data_p[0].descripcion);
                    direccion.val(data_p[0].direccion);
                    var chk_state = (data_p[0].estado == 'A');
                    console.log(data_p[0].estado);
                     p_state.prop('checked', chk_state).iCheck('update');
                    $scope.chkState();
                     getDepartamento(data_p[0].cDepartamento);
                     getProvincia(data_p[0].cProvincia,data_p[0].cDepartamento);
                     getDistrito(data_p[0].cCodUbigeo,data_p[0].cProvincia);
                     // console.log(data_p[0].cDepartamento);
                     // departamento.val(data_p[0].cDepartamento).trigger('change');
                    // departamento.val(data_p[0].cDepartamento);
                    // provincia.val(data_p[0].cProvincia);
                    // distrito.val(data_p[0].cCodUbigeo);
                    
                  
                    modaTiendas.modal('show');
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Lote. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        var search = getFormSearch('frm-search-Sector', 'search_b', 'LoadRecordsButtonSector');

        var table_container_Sector = $("#table_container_Sector");

        table_container_Sector.jtable({
            title: "Lista de Sector",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/sectors/list',
                deleteAction: base_url + '/sectors/delete',
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('sectors/excel', {});
                    }
                },
                {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nuevo Sector',
                    click: function () {
                        newTienda();
                    }
                }


                ]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                descripcion: {
                    title: 'Sector',
                },
                Departamento: {
                    title: 'Departamento',
                    options: base_url + '/sectors/getDepartamento' 
                },
                Provincia: {
                    title: 'Provincia',
                     options: base_url + '/sectors/getProvincia' 

                },
                Distrito: {
                    title: 'Distrito',
                     options: base_url + '/sectors/getDistrito' 

                },
                estado: {
                    title: 'Estado',
                    values: { 'I': 'Inactivo', 'A': 'Activo' },
                    type: 'checkbox',
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-Tienda" data-id="'+data.record.id
                            +'" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }
                }
            },
               recordsLoaded: function(event, data) {
                $('.edit-Tienda').click(function(e){
                    var id = $(this).attr('data-id');
                    findTienda(id);
                    e.preventDefault();
                });
           } 
        });

        generateSearchForm('frm-search-Sector', 'LoadRecordsButtonSector', function(){
            table_container_Sector.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('sectors', {
                url: '/sectors',
                templateUrl: base_url + '/templates/sectors/base.html',
                controller: 'SectorCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();