<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('devolucion_servicesTecnicos/list', ['as' => 'devolucion_servicesTecnicos.list', 'uses' => 'Devolucion_servicesTecnicoController@all']);
Route::post('devolucion_servicesTecnicos/create', ['as' => 'devolucion_servicesTecnicos.create', 'uses' => 'Devolucion_servicesTecnicoController@create']);
Route::post('devolucion_servicesTecnicos/delete', ['as' => 'devolucion_servicesTecnicos.delete', 'uses' => 'Devolucion_servicesTecnicoController@destroy']);
Route::post('devolucion_servicesTecnicos/update', ['as' => 'devolucion_servicesTecnicos.update', 'uses' => 'Devolucion_servicesTecnicoController@update']);
Route::get('devolucion_servicesTecnicos/excel', ['as' => 'devolucion_servicesTecnicos.excel', 'uses' => 'Devolucion_servicesTecnicoController@excel']);

Route::get('devolucion_servicesTecnicos/data_formProfor', ['as' => 'devolucion_servicesTecnicos.data_formProfor', 'uses' => 'ProformaController@data_form']);

Route::get('devolucion_servicesTecnicos/get_venta_detalle_devolucionDevol/{id}', ['as' => 'devolucion_servicesTecnicos.get_venta_detalle_devolucionDevol', 'uses' => 'VentasController@get_venta_detalle_devolucion']);

Route::get('devolucion_servicesTecnicos/getDetalle_entradaDevol/{id}', ['as' => 'devolucion_servicesTecnicos.getDetalle_entradaDevol', 'uses' => 'ProformaController@getDetalle_entrada']);

Route::get('devolucion_servicesTecnicos/pdfDevol', 'Register_movementController@pdf');

Route::get('devolucion_servicesTecnicos/findDevol/{id}', ['as' => 'devolucion_servicesTecnicos.findDevol', 'uses' => 'Register_movementController@find']);

Route::get('devolucion_servicesTecnicos/validateLoteDevol/{id}', ['as' => 'devolucion_servicesTecnicos.validateLoteDevol', 'uses' => 'Register_movementController@validateLote']);

Route::get('devolucion_servicesTecnicos/validaDetalleDevol/{id}', ['as' => 'devolucion_servicesTecnicos.validaDetalleDevol', 'uses' => 'Register_movementController@validaDetalle']);

Route::get('devolucion_servicesTecnicos/procesarTransferenciaDevo/{id}', ['as' => 'devolucion_servicesTecnicos.procesarTransferenciaDevo', 'uses' => 'Register_movementController@procesarTransferencia']);

Route::get('devolucion_servicesTecnicos/getLocalizacionSelecDevol/{id}', ['as' => 'devolucion_servicesTecnicos.getLocalizacionSelecDevol', 'uses' => 'Register_movementController@getLocalizacionSelec']);

Route::get('devolucion_servicesTecnicos/getLocaStockDevol/{id}', ['as' => 'devolucion_servicesTecnicos.getLocaStockDevol', 'uses' => 'Register_movementController@getLocaStock']);

Route::get('devolucion_servicesTecnicos/deleteDetalleST/{id}', ['as' => 'devolucion_servicesTecnicos.deleteDetalleST', 'uses' => 'Register_movementController@deleteDetalleST']);

Route::get('devolucion_servicesTecnicos/valida_series_serveDevo/{id}', ['as' => 'devolucion_servicesTecnicos.valida_series_serveDevo', 'uses' => 'Register_movementController@valida_series_serve']);

Route::put('devolucion_servicesTecnicos/createserie_variosDevolu/{id}', ['as' => 'devolucion_servicesTecnicos.createserie_variosDevolu', 'uses' => 'SerieController@createUpdateVarios']);

Route::get('devolucion_servicesTecnicos/deleteDevol/{id}', ['as' => 'devolucion_servicesTecnicos.deleteDevol', 'uses' => 'Register_movementController@destroy']);
Route::get('devolucion_servicesTecnicos/validateCantSerieDevol/{id}', ['as' => 'devolucion_servicesTecnicos.validateCantSerieDevol', 'uses' => 'Register_movementController@validateCantSerie']);

Route::put('devolucion_servicesTecnicos/createLoteDevol/{id}', ['as' => 'devolucion_servicesTecnicos.createLoteDevol', 'uses' => 'LotController@createUpdate']);

Route::put('devolucion_servicesTecnicos/saveMovimientoDevo/{id}', ['as' => 'devolucion_servicesTecnicos.saveMovimientoDevo', 'uses' => 'Register_movementController@createUpdate']);

Route::post('devolucion_servicesTecnicos/get_notas_devolucionDevol', ['as' => 'devolucion_servicesTecnicos.get_notas_devolucionDevol', 'uses' => 'VentasController@get_notas_devolucion']);

Route::post('devolucion_servicesTecnicos/get_notas_devolucion_find', ['as' => 'devolucion_servicesTecnicos.get_notas_devolucion_find', 'uses' => 'VentasController@get_notas_devolucion_find']);

Route::get('devolucion_servicesTecnicos/data_formDevol', ['as' => 'devolucion_servicesTecnicos.data_formDevol', 'uses' => 'Register_movementController@data_form']);

Route::get('devolucion_servicesTecnicos/data_formDevolSeri', ['as' => 'devolucion_servicesTecnicos.data_formDevolSeri', 'uses' => 'SerieController@data_form']);

Route::post('devolucion_servicesTecnicos/getAllOper', 'OperationController@getAll'); 

Route::post('devolucion_servicesTecnicos/getAllUser', 'UserController@getAll');

Route::post('devolucion_servicesTecnicos/getArticulosSelectDevolu', ['as' => 'devolucion_servicesTecnicos.getArticulosSelectDevolu', 'uses' => 'ProductController@traeAll']);
Route::post('devolucion_servicesTecnicos/getArticulosMinKitDevol', ['as' => 'devolucion_servicesTecnicos.getArticulosMinKitDevol', 'uses' => 'ProductController@traeAllMinKit']);

Route::post('devolucion_servicesTecnicos/getProductoSerie', ['as' => 'devolucion_servicesTecnicos.getProductoSerie', 'uses' => 'SerieController@traerSeries']);

Route::post('devolucion_servicesTecnicos/getProductoSerieStock', ['as' => 'devolucion_servicesTecnicos.getProductoSerieStock', 'uses' => 'SerieController@traerSeriesStock']);

Route::put('devolucion_servicesTecnicos/saveEntrega/{id}', ['as' => 'devolucion_servicesTecnicos.saveEntrega', 'uses' => 'Entrega_servicesTecnicoController@createUpdate']);

