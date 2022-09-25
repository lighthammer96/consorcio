<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PMs
 */

Route::post('devolucionOrdenCompras/list', ['as' => 'devolucionOrdenCompras.list', 'uses' => 'DevolucionOrdenCompraController@all']);
Route::post('devolucionOrdenCompras/create', ['as' => 'devolucionOrdenCompras.create', 'uses' => 'DevolucionOrdenCompraController@create']);
Route::post('devolucionOrdenCompras/delete', ['as' => 'devolucionOrdenCompras.delete', 'uses' => 'DevolucionOrdenCompraController@destroy']);
Route::post('devolucionOrdenCompras/update', ['as' => 'devolucionOrdenCompras.update', 'uses' => 'DevolucionOrdenCompraController@update']);
Route::get('devolucionOrdenCompras/excel', ['as' => 'devolucionOrdenCompras.excel', 'uses' => 'DevolucionOrdenCompraController@excel']);

Route::get('devolucionOrdenCompras/data_formOrdenCompra', ['as' => 'devolucionOrdenCompras.data_formOrdenCompra', 'uses' => 'RegisterOrdenCompraController@getDataOrdenComprasRecepcion']); 

Route::get('devolucionOrdenCompras/getDetalle_ordenCompra/{id}', ['as' => 'devolucionOrdenCompras.getDetalle_ordenCompra', 'uses' => 'RegisterOrdenCompraController@getDetalle_ordenCompra']);



Route::get('devolucionOrdenCompras/data_formProfor', ['as' => 'devolucionOrdenCompras.data_formProfor', 'uses' => 'ProformaController@data_form']);

Route::get('devolucionOrdenCompras/get_venta_detalle_devolucionDevol/{id}', ['as' => 'devolucionOrdenCompras.get_venta_detalle_devolucionDevol', 'uses' => 'VentasController@get_venta_detalle_devolucion']);

Route::get('devolucionOrdenCompras/getDetalle_entradaDevol/{id}', ['as' => 'devolucionOrdenCompras.getDetalle_entradaDevol', 'uses' => 'ProformaController@getDetalle_entrada']);

Route::get('devolucionOrdenCompras/pdfDevol', 'Register_movementController@pdf');

Route::get('devolucionOrdenCompras/findDevol/{id}', ['as' => 'devolucionOrdenCompras.findDevol', 'uses' => 'Register_movementController@find']);

Route::get('devolucionOrdenCompras/validateLoteDevol/{id}', ['as' => 'devolucionOrdenCompras.validateLoteDevol', 'uses' => 'Register_movementController@validateLote']);

Route::get('devolucionOrdenCompras/validaDetalleDevol/{id}', ['as' => 'devolucionOrdenCompras.validaDetalleDevol', 'uses' => 'Register_movementController@validaDetalle']);

Route::get('devolucionOrdenCompras/procesarTransferenciaDevo/{id}', ['as' => 'devolucionOrdenCompras.procesarTransferenciaDevo', 'uses' => 'Register_movementController@procesarTransferencia']);

Route::get('devolucionOrdenCompras/getLocalizacionSelecDevol/{id}', ['as' => 'devolucionOrdenCompras.getLocalizacionSelecDevol', 'uses' => 'Register_movementController@getLocalizacionSelec']);

Route::get('devolucionOrdenCompras/getLocaStockDevol/{id}', ['as' => 'devolucionOrdenCompras.getLocaStockDevol', 'uses' => 'Register_movementController@getLocaStock']);

Route::get('devolucionOrdenCompras/deleteDetalleST/{id}', ['as' => 'devolucionOrdenCompras.deleteDetalleST', 'uses' => 'Register_movementController@deleteDetalleST']);

Route::get('devolucionOrdenCompras/valida_series_serveDevo/{id}', ['as' => 'devolucionOrdenCompras.valida_series_serveDevo', 'uses' => 'Register_movementController@valida_series_serve']);

Route::put('devolucionOrdenCompras/createserie_variosDevolu/{id}', ['as' => 'devolucionOrdenCompras.createserie_variosDevolu', 'uses' => 'SerieController@createUpdateVarios']);

Route::get('devolucionOrdenCompras/deleteDevol/{id}', ['as' => 'devolucionOrdenCompras.deleteDevol', 'uses' => 'Register_movementController@destroy']);
Route::get('devolucionOrdenCompras/validateCantSerieDevol/{id}', ['as' => 'devolucionOrdenCompras.validateCantSerieDevol', 'uses' => 'Register_movementController@validateCantSerie']);

Route::put('devolucionOrdenCompras/createLoteDevol/{id}', ['as' => 'devolucionOrdenCompras.createLoteDevol', 'uses' => 'LotController@createUpdate']);

Route::put('devolucionOrdenCompras/saveMovimientoDevo/{id}', ['as' => 'devolucionOrdenCompras.saveMovimientoDevo', 'uses' => 'Register_movementController@createUpdate']);

Route::post('devolucionOrdenCompras/get_notas_devolucionDevol', ['as' => 'devolucionOrdenCompras.get_notas_devolucionDevol', 'uses' => 'VentasController@get_notas_devolucion']);

Route::post('devolucionOrdenCompras/get_notas_devolucion_find', ['as' => 'devolucionOrdenCompras.get_notas_devolucion_find', 'uses' => 'VentasController@get_notas_devolucion_find']);

Route::get('devolucionOrdenCompras/data_formDevol', ['as' => 'devolucionOrdenCompras.data_formDevol', 'uses' => 'Register_movementController@data_form']);

Route::get('devolucionOrdenCompras/data_formDevolSeri', ['as' => 'devolucionOrdenCompras.data_formDevolSeri', 'uses' => 'SerieController@data_form']);

Route::post('devolucionOrdenCompras/getAllOper', 'OperationController@getAll'); 

Route::post('devolucionOrdenCompras/getAllUser', 'UserController@getAll');

Route::post('devolucionOrdenCompras/getArticulosSelectDevolu', ['as' => 'devolucionOrdenCompras.getArticulosSelectDevolu', 'uses' => 'ProductController@traeAll']);
Route::post('devolucionOrdenCompras/getArticulosMinKitDevol', ['as' => 'devolucionOrdenCompras.getArticulosMinKitDevol', 'uses' => 'ProductController@traeAllMinKit']);

Route::post('devolucionOrdenCompras/getProductoSerie', ['as' => 'devolucionOrdenCompras.getProductoSerie', 'uses' => 'SerieController@traerSeries']);

Route::post('devolucionOrdenCompras/getProductoSerieStock', ['as' => 'devolucionOrdenCompras.getProductoSerieStock', 'uses' => 'SerieController@traerSeriesStock']);

Route::put('devolucionOrdenCompras/saveEntrega/{id}', ['as' => 'devolucionOrdenCompras.saveEntrega', 'uses' => 'Entrega_servicesTecnicoController@createUpdate']);

