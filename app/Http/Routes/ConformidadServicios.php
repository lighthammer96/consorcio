<?php
/**
 * Created by PhpStorm.
 * User: JAIR 
 * Date: 4/5/2017
 * Time: 6:59 PM
 */
 
// Route::post('conformidadServicios/list', ['as' => 'conformidadServicios.list', 'uses' => 'Entrega_servicesTecnicoController@all']);//borrar

Route::post('conformidadServicios/list', ['as' => 'conformidadServicios.list', 'uses' => 'ConformidadServicioController@all']);


Route::post('conformidadServicios/create', ['as' => 'conformidadServicios.create', 'uses' => 'Entrega_servicesTecnicoController@create']);
Route::post('conformidadServicios/delete', ['as' => 'conformidadServicios.delete', 'uses' => 'Entrega_servicesTecnicoController@destroy']);
Route::post('conformidadServicios/update', ['as' => 'conformidadServicios.update', 'uses' => 'Entrega_servicesTecnicoController@update']);
Route::get('conformidadServicios/excel', ['as' => 'conformidadServicios.excel', 'uses' => 'ConformidadServicioController@excel']);



Route::put('conformidadServicios/saveEntrega/{id}', ['as' => 'conformidadServicios.saveEntrega', 'uses' => 'Entrega_servicesTecnicoController@createUpdate']);




Route::get('conformidadServicios/data_formRegi', ['as' => 'conformidadServicios.data_formRegi', 'uses' => 'Entrega_servicesTecnicoController@data_form']);
Route::post('conformidadServicios/get_ventas_entrega', ['as' => 'conformidadServicios.get_ventas_entrega', 'uses' => 'Entrega_servicesTecnicoController@get_ventas_entrega']);

Route::get('conformidadServicios/get_venta_detalle/{id}', ['as' => 'conformidadServicios.get_venta_detalle', 'uses' => 'Entrega_servicesTecnicoController@get_venta_detalle']);

Route::get('conformidadServicios/data_formOrdenCompra', ['as' => 'conformidadServicios.data_formOrdenCompra', 'uses' => 'RegisterOrdenCompraController@getDataOrdenComprasRecepcion']); 

Route::get('conformidadServicios/deleteDetalleST/{id}', ['as' => 'conformidadServicios.deleteDetalleST', 'uses' => 'Register_movementController@deleteDetalleST']);


Route::get('conformidadServicios/getDetalle_entradaProf/{id}', ['as' => 'conformidadServicios.getDetalle_entradaProf', 'uses' => 'ProformaController@getDetalle_entrada']);//borrar

Route::get('conformidadServicios/getDetalle_ordenCompra/{id}', ['as' => 'conformidadServicios.getDetalle_ordenCompra', 'uses' => 'RegisterOrdenCompraController@getDetalle_ordenCompra']);

Route::get('conformidadServicios/pdfMovemen', 'Register_movementController@pdf');

Route::get('conformidadServicios/findMovement/{id}', ['as' => 'conformidadServicios.findMovement', 'uses' => 'Register_movementController@find']);

Route::get('conformidadServicios/validateLoteMovement/{id}', ['as' => 'conformidadServicios.validateLoteMovement', 'uses' => 'Register_movementController@validateLote']);


Route::get('conformidadServicios/validaDetalleMovement/{id}', ['as' => 'conformidadServicios.validaDetalleMovement', 'uses' => 'Register_movementController@validaDetalle']);

Route::get('conformidadServicios/procesarTransferenciaMovement/{id}', ['as' => 'conformidadServicios.procesarTransferenciaMovement', 'uses' => 'Register_movementController@procesarTransferencia']);

Route::get('conformidadServicios/getKitMovement/{id}', ['as' => 'conformidadServicios.getKitMovement', 'uses' => 'Register_movementController@getKit']);

Route::get('conformidadServicios/getLocalizacionSelecMovement/{id}', ['as' => 'conformidadServicios.getLocalizacionSelecMovement', 'uses' => 'Register_movementController@getLocalizacionSelec']);


Route::get('conformidadServicios/getLocaStockMovement/{id}', ['as' => 'conformidadServicios.getLocaStockMovement', 'uses' => 'Register_movementController@getLocaStock']);

Route::get('conformidadServicios/valida_series_serve/{id}', ['as' => 'conformidadServicios.valida_series_serve', 'uses' => 'Register_movementController@valida_series_serve']);

Route::post('conformidadServicios/getAllOperation', 'OperationController@getAll'); 

Route::post('conformidadServicios/getAllUsers', 'UserController@getAll');

Route::post('conformidadServicios/getArticulosSelect', ['as' => 'conformidadServicios.getArticulosSelect', 'uses' => 'ProductController@traeAll']);

Route::post('conformidadServicios/getArticulosMinKit', ['as' => 'conformidadServicios.getArticulosMinKit', 'uses' => 'ProductController@traeAllMinKit']);

Route::post('conformidadServicios/getProductoSerie', ['as' => 'conformidadServicios.getProductoSerie', 'uses' => 'SerieController@traerSeries']);

Route::post('conformidadServicios/getProductoSerieStock', ['as' => 'conformidadServicios.getProductoSerieStock', 'uses' => 'SerieController@traerSeriesStock']);

Route::get('conformidadServicios/deleteMovement/{id}', ['as' => 'conformidadServicios.deleteMovement', 'uses' => 'Register_movementController@destroy']);

Route::get('conformidadServicios/validateCantSerieMovement/{id}', ['as' => 'conformidadServicios.validateCantSerieMovement', 'uses' => 'Register_movementController@validateCantSerie']);

// Route::put('conformidadServicios/saveMovimientoMovement/{id}', ['as' => 'conformidadServicios.saveMovimientoMovement', 'uses' => 'Register_movementController@createUpdate']);