<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('solicitudCompras/list', ['as' => 'solicitudCompras.list', 'uses' => 'SolicitudCompraController@all']);
Route::post('solicitudCompras/create', ['as' => 'solicitudCompras.create', 'uses' => 'SolicitudCompraController@create']);
Route::get('solicitudCompras/delete/{id}', ['as' => 'solicitudCompras.delete', 'uses' => 'SolicitudCompraController@destroy']);
Route::post('solicitudCompras/update', ['as' => 'solicitudCompras.update', 'uses' => 'SolicitudCompraController@update']);
Route::get('solicitudCompras/excel', ['as' => 'solicitudCompras.excel', 'uses' => 'SolicitudCompraController@excel']);

Route::get('solicitudCompras/procesarTransferencia/{id}', ['as' => 'register_transfers.procesarTransferencia', 'uses' => 'SolicitudCompraController@procesarTransferencia']);

Route::get('solicitudCompras/data_form', ['as' => 'solicitudCompras.data_form', 'uses' => 'SolicitudCompraController@data_form']);
 
Route::put('solicitudCompras/saveMovimiento/{id}', ['as' => 'solicitudCompras.saveMovimiento', 'uses' => 'SolicitudCompraController@createUpdate']);

Route::get('solicitudCompras/getKit/{id}', ['as' => 'solicitudCompras.getKit', 'uses' => 'SolicitudCompraController@getKit']);

Route::get('solicitudCompras/getLocalizacionSelec/{id}', ['as' => 'solicitudCompras.getLocalizacionSelec', 'uses' => 'SolicitudCompraController@getLocalizacionSelec']);

// Route::get('solicitudCompras/getStockLoc/{id}', ['as' => 'solicitudCompras.getStockLoc', 'uses' => 'SolicitudCompraController@getStockLoc']);

Route::get('solicitudCompras/getLocaStock/{id}', ['as' => 'solicitudCompras.getLocaStock', 'uses' => 'SolicitudCompraController@getLocaStock']);

Route::post('solicitudCompras/getArticulosSelect', ['as' => 'solicitudCompras.getArticulosSelect', 'uses' => 'ProductController@traeAll']);

Route::post('solicitudCompras/getArticulosMinKit', ['as' => 'solicitudCompras.getArticulosMinKit', 'uses' => 'ProductController@traeAllMinKit']);

Route::post('solicitudCompras/getProductoSerie', ['as' => 'solicitudCompras.getProductoSerie', 'uses' => 'SerieController@traerSeries']);
Route::post('solicitudCompras/getProductoSerieStock', ['as' => 'solicitudCompras.getProductoSerieStock', 'uses' => 'SerieController@traerSeriesStock']);


Route::get('solicitudCompras/validateLote/{id}', ['as' => 'solicitudCompras.validateLote', 'uses' => 'SolicitudCompraController@validateLote']);



Route::get('solicitudCompras/validateCantSerie/{id}', ['as' => 'solicitudCompras.validateCantSerie', 'uses' => 'SolicitudCompraController@validateCantSerie']);

Route::put('solicitudCompras/saveMovimientArticulo/{id}', ['as' => 'solicitudCompras.saveMovimientArticulo', 'uses' => 'SolicitudCompraArticuloController@createUpdate']);

Route::put('solicitudCompras/cambiarEstado/{id}', ['as' => 'solicitudCompras.cambiarEstado', 'uses' => 'SolicitudCompraController@cambiarEstado']);



Route::get('solicitudCompras/validaDetalle/{id}', ['as' => 'solicitudCompras.validaDetalle', 'uses' => 'SolicitudCompraController@validaDetalle']);


Route::get('solicitudCompras/valida_series_serve/{id}', ['as' => 'solicitudCompras.valida_series_serve', 'uses' => 'SolicitudCompraController@valida_series_serve']);

Route::get('solicitudCompras/find/{id}', ['as' => 'solicitudCompras.find', 'uses' => 'SolicitudCompraController@find']);


Route::get('solicitudCompras/getDataArticulo/{id}', ['as' => 'solicitudCompras.getDataArticulo', 'uses' => 'SolicitudCompraController@getDataArticulo']);

// Route::post('solicitudCompras/delete', ['as' => 'solicitudCompras.delete', 'uses' => 'SolicitudCompraController@destroy']);

Route::get('solicitudCompras/pdf', 'SolicitudCompraController@pdf');

Route::post('solicitudCompras/xml', 'SolicitudCompraController@xmlcargar');

Route::post('solicitudCompras/getAllOperationRegMov', 'OperationController@getAll'); 

Route::post('solicitudCompras/getAllUserRegMov', 'UserController@getAll');

Route::get('solicitudCompras/archivoTxt', 'SolicitudCompraController@archivoTxt');

Route::get('solicitudCompras/deleteDetalleSC/{id}', ['as' => 'solicitudCompras.deleteDetalleSC', 'uses' => 'SolicitudCompraController@deleteDetalleSC']);