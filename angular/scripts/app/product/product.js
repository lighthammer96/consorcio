/**
 * Created by JAIR on 4/6/2017.
 */

(function () {
    'use strict';
    angular.module('sys.app.products')
        .config(Config)
        .controller('ProductCtrl', ProductCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ProductCtrl.$inject = ['$scope', '_', 'RESTService', 'AlertFactory', 'Notify'];

    function ProductCtrl($scope, _, RESTService, AlertFactory, Notify)
    {
        var modalProduct = $('#modalProduct');
        var table_precios_producto=$("#table_precios_producto");
        var modalCC = $('#modalCC');
        var modalBrand = $('#modalBrand');
        var titleModalProduct = $('#titleModalProduct');
        var p_id = $('#p_id');
        var p_serie = $('#p_serie');
        var p_lote = $('#p_lote');
        var p_impuesto = $('#p_impuesto');
        var p_disponible_venta = $('#p_disponible_venta');
        var p_image = $('#p_image');
        var p_state = $('#p_state');
        var state_text = $('#state_text');
        var p_description = $("#p_description");
        var p_description_detail = $("#p_description_detail");
        var idKit=$("#idKit");
        var modalArticulo = $('#modalArticulo');
        var p_code_article = $("#code_article"); 
        var p_code_matrix = $("#code_matrix");
        var table_container_cc2=$("#table_container_cc2");
        var motor = $("#motor");
        var chasis = $("#chasis");
        var anio_modelo = $("#anio_modelo");
        var anio_fabricacion = $("#anio_fabricacion");
        var idCatVeh=$("#idCatVeh");
        var color = $("#color");
        var p_costo=$("#p_costo");
        var p_id_unidad_medidad=$("#p_id_unidad_medidad");
        

        var p_id_modelo = $('#p_id_modelo');
        var p_id_categoria = $('#p_id_categoria');
        var p_id_marca = $('#p_id_marca');
        var p_id_familia = $('#p_id_familia');
        var p_id_tipo=$("#p_id_tipo");
        var p_id_subfamilia = $('#p_id_subfamilia');
        var p_id_grupocontable = $('#p_id_grupocontable');
        var btn_kit=$("#btn-kit");
        var articulo_kit_det=$("#articulo_kit_det");
       
        var msg_cont = $('#msg_cont');

        $('.i-checks').iCheck({
            checkboxClass: 'icheckbox_square-green'
        }).on('ifChanged', function (event) {
            $(event.target).click();
            $scope.chkState();
        });
        $scope.chkState = function() {
            var txt = (p_state.prop('checked')) ? 'Activo' : 'Inactivo';
            state_text.html(txt);
        };
        p_serie.on('ifChanged', function (event) {
            if(p_serie.prop('checked')){
                p_lote.prop('checked', false).iCheck('update');
            }
              
        });
        p_lote.on('ifChanged', function (event) {
                if(p_lote.prop('checked')){
                p_serie.prop('checked', false).iCheck('update');
            }
        });
        p_id_tipo.select2();
        p_id_modelo.select2();
        p_id_categoria.select2();
        p_id_marca.select2();
        p_id_familia.select2();
        p_id_subfamilia.select2();
        p_id_grupocontable.select2();
        idCatVeh.select2();
        $("#idcarroceria").select2();
        // btn_kit.prop('disabled',true) 
       
        
        function cleanProduct () {
            cleanRequired();
            titleModalProduct.html('');
            p_id.val('');
            p_image.val("");
            $(".imgMinPhoto").html("");
            p_state.prop('checked', true).iCheck('update');
            state_text.html('Activo');
            p_description.val('');
            p_description_detail.val('');

            p_serie.prop('checked', false).iCheck('update');
            p_lote.prop('checked', false).iCheck('update');
            p_impuesto.prop('checked', true).iCheck('update');
            p_disponible_venta.prop('checked', true).iCheck('update');
            articulo_kit_det.html('');
            p_code_article.val('');
            idKit.val('');
            p_code_matrix.val('');
            motor.val('');
            chasis.val('');
            anio_modelo.val('');
            anio_fabricacion.val('');
            color.val('');
            idCatVeh.val("").trigger("change");
            p_id_modelo.html('');
            p_id_modelo.append('<option value="" selected>Seleccione</option>');
            p_id_categoria.val('').trigger('change');
            p_id_marca.val('').trigger('change');
            p_id_familia.val('').trigger('change');
            p_id_subfamilia.html('');
            p_id_subfamilia.append('<option value="" selected>Seleccione</option>');
            p_id_grupocontable.val('').trigger('change');
            p_id_tipo.val('').trigger('change');
            p_id_unidad_medidad.val('').trigger('change');
            p_costo.val("");
            table_precios_producto.html("");
            msg_cont.addClass('hide');
            activeTab('general');
        }

        modalProduct.on('hidden.bs.modal', function (e) {
            cleanProduct();
        });

        function newProduct()
        {   cleanProduct();
            titleModalProduct.html('Nuevo Artículo');
            cargartableMovAr2();
            modalProduct.modal('show');
           
           
        }
        p_id_tipo.change(function(){
           var identKit=p_id_tipo.val();
           if(identKit==3){
  
            btn_kit.prop('disabled',false) 

           }else{
   
            btn_kit.prop('disabled',true) 
    
            articulo_kit_det.html('');
           }
        });
         p_id_marca.change(function () {
            var bandera='xxxxxx';
            var id=p_id_marca.val();
            if(id !=""){
                getModelo(bandera,id);
                 
            }
           
           
        });
        p_id_familia.change(function () {
            var bandera='xxxxxx';
            var id=p_id_familia.val();
            if(id !=""){
                getSubfamilia(bandera,id);
            }
           
        }); 
         function getSubfamilia(bandera,id){
            RESTService.get('articles/TraerSubFamilia', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                     var data_p = response.data;
                     p_id_subfamilia.html('');
                      p_id_subfamilia.append('<option value="" selected>Seleccione</option>');
                     _.each(response.data, function(item) {
                        if(item.idSubFamilia==bandera){
                             p_id_subfamilia.append('<option value="'+item.idSubFamilia+'" selected >'+item.descripcion+'</option>');
                        }else{
                             p_id_subfamilia.append('<option value="'+item.idSubFamilia+'" >'+item.descripcion+'</option>');
                        };
            
                    });

                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener la Sub Familia. Intente nuevamente.',
                        type: 'error'
                    });
                }

               });
        }
        function getModelo(bandera,id){
            RESTService.get('articles/TraerModelos', id, function(response) {
                 if (!_.isUndefined(response.status) && response.status) {
                     var data_p = response.data;
                     p_id_modelo.html('');
                      p_id_modelo.append('<option value="" selected>Seleccione</option>');
                     _.each(response.data, function(item) {
                       
                        if(item.idModelo==bandera){
                        
                             p_id_modelo.append('<option value="'+item.idModelo+'" selected >'+item.descripcion+'</option>');
                        }else{
                             p_id_modelo.append('<option value="'+item.idModelo+'" >'+item.descripcion+'</option>');
                        };
            
                    });

                 }else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Modelo. Intente nuevamente.',
                        type: 'error'
                    });
                }

               });
        }

        function findProduct(id)
        {
            titleModalProduct.html('Editar Artículo');
            RESTService.get('articles/find', id, function(response) {

                if (!_.isUndefined(response.status) && response.status) {
                    console.log(response.precios_producto);
                    var data_p = response.data;
                    p_costo.val(Number(data_p.costo));
                    p_id.val(data_p.id);
                    var chk_state = (data_p.state === '1');
                    p_state.prop('checked', chk_state).iCheck('update');
                    $scope.chkState();
                    if(data_p.image !=''){
                        p_image.val(data_p.image);
                        uploadMorePicture();
                    };
                    // addToArticuloKitt(id,code, name_cc, cantidad)
                    p_code_article.val(data_p.code_article);
                    p_code_matrix.val(data_p.code_matrix);
                    p_description.val(data_p.description);
                    p_description_detail.val(data_p.description_detail);
                    var chk_serie = (data_p.serie === '1');
                    p_serie.prop('checked', chk_serie).iCheck('update');
                    var chk_lote = (data_p.lote === '1');
                    p_lote.prop('checked', chk_lote).iCheck('update');
                    var chk_venta = (data_p.disponible_venta === '1');
                    p_disponible_venta.prop('checked', chk_venta).iCheck('update');
                    var chk_impuesto = (data_p.impuesto === '1');
                    p_impuesto.prop('checked', chk_impuesto).iCheck('update');
                    motor.val(data_p.motor);
                    chasis.val(data_p.chasis);
                    anio_modelo.val(data_p.anio_modelo);
                    anio_fabricacion.val(data_p.anio_fabricacion);
                    color.val(data_p.color);
                    p_id_unidad_medidad.val(data_p.um_id).trigger('change');
                    p_id_categoria.val(data_p.idCategoria).trigger('change');
                    p_id_marca.val(data_p.idMarca).trigger('change');
                    p_id_familia.val(data_p.idFamilia).trigger('change');
                    p_id_subfamilia.val(data_p.idSubFamilia).trigger('change');
                    p_id_modelo.val(data_p.idModelo).trigger('change');
                    p_id_tipo.val(data_p.type_id).trigger('change');
                    idCatVeh.val(data_p.idCatVeh).trigger("change");
                    $("#idcarroceria").val(data_p.idcarroceria).trigger("change");
                    p_id_grupocontable.val(data_p.idGrupoContableCabecera).trigger('change');                  
                    // p_retention_id.val(data_p.retention_id).trigger('change');

                    getSubfamilia(data_p.idSubFamilia,data_p.idFamilia);
                    getModelo(data_p.idModelo,data_p.idMarca);
                   
                    if(data_p.cantidad !=""){
                        idKit.val(data_p.idKit);
                          _.each(data_p.GrupoKit, function (c) {
                           addToArticuloKitt(c.idArticulo_kit,c.code_kit, c.idArticulo_kit_description,Math.trunc(c.cantidadkit))
                        });
                    };
                    var html='';
                    html+='<thead>';
                    html+='<tr>';
                    html+='<th>Código</th>';
                    html+='<th>Producto</th>';
                    html+='<th>Precio</th>';
                    html+='<th>Tipo Cliente</th>';
                    html+='<th>Moneda</th>';
                    html+='<tbody></tbody>';
                    html+='</tr>';
                    html+='</thead>';
                    html+='<tbody id="articulo_kit_det">';
                    html+='<tr>';
                    _.each(response.precios_producto, function (c) {
                        html+='<td>'+c.codigo_articulo+'</td>';
                        html+='<td>'+c.productos+'</td>';
                        html+='<td>'+c.precio+'</td>';
                        html+='<td>'+c.tipo_cliente+'</td>';
                        html+='<td>'+c.moneda+'</td>';
                    });
                    html+='</tr>';
                    html+='</tbody>';
                    table_precios_producto.append(html);
                    modalProduct.modal('show');

                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el Artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }
        function addToLoca(codigo,productos,precio, tipocliente,moneda) {
           
            var tr = $('<tr id="tr_loca_' + codigo + '"></tr>');
            var td1 = $('<td>' + code + '</td>');
            var td2 = $('<td>' + username + '</td>');
            var td3 = $('<td>' + estado_t + '</td>');
            var inpcodigo = $('<input type="hidden" class="idLocalizacion_v" value="' + codigoLocali + '" />');
            var inp = $('<input type="hidden" class="w_locali_co" value="' + code + '" />');
            var inp2 = $('<input type="hidden" class="w_locali_des" value="' + username + '" />');
            var inp3 = $('<input type="hidden" class="w_locali_est" value="' + estado + '" />');
            td1.append(inp).append(inpcodigo);
            td2.append(inp2);
            td3.append(inp3);
            var td4 = $('<td class="text-center"></td>');
            var btn = $('<button class="btn btn-danger btn-xs delWarehouseLoca" data-id="' + codigo + '" type="button"><span class="fa fa-trash"></span></button>');
            td4.append(btn);
            tr.append(td1).append(td2).append(td3).append(td4);
            table_precios_producto.append(tr);
        }
        $scope.addAritculoKit = function()
        {   

            modalArticulo.modal('show');
            $('#search_cc2').val('');
            $('#LoadRecordsButtonCC2').click();
            $("#table_container_cc2 .jtable-main-container .jtable-bottom-panel .jtable-left-area .jtable-goto-page select ").val("1").trigger("change");
        };

        $scope.saveProduct = function()
        {
            var bval = true;
            
            bval = bval && p_code_article.required();
            bval = bval && p_code_matrix.required();
            bval = bval && p_description.required();
            bval = bval && p_id_unidad_medidad.required();
            bval = bval && p_id_tipo.required();
            bval = bval && p_id_marca.required();
            bval = bval && p_id_categoria.required();
            bval = bval && p_id_familia.required();
            bval = bval && p_id_grupocontable.required();
            if(p_id_tipo.val()==3){
                 if (bval && articulo_kit_det.html() === '' ) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Debe agregar mínimo 1 Artículo Kit'
                });
                activeTab('kit');
                return false;
                }; 
            };
            if(!bval){
                activeTab('general'); 
            };
            if(p_serie.prop('checked')){
               if(p_id_tipo.val()==3){
                 AlertFactory.showWarning({
                    title: '',
                    message: 'EL Artículo Kit no puede ser serie'
                });
                activeTab('general');
                return false;
                } 
            };
            if(p_lote.prop('checked')){
               if(p_id_tipo.val()==3){
                 AlertFactory.showWarning({
                    title: '',
                    message: 'EL Artículo Kit no puede ser Lote'
                });
                activeTab('general');
                return false;
                } 
            };
            
            if (bval) {
                var kitid = (idKit.val() === '') ? 0 : idKit.val();
               if(articulo_kit_det.html() != ''){
                    var articulosKit = [];
                    $.each($('.id_p_kit'), function (idx, item) {
                        articulosKit[idx] = $(item).val();
                    });

                    
                    articulosKit = articulosKit.join(',');

                    var cantidadKit = [];
                    $.each($('.id_p_cantidad'), function (idx, item) {
                        cantidadKit[idx] = $(item).val();
                    });
                     cantidadKit = cantidadKit.join(',');
                 }else{
                    articulosKit='N';
                    cantidadKit='N';
                 };
                     var params = {
                    'id': p_id.val(),
                    'state': ((p_state.prop('checked')) ? 1 : 0),
                    'description': p_description.val(),
                    'description_detail': p_description_detail.val(),
                    'serie': ((p_serie.prop('checked')) ? 1 : 0),
                    'lote': ((p_lote.prop('checked')) ? 1 : 0),
                    'disponible_venta': ((p_disponible_venta.prop('checked')) ? 1 : 0),
                    'impuesto': ((p_impuesto.prop('checked')) ? 1 : 0),
                    'code_article': p_code_article.val(),
                    'code_matrix': p_code_matrix.val(),
                    'motor': motor.val(),
                    'chasis': chasis.val(),
                    'anio_modelo': anio_modelo.val(),
                    'anio_fabricacion': anio_fabricacion.val(),
                    'color': color.val(),
                    'idModelo': p_id_modelo.val(),
                    'type_id': p_id_tipo.val(),
                    'idCategoria': p_id_categoria.val(),
                    'idFamilia': p_id_familia.val(),
                    'idSubFamilia': p_id_subfamilia.val(),
                    'idMarca': p_id_marca.val(),
                    'idGrupoContableCabecera': p_id_grupocontable.val(),
                    'image':p_image.val(),
                    'idArticuloKit':articulosKit,
                    'cantidadKit':cantidadKit,
                    'idKit':kitid,
                    'um_id':p_id_unidad_medidad.val(),
                    'idCatVeh':idCatVeh.val(),
                    'idcarroceria':$("#idcarroceria").val(),
                };
             
               
                var product_id = (p_id.val() === '') ? 0 : p_id.val();

                RESTService.updated('articles/saveProduct', product_id, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El registro se guardó correctamente con el código '+response.code,
                            type: 'success'
                        });
                        modalProduct.modal('hide');
                        LoadRecordsButtonProduct.click();
                    } else { 
                         var msg_ = (_.isUndefined(response.message)) ?
                            'Hubo un error al guardar el artículo.' : response.message;
                        AlertFactory.textType({
                            title: '',
                            message: msg_,
                            type: 'info'
                        });
                    }
                });
          }
        };

        function getDataForm () {
            RESTService.all('articles/data_form', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    var cave=response.cateVehicular;
                     p_id_tipo.append('<option value="" selected>Seleccionar</option>');
                    _.each(response.types, function(item) {
                        p_id_tipo.append('<option value="'+item.Value+'">'+item.DisplayText+'</option>');
                    });
                        p_id_unidad_medidad.append('<option value="" selected>Seleccionar</option>');
                     _.each(response.unidadMedida, function(item) {
                        p_id_unidad_medidad.append('<option value="'+item.Value+'">'+item.DisplayText+'</option>');
                    });
                        idCatVeh.append('<option value="" selected>Seleccionar</option>');
                      cave.map(function (index) {
                         idCatVeh.append('<option value="'+index.idCatVeh+'">'+index.idCatVeh+' '+index.descripcion+'</option>');
                      });

                      $("#idcarroceria").append('<option value="" selected>Seleccionar</option>');
                      response.carrocerias.map(function (index) {
                        $("#idcarroceria").append('<option value="'+index.idcarroceria+'">'+index.descripcion+'</option>');
                      });

                    //  p_id_modelo.append('<option value="" selected>Seleccionar</option>');
                    // _.each(response.modelo, function(item) {
                    //     p_id_modelo.append('<option value="'+item.Value+'">'+item.DisplayText+'</option>');
                    // });
                    p_id_categoria.append('<option value="" selected>Seleccionar</option>');
                     _.each(response.categoria, function(item) {
                        p_id_categoria.append('<option value="'+item.Value+'">'+item.DisplayText+'</option>');
                    });
                      p_id_familia.append('<option value="" selected>Seleccionar</option>');
                      _.each(response.familia, function(item) {
                        p_id_familia.append('<option value="'+item.Value+'">'+item.DisplayText+'</option>');
                    });
                    //    p_id_subfamilia.append('<option value="" selected>Seleccionar</option>');
                    //    _.each(response.subfamilia, function(item) {
                    //     p_id_subfamilia.append('<option value="'+item.Value+'">'+item.DisplayText+'</option>');
                    // });
                        p_id_marca.append('<option value="" selected>Seleccionar</option>');
                        _.each(response.marca, function(item) {
                        p_id_marca.append('<option value="'+item.Value+'">'+item.DisplayText+'</option>');
                    });
                         p_id_grupocontable.append('<option value="" selected>Seleccionar</option>');
                         _.each(response.grupocontable, function(item) {
                        p_id_grupocontable.append('<option value="'+item.Value+'">'+item.DisplayText+'</option>');
                    });
                }
            }, function() {
                getDataForm();
            });
        }
        getDataForm();

        $scope.type_cc = '';
        $scope.openCC = function(type) {
            $scope.type_cc = type;
            modalCC.modal('show');
            $('#search_cc').val('');
            $('#LoadRecordsButtonCC').click();
        };

        $scope.clearCC = function(type) {
            if (type === 1) {
                p_cc_debe.val('');
                p_cc_debe_txt.val('');
            } else {
                p_cc_haber.val('');
                p_cc_haber_txt.val('');
            }
        };

        var search = getFormSearch('frm-search-product', 'search_p', 'LoadRecordsButtonProduct');

        var table_container = $("#table_container_product");

        table_container.jtable({
            title: "Lista de Artículos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/articles/list',
                deleteAction: base_url + '/articles/delete'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search
                },{
                    cssClass: 'btn-primary',
                    text: '<i class="fa fa-file-excel-o"></i> Exportar a Excel',
                    click: function () {
                        $scope.openDoc('articles/excel', {});
                    }
                },{
                    cssClass: 'btn-danger-admin',
                    text: '<i class="fa fa-plus"></i> Nuevo Artículo',
                    click: function () {
                        newProduct();
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
                code_article: {
                    title:  'Código Artículo',
                    listClass:'text-center',
                    width: '2%'
                },
                description: {
                    title: 'Descripción'
                },
               
                code_matrix: {
                    title: 'Matriz del Artículo',
                    listClass:'text-center',
                    width: '3%'
                },

                state: {
                    title: 'Estado',
                    values: { 0: 'Inactivo', 1: 'Activo' },
                   type: 'checkbox',
                     listClass:'text-center',
                     width: '3%'
                },
               
                edit: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="edit-prod" data-id="'+data.record.id
                            +'" title="Editar"><i class="fa fa-edit fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function(event, data) {
                $('.edit-prod').click(function(e){
                    var id = $(this).attr('data-id');
                    findProduct(id);
                    e.preventDefault();
                });
           } 
        });

        generateSearchForm('frm-search-product', 'LoadRecordsButtonProduct', function(){
            table_container.jtable('load', {
                search: $('#search_p').val()
            });
        }, true);

        modalCC.on('hidden.bs.modal', function (e) {
            modalProduct.attr('style', 'display:block;');
        });
        modalCC.on('show.bs.modal', function (e) {
            modalProduct.attr('style', 'display:block; z-index:2030 !important');
        });

        var search_cc = getFormSearch('frm-search-cc', 'search_cc', 'LoadRecordsButtonCC');

        var table_container_cc = $("#table_container_cc");

        table_container_cc.jtable({
            title: "Lista de Cuentas Contables",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/articles/getCC'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_cc
                }]
            },
            fields: {
                IdCuenta: {
                    title: 'ID Cuenta',
                    width: '4%',
                },
                NombreCuenta: {
                    title: 'Cuenta'
                },
                select: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Seleccionar" class="select_cc" data-name="'+
                            data.record.NombreCuenta+'" data-code="'+data.record.IdCuenta+'"><i class="fa fa-'+
                            icon_select+' fa-1-5x"></i></a>';
                   }
                }
            },
            recordsLoaded: function(event, data) {
                $('.select_cc').click(function(e){
                    var code = $(this).attr('data-code');
                    var name_cc = $(this).attr('data-name');
                    if ($scope.type_cc === 1) {
                        p_cc_debe.val(code);
                        p_cc_debe_txt.val(name_cc);
                    } else {
                        p_cc_haber.val(code);
                        p_cc_haber_txt.val(name_cc);
                    }
                    modalCC.modal('hide');
                    e.preventDefault();
                });
            }
        });

         function cargartableMovAr2(){
             var search_cc22 = getFormSearch('frm-search-cc22', 'search_cc22', 'LoadRecordsButtonCC22');
         table_container_cc2 = $("#table_container_Register_Articulo");
        table_container_cc2.jtable({
            title: "Lista de Articulos",
            paging: true,
            sorting: true,
             cache: false,
            actions: {
                listAction: base_url + '/articles/get_articles_precios'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_cc22
                }]
            },
            fields: {
                idProducto: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                Codigo_Articulo: {
                    title: 'Código Articulo'
                },
                Producto: {
                   title: 'Producto'
                },
                Precio: {
                     title: 'Precio',
                     display: function (data) {
                            var newpre=Number(data.record.Precio);
                            return newpre.toFixed(2);
                        }
                },
                Cliente: {
                    title: 'Tipo Cliente'
                },
                Moneda: {
                    title: 'Moneda'
                },

                // costo: {
                //     title: 'costo'

                // },
                // select: {
                //     width: '1%',
                //     sorting: false,
                //     edit: false,
                //     create: false,
                //     listClass: 'text-center',
                //     display: function (data) {
                //         return '<a href="javascript:void(0)" title="Seleccionar" class="select_cc" data-costo="'+data.record.costo+'" data-name="'+
                //             data.record.description+'" data-type="'+data.record.type_id+'"  data-serie="'+data.record.serie+'" data-lote="'+data.record.lote+'" data-code="'+data.record.id+'"><i class="fa fa-'+
                //             icon_select+' fa-1-5x"></i></a>';
                //    }
                // }
            },
            recordsLoaded: function(event, data) {
                $('.select_cc').click(function(e){
                    var codigo = $(this).attr('data-code');
                    var descripcionArt = $(this).attr('data-name');
                    var idTipoArt = $(this).attr('data-type');
                    var serie = $(this).attr('data-serie');
                    var lote = $(this).attr('data-lote');
                    var costo = $(this).attr('data-costo');
                    seleccionarModal(codigo,descripcionArt,idTipoArt,serie,lote,costo); 
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-cc22', 'LoadRecordsButtonCC22', function(){
            table_container_cc2.jtable('load', {
                search: $('#search_cc22').val()
            });
        }, true);

        }


        generateSearchForm('frm-search-cc', 'LoadRecordsButtonCC', function(){
            table_container_cc.jtable('load', {
                search: $('#search_cc').val()
            });
        }, false);

         var search_cc2 = getFormSearch('frm-search-cc2', 'search_cc2', 'LoadRecordsButtonCC2');
        var table_container_cc2 = $("#table_container_cc2");
        table_container_cc2.jtable({
            title: "Lista de Articulos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/articles/getArticulosSelect'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_cc2
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                code_article: {
                    create: false,
                    edit: false,
                    list: false
                },
                description: {
                    title: 'Articulos'

                },
                select: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Seleccionar" class="select_cc" data-name="'+
                            data.record.description+'" data-code="'+data.record.code_article+'" data-id="'+data.record.id+'"><i class="fa fa-'+
                            icon_select+' fa-1-5x"></i></a>';
                   }
                }
            },
            recordsLoaded: function(event, data) {
                $('.select_cc').click(function(e){
                    var code = $(this).attr('data-code');
                    var name_cc = $(this).attr('data-name');
                    var id = $(this).attr('data-id');
                    var cantidad=1;
                    addToArticuloKitt(id,code, name_cc, cantidad);
                    modalCC.modal('hide');
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-cc2', 'LoadRecordsButtonCC2', function(){
            table_container_cc2.jtable('load', {
                search: $('#search_cc2').val()
            });
        }, false);

        function addToArticuloKitt(id,code, name_cc, cantidad){
            if ($('#tr_b_' + id).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asignó este Producto'
                });
                return false;
            }
            if(id==p_id.val()){
                AlertFactory.showWarning({
                    title: '',
                    message: 'Este Producto está en uso'
                });
                return false;
            };
            var tr = $('<tr id="tr_b_' + id + '"></tr>');
            var td1 = $('<td>' + code + '</td>');
            var td2 = $('<td>' + name_cc + '</td>');
            var td3 = $('<td></td>');
            var inp = $('<input type="hidden" class="id_p_kit" value="' + id + '" />');
            var inp2 = $('<input type="number" class="id_p_cantidad form-control input-sm" min="1"  value="' + cantidad + '" />');
            td1.append(inp);
            td3.append(inp2);
            var td4 = $('<td class="text-center"></td>');
            var btn = $('<button class="btn btn-danger btn-xs delkit" data-id="' + id + '" type="button"><span class="fa fa-trash"></span></button>');
            td4.append(btn);
            tr.append(td1).append(td2).append(td3).append(td4);
            articulo_kit_det.append(tr);
            modalArticulo.modal('hide');

            $('.delkit').click(function (e) {
                var idr = $(this).attr('data-id');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar este Articulo?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function () {
                    $('#tr_b_' + idr).remove();
                });
                e.preventDefault();
            }); 
        }

        $scope.openBrand = function() {
            modalBrand.modal('show');
            $('#search_brand').val('');
            $('#LoadRecordsButtonBrand').click();
        };

        modalBrand.on('hidden.bs.modal', function (e) {
            modalProduct.attr('style', 'display:block;');
        });
        modalBrand.on('show.bs.modal', function (e) {
            modalProduct.attr('style', 'display:block; z-index:2030 !important');
        });

        var search_brand = getFormSearch('frm-search-brand', 'search_brand', 'LoadRecordsButtonBrand');

        var table_container_brand = $("#table_container_brand");

        table_container_brand.jtable({
            title: "Lista de Marcas",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/articles/getBrands'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_brand
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                marca: {
                    title: 'Marca'
                },
                select: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" title="Seleccionar" class="select_brand" data-code="'+
                            data.record.id+'" data-title="'+data.record.marca+'"><i class="fa fa-'+icon_select+' fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function(event, data) {
                $('.select_brand').click(function(e){
                    var code = $(this).attr('data-code');
                    var description = $(this).attr('data-title');
                    addToBrand(code, description);
                    e.preventDefault();
                });
            }
        });

        generateSearchForm('frm-search-brand', 'LoadRecordsButtonBrand', function(){
            table_container_brand.jtable('load', {
                search: $('#search_brand').val()
            });
        }, false);

        function addToBrand(code, description)
        {
            if ($('#tr_b_'+code).length > 0) {
                AlertFactory.showWarning({
                    title: '',
                    message: 'Ya se asignó esta marca al artículo'
                });
                return false;
            }
            var tr = $('<tr id="tr_b_'+code+'"></tr>');
            var td1 = $('<td>'+description+'</td>');
            var inp = $('<input type="hidden" class="p_brand" value="'+code+'" />');
            td1.append(inp);
            var td2 = $('<td class="text-center"></td>');
            var btn = $('<button class="btn btn-danger btn-xs delBrand" data-id="'+code+'" type="button"><span class="fa fa-trash"></span></button>');
            td2.append(btn);
            tr.append(td1).append(td2);
            p_brand_body.append(tr);
            modalBrand.modal('hide');

            $('.delBrand').click(function(e){
                var code = $(this).attr('data-id');
                AlertFactory.confirm({
                    title: '',
                    message: '¿Está seguro que desea quitar esta marca?',
                    confirm: 'Si',
                    cancel: 'No'
                }, function(){
                    $('#tr_b_'+code).remove();
                });
                e.preventDefault();
            });
        }

        $('#modalCrop').on('show.bs.modal', function (e) {
            modalProduct.attr('style', 'display:block; z-index:2030 !important');
        });

        var module = '/articles/upload', image_url = '/img/products/';
        var i_width = 200, i_height = 150, i_radio = 4 / 3;

        var tCrop = setInterval(function(){
            if ($('#modalCrop').length > 0) {
                generateCrop(module, image_url, i_width, i_height, i_radio, 'p_image');
                clearInterval(tCrop);
            }
        }, 1000);
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('articles', {
                url: '/articles',
                templateUrl: base_url + '/templates/products/base.html',
                controller: 'ProductCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();