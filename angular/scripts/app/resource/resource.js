/**
 * Created by JAIR on 4/7/2017.
 */
(function () {
    'use strict';
    angular.module('sys.app.resources')
        .config(Config)
        .controller('ResourceCtrl', ResourceCtrl);

    Config.$inject = ['$stateProvider', '$urlRouterProvider'];
    ResourceCtrl.$inject = ['$scope', '_', 'RESTService', '$rootScope', 'AlertFactory', 'Notify'];

    function ResourceCtrl($scope, _, RESTService, $rootScope, AlertFactory, Notify)
    {
        var treeViewResource = $('#treeViewResource');
        var modalP = $('#modalP');
        var show_product = $('#show_product');

        var pr_code_matriz = $('#pr_code_matriz');
        var pr_code_article = $('#pr_code_article');
        var pr_description_detail = $('#pr_description_detail');
        var pr_unity = $('#pr_unity');
        var pr_type = $('#pr_type');
        var pr_retention = $('#pr_retention');
        var pr_level1 = $('#pr_level1');
        var pr_level2 = $('#pr_level2');
        var pr_level3 = $('#pr_level3');
        var pr_level4 = $('#pr_level4');
        var pr_debe = $('#pr_debe');
        var pr_haber = $('#pr_haber');
        var pr_d_created = $('#pr_d_created');
        var pr_u_created = $('#pr_u_created');
        var pr_d_updated = $('#pr_d_updated');
        var pr_u_updated = $('#pr_u_updated');

        var level_parent = '';
        var level_parent_txt = '';

        function getData() {
            RESTService.all('resources/getLevels', '', function(response) {
                if (!_.isUndefined(response.status) && response.status) {
                    createTree(response.Data, 'tree_view', 'treeViewResource', function() {
                        $('#treeViewResource').treed({
                            openedClass:'glyphicon-folder-open',
                            closedClass:'glyphicon-folder-close'
                        });
                        $('.level-tree').click(function(e){
                            var hasOpen = $(this).parent().find('i').hasClass('glyphicon-folder-open');
                            if (hasOpen) {
                                var id = $(this).attr('id');
                                id = id.substr(5);
                                clickTree(id);
                            }
                            e.preventDefault();
                        });
                        $('.add-lp').click(function(e){
                            var id = $(this).attr('data-id');
                            var title = $(this).attr('data-title');
                            $('#modal-title-product').html('Seleccionar artículos para Nivel: '+title);
                            level_parent = id;
                            level_parent_txt = title;
                            modalP.modal('show');
                            $('#search_p').val('');
                            LoadRecordsButtonP.click();
                            $(this).closest('li').click();
                            e.preventDefault();
                        });
                    });
                } else {
                    getData();
                }
            });
        }
        getData();

        function clickTree(id) {
            var ul_level = $('.ul_level'+id);
            ul_level.addClass('hide');
            RESTService.get('resources/getProductsLevel', id, function(response){
                if (!_.isUndefined(response.status) && response.status) {
                    ul_level.html('');
                    _.each(response.Data, function(prod) {
                        ul_level.append('<li><a class="product_tree"  style="color:#555" id="product'+prod.id+'" href="javascript:void(0)">'+prod.text+'</a></li');
                        var product = $('#product'+prod.id);
                        // var width = getTextWidth(prod.text, "bold 11pt open sans");
                        product.addClass('text-cut');
                    });
                    ul_level.removeClass('hide');
                    $('.product_tree').click(function(e){
                        $('.tree_element_select').removeClass('tree_element_select');
                        var id = $(this).attr('id');
                        id = id.substr(7);
                        addActive(id);
                        clickProduct(id);
                        e.preventDefault();
                    });
                    if (product_show !== '') {
                        addActive(product_show);
                    }
                }
            });
        }

        function addActive(id)
        {
            var product_s = $('#product'+id);
            // var txt = product_s.text();
            // var width = getTextWidth(txt, "bold 13pt open sans") + 8;
            product_s.addClass('tree_element_select');
        }

        var product_show = '';
        function clickProduct(id) {// alert(id);
            cleanProduct();
            RESTService.get('resources/getProduct', id, function(response){
                if (!_.isUndefined(response.status) && response.status) {
                    show_product.removeClass('hide');
                    product_show = id;
                    var data_p = response.data;
                    pr_code_matriz.val(data_p.matrix);
                    pr_code_article.val(data_p.code);
                    pr_description_detail.val(data_p.description_detail);
                    pr_unity.val(data_p.unity);
                    pr_type.val(data_p.type);
                    pr_retention.val(data_p.retention);
                    pr_level1.val(data_p.level1);
                    pr_level2.val(data_p.level2);
                    pr_level3.val(data_p.level3);
                    pr_level4.val(data_p.level4);
                    pr_debe.val(data_p.cc_debe);
                    pr_haber.val(data_p.cc_haber);
                    pr_d_created.val(data_p.created_d);
                    pr_u_created.val(data_p.created_u);
                    pr_d_updated.val(data_p.updated_d);
                    pr_u_updated.val(data_p.updated_u);
                } else {
                    AlertFactory.textType({
                        title: '',
                        message: 'Hubo un error al obtener el artículo. Intente nuevamente.',
                        type: 'error'
                    });
                }
            });
        }

        function cleanProduct()
        {
            product_show = '';
            show_product.addClass('hide');
            show_product.find('input').val('');
            show_product.find('textarea').val('');
        }

        var search_p = getFormSearch('frm-search-p', 'search_p', 'LoadRecordsButtonP');

        var table_container_p = $("#table_container_p");

        table_container_p.jtable({
            title: "Lista de Artículos",
            paging: true,
            sorting: true,
            actions: {
                listAction: base_url + '/resources/getProductsSM'
            },
            toolbar: {
                items: [{
                    cssClass: 'buscador',
                    text: search_p
                }]
            },
            fields: {
                id: {
                    key: true,
                    create: false,
                    edit: false,
                    list: false
                },
                description_detail: {
                    title: 'Descripción'
                },
                select: {
                    width: '1%',
                    sorting: false,
                    edit: false,
                    create: false,
                    listClass: 'text-center',
                    display: function (data) {
                        return '<a href="javascript:void(0)" class="join-prod" data-id="' + data.record.id
                            + '" title="Asociar"><i class="fa fa-'+icon_select+' fa-1-5x"></i></a>';
                    }
                }
            },
            recordsLoaded: function(event, data) {
                $('.join-prod').click(function(e){
                    var id = $(this).attr('data-id');
                    joinProduct(id);
                    e.preventDefault();
                });
            }
        });
        generateSearchForm('frm-search-p', 'LoadRecordsButtonP', function () {
            table_container_p.jtable('load', {
                search: $('#search_p').val()
            });
        }, false);

        function joinProduct(id)
        {
            AlertFactory.prompt({
                title: 'Asociar el artículo al nivel ' + level_parent_txt,
                message: '',
                confirm: 'Si',
                cancel: 'No',
                closeOnConfirm: false,
                placeholder: 'Ingrese el código de matriz',
                showLoaderOnConfirm: true,
                error_message: 'Debe ingresar el código de matriz'
            }, function(code_matrix) {
                var params = {
                    'level_id': level_parent,
                    'product_id': id,
                    'code': code_matrix
                };
                RESTService.updated('resources/associate', 0, params, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El artículo se asoció correctamente.',
                            type: 'success'
                        });
                        clickTree(level_parent);
                        clickProduct(id);
                        modalP.modal('hide');
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al asociar el artículo. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
            });
        }

        $scope.disassociate = function()
        {
            AlertFactory.confirm({
                title: '',
                message: '¿Está seguro que desea desasociar este artículo?',
                confirm: 'Si',
                cancel: 'No'
            }, function() {
                RESTService.updated('resources/disassociate', product_show, {}, function(response) {
                    if (!_.isUndefined(response.status) && response.status) {
                        AlertFactory.textType({
                            title: '',
                            message: 'El artículo se desasoció correctamente.',
                            type: 'success'
                        });
                        $('#product'+product_show).parent().remove();
                        cleanProduct();
                    } else {
                        AlertFactory.textType({
                            title: '',
                            message: 'Hubo un error al desasociar el artículo. Intente nuevamente.',
                            type: 'error'
                        });
                    }
                });
            });

        };
    }

    function Config($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('resources', {
                url: '/resources',
                templateUrl: base_url + '/templates/resources/base.html',
                controller: 'ResourceCtrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})
();