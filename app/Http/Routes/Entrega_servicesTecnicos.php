<?php
/**
 * Created by PhpStorm.
 * User: JAIR 
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('entrega_servicesTecnicos/list', ['as' => 'entrega_servicesTecnicos.list', 'uses' => 'Entrega_servicesTecnicoController@all']);
Route::post('entrega_servicesTecnicos/create', ['as' => 'entrega_servicesTecnicos.create', 'uses' => 'Entrega_servicesTecnicoController@create']);
Route::post('entrega_servicesTecnicos/delete', ['as' => 'entrega_servicesTecnicos.delete', 'uses' => 'Entrega_servicesTecnicoController@destroy']);
Route::post('entrega_servicesTecnicos/update', ['as' => 'entrega_servicesTecnicos.update', 'uses' => 'Entrega_servicesTecnicoController@update']);
Route::get('entrega_servicesTecnicos/excel', ['as' => 'entrega_servicesTecnicos.excel', 'uses' => 'Entrega_servicesTecnicoController@excel']);
Route::put('entrega_servicesTecnicos/saveEntrega/{id}', ['as' => 'entrega_servicesTecnicos.saveEntrega', 'uses' => 'Entrega_servicesTecnicoController@createUpdate']);

Route::get('entrega_servicesTecnicos/data_formRegi', ['as' => 'entrega_servicesTecnicos.data_formRegi', 'uses' => 'Entrega_servicesTecnicoController@data_form']);
Route::post('entrega_servicesTecnicos/get_ventas_entrega', ['as' => 'entrega_servicesTecnicos.get_ventas_entrega', 'uses' => 'Entrega_servicesTecnicoController@get_ventas_entrega']);

Route::get('entrega_servicesTecnicos/get_venta_detalle/{id}', ['as' => 'entrega_servicesTecnicos.get_venta_detalle', 'uses' => 'Entrega_servicesTecnicoController@get_venta_detalle']);

Route::get('entrega_servicesTecnicos/data_formProf', ['as' => 'entrega_servicesTecnicos.data_formProf', 'uses' => 'ProformaController@data_form']);

Route::get('entrega_servicesTecnicos/deleteDetalleST/{id}', ['as' => 'entrega_servicesTecnicos.deleteDetalleST', 'uses' => 'Register_movementController@deleteDetalleST']);


Route::get('entrega_servicesTecnicos/getDetalle_entradaProf/{id}', ['as' => 'entrega_servicesTecnicos.getDetalle_entradaProf', 'uses' => 'ProformaController@getDetalle_entrada']);

Route::get('entrega_servicesTecnicos/pdfMovemen', 'Register_movementController@pdf');

Route::get('entrega_servicesTecnicos/findMovement/{id}', ['as' => 'entrega_servicesTecnicos.findMovement', 'uses' => 'Register_movementController@find']);

Route::get('entrega_servicesTecnicos/validateLoteMovement/{id}', ['as' => 'entrega_servicesTecnicos.validateLoteMovement', 'uses' => 'Register_movementController@validateLote']);


Route::get('entrega_servicesTecnicos/validaDetalleMovement/{id}', ['as' => 'entrega_servicesTecnicos.validaDetalleMovement', 'uses' => 'Register_movementController@validaDetalle']);

Route::get('entrega_servicesTecnicos/procesarTransferenciaMovement/{id}', ['as' => 'entrega_servicesTecnicos.procesarTransferenciaMovement', 'uses' => 'Register_movementController@procesarTransferencia']);

Route::get('entrega_servicesTecnicos/getKitMovement/{id}', ['as' => 'entrega_servicesTecnicos.getKitMovement', 'uses' => 'Register_movementController@getKit']);

Route::get('entrega_servicesTecnicos/getLocalizacionSelecMovement/{id}', ['as' => 'entrega_servicesTecnicos.getLocalizacionSelecMovement', 'uses' => 'Register_movementController@getLocalizacionSelec']);


Route::get('entrega_servicesTecnicos/getLocaStockMovement/{id}', ['as' => 'entrega_servicesTecnicos.getLocaStockMovement', 'uses' => 'Register_movementController@getLocaStock']);

Route::get('entrega_servicesTecnicos/valida_series_serve/{id}', ['as' => 'entrega_servicesTecnicos.valida_series_serve', 'uses' => 'Register_movementController@valida_series_serve']);

Route::post('entrega_servicesTecnicos/getAllOperation', 'OperationController@getAll'); 

Route::post('entrega_servicesTecnicos/getAllUsers', 'UserController@getAll');

Route::post('entrega_servicesTecnicos/getArticulosSelect', ['as' => 'entrega_servicesTecnicos.getArticulosSelect', 'uses' => 'ProductController@traeAll']);

Route::post('entrega_servicesTecnicos/getArticulosMinKit', ['as' => 'entrega_servicesTecnicos.getArticulosMinKit', 'uses' => 'ProductController@traeAllMinKit']);

Route::post('entrega_servicesTecnicos/getProductoSerie', ['as' => 'entrega_servicesTecnicos.getProductoSerie', 'uses' => 'SerieController@traerSeries']);

Route::post('entrega_servicesTecnicos/getProductoSerieStock', ['as' => 'entrega_servicesTecnicos.getProductoSerieStock', 'uses' => 'SerieController@traerSeriesStock']);

Route::get('entrega_servicesTecnicos/deleteMovement/{id}', ['as' => 'entrega_servicesTecnicos.deleteMovement', 'uses' => 'Register_movementController@destroy']);

Route::get('entrega_servicesTecnicos/validateCantSerieMovement/{id}', ['as' => 'entrega_servicesTecnicos.validateCantSerieMovement', 'uses' => 'Register_movementController@validateCantSerie']);

Route::put('entrega_servicesTecnicos/saveMovimientoMovement/{id}', ['as' => 'entrega_servicesTecnicos.saveMovimientoMovement', 'uses' => 'Register_movementController@createUpdate']);