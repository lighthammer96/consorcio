<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('register_transfers/list', ['as' => 'register_transfers.list', 'uses' => 'Register_transferController@all']);
Route::post('register_transfers/create', ['as' => 'register_transfers.create', 'uses' => 'Register_transferController@create']);
Route::get('register_transfers/delete/{id}', ['as' => 'register_transfers.delete', 'uses' => 'Register_transferController@destroy']);

Route::get('register_transfers/procesarTransferencia/{id}', ['as' => 'register_transfers.procesarTransferencia', 'uses' => 'Register_transferController@procesarTransferencia']);

Route::get('register_transfers/validaDetalle/{id}', ['as' => 'register_transfers.validaDetalle', 'uses' => 'Register_transferController@validaDetalle']);

Route::get('register_transfers/pdf', 'Register_transferController@pdf');

Route::post('register_transfers/update', ['as' => 'register_transfers.update', 'uses' => 'Register_transferController@update']);
Route::get('register_transfers/excel', ['as' => 'register_transfers.excel', 'uses' => 'Register_transferController@excel']);

Route::get('register_transfers/data_form', ['as' => 'register_transfers.data_form', 'uses' => 'Register_transferController@data_form']);

Route::put('register_transfers/saveMovimiento/{id}', ['as' => 'register_transfers.saveMovimiento', 'uses' => 'Register_transferController@createUpdate']);

Route::get('register_transfers/getKit/{id}', ['as' => 'register_transfers.getKit', 'uses' => 'Register_transferController@getKit']);

Route::get('register_transfers/getLocalizacionSelec/{id}', ['as' => 'register_transfers.getLocalizacionSelec', 'uses' => 'Register_transferController@getLocalizacionSelec']);

// Route::get('register_transfers/getStockLoc/{id}', ['as' => 'register_transfers.getStockLoc', 'uses' => 'Register_transferController@getStockLoc']);

Route::get('register_transfers/getLocaStock/{id}', ['as' => 'register_transfers.getLocaStock', 'uses' => 'Register_transferController@getLocaStock']);

Route::post('register_transfers/getArticulosSelectTrans', ['as' => 'register_transfers.getArticulosSelectTrans', 'uses' => 'ProductController@traeAllTrans']);

Route::post('register_transfers/getArticulosMinKit', ['as' => 'register_transfers.getArticulosMinKit', 'uses' => 'ProductController@traeAllMinKit']);

Route::post('register_transfers/getProductoSerie', ['as' => 'register_transfers.getProductoSerie', 'uses' => 'SerieController@traerSeries']);

Route::get('register_transfers/validateLote/{id}', ['as' => 'register_transfers.validateLote', 'uses' => 'Register_transferController@validateLote']);

Route::get('register_transfers/validateCantSerie/{id}', ['as' => 'register_transfers.validateCantSerie', 'uses' => 'Register_transferController@validateCantSerie']);

Route::put('register_transfers/saveMovimientArticulo/{id}', ['as' => 'register_transfers.saveMovimientArticulo', 'uses' => 'Register_transferController@createUpdate_Articulo']);

Route::get('register_transfers/valida_series_serve/{id}', ['as' => 'register_transfers.valida_series_serve', 'uses' => 'Register_transferController@valida_series_serve']);

Route::get('register_transfers/find/{id}', ['as' => 'register_transfers.find', 'uses' => 'Register_transferController@find']);

Route::post('register_transfers/delete', ['as' => 'register_transfers.delete', 'uses' => 'Register_transferController@destroy']);
