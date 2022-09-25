<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('guiaRemisions/list', ['as' => 'guiaRemisions.list', 'uses' => 'Register_movementController@all']);
Route::post('guiaRemisions/create', ['as' => 'guiaRemisions.create', 'uses' => 'Register_movementController@create']);
Route::get('guiaRemisions/delete/{id}', ['as' => 'guiaRemisions.delete', 'uses' => 'Register_movementController@destroy']);
Route::post('guiaRemisions/update', ['as' => 'guiaRemisions.update', 'uses' => 'Register_movementController@update']);
Route::get('guiaRemisions/excel', ['as' => 'guiaRemisions.excel', 'uses' => 'GuiaRemisionController@excel']);

Route::get('guiaRemisions/procesarTransferencia/{id}', ['as' => 'register_transfers.procesarTransferencia', 'uses' => 'Register_movementController@procesarTransferencia']);

Route::get('guiaRemisions/data_form', ['as' => 'guiaRemisions.data_form', 'uses' => 'Register_movementController@data_form']);

Route::get('guiaRemisions/data_formGuia', ['as' => 'guiaRemisions.data_formGuia', 'uses' => 'GuiaRemisionController@data_formGuia']);

Route::put('guiaRemisions/saveMovimiento/{id}', ['as' => 'guiaRemisions.saveMovimiento', 'uses' => 'Register_movementController@createUpdate']);

Route::get('guiaRemisions/getKit/{id}', ['as' => 'guiaRemisions.getKit', 'uses' => 'Register_movementController@getKit']);

Route::get('guiaRemisions/getLocalizacionSelec/{id}', ['as' => 'guiaRemisions.getLocalizacionSelec', 'uses' => 'Register_movementController@getLocalizacionSelec']);

// Route::get('guiaRemisions/getStockLoc/{id}', ['as' => 'guiaRemisions.getStockLoc', 'uses' => 'Register_movementController@getStockLoc']);

Route::get('guiaRemisions/getLocaStock/{id}', ['as' => 'guiaRemisions.getLocaStock', 'uses' => 'Register_movementController@getLocaStock']);

Route::post('guiaRemisions/getArticulosSelect', ['as' => 'guiaRemisions.getArticulosSelect', 'uses' => 'ProductController@traeAll']);


Route::post('guiaRemisions/getArticulosSelectSerie', ['as' => 'guiaRemisions.getArticulosSelectSerie', 'uses' => 'ProductController@traeAllSerie']);

Route::post('guiaRemisions/getArticulosMinKit', ['as' => 'guiaRemisions.getArticulosMinKit', 'uses' => 'ProductController@traeAllMinKit']);

Route::post('guiaRemisions/getProductoSerie', ['as' => 'guiaRemisions.getProductoSerie', 'uses' => 'SerieController@traerSeries']);
Route::post('guiaRemisions/getProductoSerieStock', ['as' => 'guiaRemisions.getProductoSerieStock', 'uses' => 'SerieController@traerSeriesStock']);

Route::get('guiaRemisions/validateLote/{id}', ['as' => 'guiaRemisions.validateLote', 'uses' => 'Register_movementController@validateLote']);

Route::get('guiaRemisions/validateCantSerie/{id}', ['as' => 'guiaRemisions.validateCantSerie', 'uses' => 'Register_movementController@validateCantSerie']);

Route::put('guiaRemisions/saveMovimientArticulo/{id}', ['as' => 'guiaRemisions.saveMovimientArticulo', 'uses' => 'Register_movement_ArticuloController@createUpdate']);

Route::get('guiaRemisions/validaDetalle/{id}', ['as' => 'guiaRemisions.validaDetalle', 'uses' => 'Register_movementController@validaDetalle']);


Route::get('guiaRemisions/valida_series_serve/{id}', ['as' => 'guiaRemisions.valida_series_serve', 'uses' => 'Register_movementController@valida_series_serve']);

Route::get('guiaRemisions/find/{id}', ['as' => 'guiaRemisions.find', 'uses' => 'Register_movementController@find']);

// Route::post('guiaRemisions/delete', ['as' => 'guiaRemisions.delete', 'uses' => 'Register_movementController@destroy']);

Route::get('guiaRemisions/pdf',  'GuiaRemisionController@pdf');

Route::post('guiaRemisions/xml', 'Register_movementController@xmlcargar');

Route::post('guiaRemisions/getAllOperationRegMov', 'OperationController@getAll'); 

Route::post('guiaRemisions/getAllUserRegMov', 'UserController@getAll');

Route::get('guiaRemisions/archivoTxt', 'Register_movementController@archivoTxt');


Route::post('guiaRemisions/guardar_guiaRemision', ['as' => 'guiaRemisions.guardar_guiaRemision', 'uses' => 'GuiaRemisionController@guardar_guiaRemision']);

Route::post('guiaRemisions/listGuia', ['as' => 'guiaRemisions.listGuia', 'uses' => 'GuiaRemisionController@all']);

Route::post('guiaRemisions/find', ['as' => 'guiaRemisions.find', 'uses' => 'GuiaRemisionController@find']);

Route::get('guiaRemisions/deleteProducto/{id}', ['as' => 'guiaRemisions.deleteProducto', 'uses' => 'GuiaRemisionController@deleteProducto']);


Route::post('guiaRemisions/anular_guiaRemision', ['as' => 'guiaRemisions.anular_guiaRemision', 'uses' => 'GuiaRemisionController@anular_guiaRemision']);

