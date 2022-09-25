<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('register_movements/list', ['as' => 'register_movements.list', 'uses' => 'Register_movementController@all']);
Route::post('register_movements/create', ['as' => 'register_movements.create', 'uses' => 'Register_movementController@create']);
Route::get('register_movements/delete/{id}', ['as' => 'register_movements.delete', 'uses' => 'Register_movementController@destroy']);
Route::post('register_movements/update', ['as' => 'register_movements.update', 'uses' => 'Register_movementController@update']);
Route::get('register_movements/excel', ['as' => 'register_movements.excel', 'uses' => 'Register_movementController@excel']);

Route::get('register_movements/procesarTransferencia/{id}', ['as' => 'register_movements.procesarTransferencia', 'uses' => 'Register_movementController@procesarTransferencia']);

Route::get('register_movements/data_form', ['as' => 'register_movements.data_form', 'uses' => 'Register_movementController@data_form']);

Route::put('register_movements/saveMovimiento/{id}', ['as' => 'register_movements.saveMovimiento', 'uses' => 'Register_movementController@createUpdate']);

Route::get('register_movements/getKit/{id}', ['as' => 'register_movements.getKit', 'uses' => 'Register_movementController@getKit']);

Route::get('register_movements/getLocalizacionSelec/{id}', ['as' => 'register_movements.getLocalizacionSelec', 'uses' => 'Register_movementController@getLocalizacionSelec']);

// Route::get('register_movements/getStockLoc/{id}', ['as' => 'register_movements.getStockLoc', 'uses' => 'Register_movementController@getStockLoc']);

Route::get('register_movements/getLocaStock/{id}', ['as' => 'register_movements.getLocaStock', 'uses' => 'Register_movementController@getLocaStock']);

Route::post('register_movements/getArticulosSelect', ['as' => 'register_movements.getArticulosSelect', 'uses' => 'ProductController@traeAll']);

Route::post('register_movements/getArticulosMinKit', ['as' => 'register_movements.getArticulosMinKit', 'uses' => 'ProductController@traeAllMinKit']);

Route::post('register_movements/getProductoSerie', ['as' => 'register_movements.getProductoSerie', 'uses' => 'SerieController@traerSeries']);
Route::post('register_movements/getProductoSerieStock', ['as' => 'register_movements.getProductoSerieStock', 'uses' => 'SerieController@traerSeriesStock']);

Route::get('register_movements/validateLote/{id}', ['as' => 'register_movements.validateLote', 'uses' => 'Register_movementController@validateLote']);

Route::get('register_movements/validateCantSerie/{id}', ['as' => 'register_movements.validateCantSerie', 'uses' => 'Register_movementController@validateCantSerie']);

Route::put('register_movements/saveMovimientArticulo/{id}', ['as' => 'register_movements.saveMovimientArticulo', 'uses' => 'Register_movement_ArticuloController@createUpdate']);

Route::get('register_movements/validaDetalle/{id}', ['as' => 'register_movements.validaDetalle', 'uses' => 'Register_movementController@validaDetalle']);


Route::get('register_movements/valida_series_serve/{id}', ['as' => 'register_movements.valida_series_serve', 'uses' => 'Register_movementController@valida_series_serve']);

Route::get('register_movements/find/{id}', ['as' => 'register_movements.find', 'uses' => 'Register_movementController@find']);

// Route::post('register_movements/delete', ['as' => 'register_movements.delete', 'uses' => 'Register_movementController@destroy']);

Route::get('register_movements/pdf', 'Register_movementController@pdf');

Route::post('register_movements/xml', 'Register_movementController@xmlcargar');

Route::post('register_movements/getAllOperationRegMov', 'OperationController@getAll'); 

Route::post('register_movements/getAllUserRegMov', 'UserController@getAll');

Route::get('register_movements/archivoTxt', 'Register_movementController@archivoTxt');


Route::get('register_movements/data_form_series', ['as' => 'series.data_form', 'uses' => 'SerieController@data_form']);
