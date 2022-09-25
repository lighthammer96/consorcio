/**
 * Created by JAIR on 4/5/2017.
 */
  
(function () {
    'use strict';
    angular.module('sys.app.list_precios')
        .config(Config)
        .controller('List_precioCtrl', List_precioCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    List_precioCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory'];

    function List_precioCtrl($scope, _, RESTService, AlertFactory)
    {   
        var modalDeleteListaPrecio=$("#modalDeleteListaPrecio");
        var descripcion=$("#descripcion");
        var id_tipocli=$("#id_tipocli");
        var idMoneda=$("#IdMoneda");
        var lista_id=$("#lista_id"); 
        var dFecVigIni=$("#dFecVigIni");
        var dFecVigFin=$("#dFecVigFin");
        var iEstado=$("#iEstado");
        var p_table_productos=$("#p_table_productos");
        var modalProducto=$("#modalProducto");
        var modalPrecios=$("#modalPrecios");
        var titlemodalPrecios=$("#titlemodalPrecios");
        var idDetalle_Delete=[];
        var btn_aprobar=$(".btn_aprobar");
        var btn_desaprobar=$(".btn_desaprobar");
        var idPrecioDelete=$("#idPrecioDelete");
        var btn_guardar_precios=$(".btn_guardar_precios");
        modalPrecios.on('hidden.bs.modal', function (e) {
            cleanPrecios();
        });
        function cleanPrecios() {
            cleanRequired();
            titlemodalPrecios.html('');
            descripcion.val('');
            id_tipocli.val('').trigger('change');
            idMoneda.val('').trigger('change');
            lista_id.val('');
            dFecVigIni.val('');
            dFecVigFin.val('');
            p_table_productos.html('');
            lista_id.val('');
            iEstado.val('').trigger("change");
            btn_aprobar.prop('disabled',true); 
            btn_guardar_precios.prop('disabled',false);
            btn_desaprobar.prop('disabled',true);  
            idDetalle_Delete=[];
            $(".light-table-filter").val("");
        }
        function newListPrecio() {
            modalPrecios.modal('show');
            titlemodalPrecios.html('Nuevo Lista de Precios');
        }
         $scope.chkState = function () {
            var txt_state2 = (w_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_state.html(txt_state2);
        };
        $scope.openProducto = function () {
            $('#LoadRecordsButtonProducto').click();
            modalProducto.modal('show');
        }; 
        function findListPre(id) {
            titlemodalPrecios.html('Editar Lista de Precios');
            RESTService.get('list_precios/find', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    iEstado.val(data_p.iEstado);

                    descripcion.val(data_p.descripcion);
                    id_tipocli.val(data_p.id_tpocli).trigger("change");
                    idMoneda.val(data_p.moneda).trigger("change");
                    lista_id.val(data_p.id);
                    dFecVigIni.val(data_p.dFecVigIni);
                    dFecVigFin.val(data_p.dFecVigFin);
                    _.each(data_p.productos, function (c) {
                        console.log(data_p.productos);
                        console.log("dataata");
                          // var codigo=String(c.id_lista)+'_'+String(c.idProducto);
                          var pre=Number(c.nPrecio);
                           addToProductos(c.idProducto,c.descripcion,pre.toFixed(2),c.idProducto,c.code_article)
                     });
                    if(data_p.iEstado==0){
                        btn_guardar_precios.prop('disabled',false); 
                        btn_aprobar.prop('disabled',false); 
                        btn_desaprobar.prop("disabled",true);
                        iEstado.val(data_p.iEstado).trigger("change");
                        
                    }else{
                        btn_guardar_precios.prop('disabled',true);
                        btn_desaprobar.prop("disabled",false); 
                    };
                    modalPrecios.modal('show');

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener la lista. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
        $scope.Aprobar_precios = function () {
            var id=lista_id.val();
            RESTService.get('list_precios/aprobarPrecio', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                     var data_p = response.data;
                    if(data_p.iEstado==1){
                         btn_aprobar.prop('disabled',true); 
                        btn_desaprobar.prop("disabled",false);
                        btn_guardar_precios.prop('disabled',true); 
                         iEstado.val(1).trigger('change');
                          AlertFactory.textType({
                            title: '',
                            message: 'La lista se aprobó correctamente',
                            type: 'success'
                        });
                    };
                     LoadRecordsButtonList_precio.click();
                   
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener la lista. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        } 
        $scope.Desaprobar_precios = function () {
            var id=lista_id.val();
            RESTService.get('list_precios/DesaprobarPrecio', id, function (response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var data_p = response.data;
                    if(data_p.iEstado==0){
                        btn_desaprobar.prop("disabled",true);
                        btn_aprobar.prop('disabled',false); 
                        btn_guardar_precios.prop('disabled',false); 
                         iEstado.val(0).trigger('change');
                          AlertFactory.textType({
                            title: '',
                            message: 'La lista se Desaprobó correctamente',
                            type: 'success'
                        });
                    };
                     LoadRecordsButtonList_precio.click();
                   
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener la lista. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        } 
        $scope.savePrecios = function () {
            var bval = true;
            bval = bval && descripcion.required();
            bval = bval && id_tipocli.required();
            bval = bval && idMoneda.required();
            bval = bval && dFecVigIni.required();
            bval = bval && dFecVigFin.required();
            if (bval && p_table_productos.html() === '' ) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar mínimo 1 producto para la lista'
                });
                return false;
            };
            var idProducto = [];
            $.each($('.w_idProducto'), function (idx, item) {
                idProducto[idx] = $(item).val();
            });
            idProducto = idProducto.join(',');

            var precios_ar = [];
            var ide='I';
            $.each($('.w_precio'), function (idx, item) {
                precios_ar[idx] = $(item).val();
                if($(item).val()==0 || $(item).val()==''){
                    AlertFactory.showWarning({
                    title: '',
                    message: 'El precio no puede ser 0'
                  });
                 ide='A';
                };
            });
            precios_ar = precios_ar.join(',');
            if(ide=='A'){
                bval=false;
            };
            if (bval) {
                var params = {
                    'descripcion': descripcion.val(),
                    'id_tpocli': id_tipocli.val(),
                    'IdMoneda': idMoneda.val(),
                    'dFecVigIni': dFecVigIni.val(),
                    'dFecVigFin': dFecVigFin.val(),
                    'idProducto':idProducto,
                    'nPrecio':precios_ar,
                    'idDetalle_Delete':idDetalle_Delete,
                };
                var w_id = (lista_id.val() === '') ? 0 : lista_id.val();

                RESTService.updated('list_precios/savePrecios', w_id, params, function (response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        console.log(response.data);
                        AlertFactory.textType({
                            title: '',
                            message: 'La lista se guardó correctamente.',
                            type: 'success'
                        });
                        iEstado.val(0).trigger('change');
                        lista_id.val(response.id);
                        btn_aprobar.prop('disabled',false); 
                        LoadRecordsButtonList_precio.click();
                    } else {
                        var msg_ = (_.isUndefined(response.message)) ?
                            'No se pudo guardar la lista. Intente nuevamente.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                }); 
            }
        }; 
        function getDataFormCustomer () {
            RESTService.all('list_precios/data_formCus', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                     var tipo_clie=response.tipo_clie;
                     id_tipocli.append('<option value="">Seleccionar</option>');
                        tipo_clie.map(function(index) {
                        id_tipocli.append('<option value="'+index.id+'">'+index.descripcion+'</option>');
                    });
                  
                }
            }, function() {
                getDataFormCustomer();
            });
        }
        getDataFormCustomer();

        function getDataForOrdenServicio () {
            RESTService.all('list_precios/data_formOrde', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                      idMoneda.append('<option value="">Seleccionar</option>');
                       _.each(response.moneda, function(item) {
                        idMoneda.append('<option value="'+item.IdMoneda+'">'+item.Descripcion+'</option>');
                    });
                } 
            }, function() {
                getDataForOrdenServicio();
            });
        }
        getDataForOrdenServicio();

        function addToProductos(code,description,precio,idProducto,code_article){
            if ($('#tr_b_' + code).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asignó este Producto'
                });
                return false;
            } 

            var tr = $('<tr id="tr_b_' + code + '"></tr>');
            var td0 = $('<td>' + code_article +'</td>');
            var td1 = $('<td>' + description + '</td>');
            var tdu = $('<td></td>');
            var inp = $('<input type="hidden" class="w_idProducto" value="' + idProducto + '" />');
            var in2 = $('<input type="number" min="1"  class="form-control input-sm w_precio" value="' + precio + '"/>');
            td1.append(inp);
            tdu.append(in2);
            var td2 = $('<td class="text-center"></td>');
            var btn = $('<button class="btn btn-danger btn-xs delProducto" data-id="' + code + '" type="button"><span class="fa fa-trash"></span></button>');
            td2.append(btn);
            tr.append(td0).append(td1).append(tdu).append(td2);
            p_table_productos.prepend(tr);
            modalProducto.modal('hide');
            $('.delProducto').click(function (e) {
                var code = $(this).attr('data-id');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar este Producto?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    $('#tr_b_' + code).remove();
                    idDetalle_Delete.push(code);
                });
                e.preventDefault();
            });
        }
        callModals();
        function callModals() {
           
            var search_p = getFormSearch('frm-search-producto', 'search_producto', 'LoadRecordsButtonProducto');

            var table_container_p = $("#table_container_p");

            table_container_p.jtable({
                title: "Lista de Productos",
                paging: true,
                sorting: true,
                actions: {
                     listAction: base_url +'/list_precios/getProductosServicio'
                },
                toolbar: {
                    items: [{
                        cssClass: 'buscador',
                        text: search_p
                    }]
                },
                fields: {
                    id: {
                        title: 'Código',
                        width: '5%',
                        key: true,
                        create: false,
                        edit: false,
                        list: false
                    },
                    code_article: {
                        title: 'Código',
                    },
                    description: {
                        title: 'Producto',
                    },
                    select: {
                        width: '1%',
                        sorting: false,
                        edit: false,
                        create: false,
                        listClass: 'text-center',
                        display: function (data) {
                            return '<a href="javascript:void(0)" title="Seleccionar" class="select_p"  data-codeArticle="'+
                            data.record.code_article+'" data-name="'+
                            data.record.description+'" data-code="'+data.record.id+'" ><i class="fa fa-' +
                                icon_select + ' fa-1-5x"></i></a>';
                        }
                    }
                },
                recordsLoaded: function (event, data) {
                    $('.select_p').click(function (e) {
                            var code_article=$(this).attr('data-codeArticle');
                            var code = $(this).attr('data-code');
                            var description = $(this).attr('data-name');
                            var precio=0;
                            addToProductos(code,description,precio,code,code_article);
                            e.preventDefault();
                    });
                   
                }
            });
            generateSearchForm('frm-search-producto', 'LoadRecordsButtonProducto', function () {
                table_container_p.jtable('load', {
                    search: $('#search_producto').val()
                });
            }, false);

        }
        $scope.eliminarPrecios = function(){
            var id=idPrecioDelete.val();
            console.log(id);
            RESTService.get('list_precios/delete', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                    var dta=response.elim;
                    console.log(dta);
                    if(dta=="A"){
                        AlertFactory.textType({
                                title: '',
                                message: 'Solo se puede eliminar Listas en estado Registrado',
                                type: 'info'
                        }); 
                        modalDeleteListaPrecio.modal("hide"); 
                    }else{
                         AlertFactory.textType({
                            title: '',
                            message: 'El registro se eliminó correctamente',
                            type: 'success'
                        });
                        modalDeleteListaPrecio.modal("hide"); 
                        LoadRecordsButtonList_precio.click();
                    }
                  
                    
                    }
               });
        }
        var search = getFormSearch('frm-search-List_precio', 'search_b', 'LoadRecordsButtonList_precio');

        var table_container_List_precio = $("#table_container_List_precio");

        table_container_List_precio.jtable({
            title: "Lista de Precios",
            paging: true,
            sorting: true,
            actions: { 
                listAction: base_url + '/list_precios/list',
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
                        $scope.openDoc('list_precios/excel', {});
                    }
                }, {
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nueva Lista',
                    click: function () {
                        newListPrecio();
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
                    title: 'Descripcion',
                },
                id_tpocli: {
                    title: 'Tipo Cliente',
                    options: base_url + '/list_precios/getTipoCliente' ,
                },
                IdMoneda: {
                    title: 'Moneda',
                     options: base_url + '/list_precios/getMonedas',
                },
                dFecVigIni: {
                    title: 'Fecha Inicio ',
                    width: '20%',
                        sorting: false,
                        display: function (data) {
                            return moment(data.record.dFecVigIni).format('DD/MM/YYYY');
                        }
                },
                dFecVigFin: {
                    title: 'Fecha Fin',
                        width: '20%',
                        sorting: false,
                        display: function (data) {
                            return moment(data.record.dFecVigFin).format('DD/MM/YYYY');
                        }
                },
                iEstado: {
                    title: 'Estado',
                    values: { '0': 'Registrado', '1': 'Aprobado' ,'2': 'Vencido'},
                    type: 'checkbox',
                    defaultValue: '0',
                },
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Editar" class="edit_w"  data-codeArticle="' +
                        data.record.code_article + '" data-code="' +
                            data.record.id + '"><i class="fa fa-pencil-square-o fa-1-5x fa-green"></i></a>';
                    }
                }
                ,
                    Eliminar: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a data-target="#"  data-ide="'+data.record.id+'"   title="Eliminar" class="jtable-command-button eliminar-precio"><i class="fa fa-trash fa-1-5x fa-red"><span>Eliminar</span></i></a>';
                    }
                    
                }

            },
           
            recordsLoaded: function (event, data) {
                $('.edit_w').click(function (e) {
                    var id = $(this).attr('data-code');
                    findListPre(id);
                    e.preventDefault();
                });
                $('.eliminar-precio').click(function(e){
                    var ide = $(this).attr('data-ide');
                    idPrecioDelete.val(ide);
                    modalDeleteListaPrecio.modal("show");
                    e.preventDefault();
                });
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

        generateSearchForm('frm-search-List_precio', 'LoadRecordsButtonList_precio', function(){
            table_container_List_precio.jtable('load', {
                search: $('#search_b').val()
            });
        }, true);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('list_precios', {
                url: '/list_precios',
                templateUrl: base_url + '/templates/list_precios/base.html',
                controller: 'List_precioCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();