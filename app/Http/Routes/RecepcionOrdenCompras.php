<?php
/**
 * Created by PhpStorm.
 * User: JAIR 
 * Date: 4/5/2017
 * Time: 6:59 PM
 */
 
// Route::post('recepcionOrdenCompras/list', ['as' => 'recepcionOrdenCompras.list', 'uses' => 'Entrega_servicesTecnicoController@all']);//borrar

Route::post('recepcionOrdenCompras/list', ['as' => 'recepcionOrdenCompras.list', 'uses' => 'RecepcionOrdenCompraController@all']);


Route::post('recepcionOrdenCompras/create', ['as' => 'recepcionOrdenCompras.create', 'uses' => 'Entrega_servicesTecnicoController@create']);
Route::post('recepcionOrdenCompras/delete', ['as' => 'recepcionOrdenCompras.delete', 'uses' => 'Entrega_servicesTecnicoController@destroy']);
Route::post('recepcionOrdenCompras/update', ['as' => 'recepcionOrdenCompras.update', 'uses' => 'Entrega_servicesTecnicoController@update']);
Route::get('recepcionOrdenCompras/excel', ['as' => 'recepcionOrdenCompras.excel', 'uses' => 'RecepcionOrdenCompraController@excel']);



Route::put('recepcionOrdenCompras/saveEntrega/{id}', ['as' => 'recepcionOrdenCompras.saveEntrega', 'uses' => 'Entrega_servicesTecnicoController@createUpdate']);




Route::get('recepcionOrdenCompras/data_formRegi', ['as' => 'recepcionOrdenCompras.data_formRegi', 'uses' => 'Entrega_servicesTecnicoController@data_form']);
Route::post('recepcionOrdenCompras/get_ventas_entrega', ['as' => 'recepcionOrdenCompras.get_ventas_entrega', 'uses' => 'Entrega_servicesTecnicoController@get_ventas_entrega']);

Route::get('recepcionOrdenCompras/get_venta_detalle/{id}', ['as' => 'recepcionOrdenCompras.get_venta_detalle', 'uses' => 'Entrega_servicesTecnicoController@get_venta_detalle']);

Route::get('recepcionOrdenCompras/data_formOrdenCompra', ['as' => 'recepcionOrdenCompras.data_formOrdenCompra', 'uses' => 'RegisterOrdenCompraController@getDataOrdenComprasRecepcion']); 

Route::get('recepcionOrdenCompras/deleteDetalleST/{id}', ['as' => 'recepcionOrdenCompras.deleteDetalleST', 'uses' => 'Register_movementController@deleteDetalleST']);


Route::get('recepcionOrdenCompras/getDetalle_entradaProf/{id}', ['as' => 'recepcionOrdenCompras.getDetalle_entradaProf', 'uses' => 'ProformaController@getDetalle_entrada']);//borrar

Route::get('recepcionOrdenCompras/getDetalle_ordenCompra/{id}', ['as' => 'recepcionOrdenCompras.getDetalle_ordenCompra', 'uses' => 'RegisterOrdenCompraController@getDetalle_ordenCompra']);

Route::get('recepcionOrdenCompras/pdfMovemen', 'Register_movementController@pdf');

Route::get('recepcionOrdenCompras/findMovement/{id}', ['as' => 'recepcionOrdenCompras.findMovement', 'uses' => 'Register_movementController@find']);

Route::get('recepcionOrdenCompras/validateLoteMovement/{id}', ['as' => 'recepcionOrdenCompras.validateLoteMovement', 'uses' => 'Register_movementController@validateLote']);


Route::get('recepcionOrdenCompras/validaDetalleMovement/{id}', ['as' => 'recepcionOrdenCompras.validaDetalleMovement', 'uses' => 'Register_movementController@validaDetalle']);

Route::get('recepcionOrdenCompras/procesarTransferenciaMovement/{id}', ['as' => 'recepcionOrdenCompras.procesarTransferenciaMovement', 'uses' => 'Register_movementController@procesarTransferencia']);

Route::get('recepcionOrdenCompras/getKitMovement/{id}', ['as' => 'recepcionOrdenCompras.getKitMovement', 'uses' => 'Register_movementController@getKit']);

Route::get('recepcionOrdenCompras/getLocalizacionSelecMovement/{id}', ['as' => 'recepcionOrdenCompras.getLocalizacionSelecMovement', 'uses' => 'Register_movementController@getLocalizacionSelec']);


Route::get('recepcionOrdenCompras/getLocaStockMovement/{id}', ['as' => 'recepcionOrdenCompras.getLocaStockMovement', 'uses' => 'Register_movementController@getLocaStock']);

Route::get('recepcionOrdenCompras/valida_series_serve/{id}', ['as' => 'recepcionOrdenCompras.valida_series_serve', 'uses' => 'Register_movementController@valida_series_serve']);

Route::post('recepcionOrdenCompras/getAllOperation', 'OperationController@getAll'); 

Route::post('recepcionOrdenCompras/getAllUsers', 'UserController@getAll');

Route::post('recepcionOrdenCompras/getArticulosSelect', ['as' => 'recepcionOrdenCompras.getArticulosSelect', 'uses' => 'ProductController@traeAll']);

Route::post('recepcionOrdenCompras/getArticulosMinKit', ['as' => 'recepcionOrdenCompras.getArticulosMinKit', 'uses' => 'ProductController@traeAllMinKit']);

Route::post('recepcionOrdenCompras/getProductoSerie', ['as' => 'recepcionOrdenCompras.getProductoSerie', 'uses' => 'SerieController@traerSeries']);

Route::post('recepcionOrdenCompras/getProductoSerieStock', ['as' => 'recepcionOrdenCompras.getProductoSerieStock', 'uses' => 'SerieController@traerSeriesStock']);

Route::get('recepcionOrdenCompras/deleteMovement/{id}', ['as' => 'recepcionOrdenCompras.deleteMovement', 'uses' => 'Register_movementController@destroy']);

Route::get('recepcionOrdenCompras/validateCantSerieMovement/{id}', ['as' => 'recepcionOrdenCompras.validateCantSerieMovement', 'uses' => 'Register_movementController@validateCantSerie']);

// Route::put('recepcionOrdenCompras/saveMovimientoMovement/{id}', ['as' => 'recepcionOrdenCompras.saveMovimientoMovement', 'uses' => 'Register_movementController@createUpdate']);