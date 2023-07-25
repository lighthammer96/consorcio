<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('registerOrdenCompras/list', 'RegisterOrdenCompraController@all');
Route::get('registerOrdenCompras/data_form', 'RegisterOrdenCompraController@data_form');
Route::put('registerOrdenCompras/save/{id}', 'RegisterOrdenCompraController@createUpdate');
Route::post('registerOrdenCompras/delete', 'RegisterOrdenCompraController@destroy');
Route::get('registerOrdenCompras/format/{id}', 'RegisterOrdenCompraController@format');
Route::get('registerOrdenCompras/getApprovers/{id}', 'AprobacionOrdenCompraController@getApprovers');

Route::put('registerOrdenCompras/cambiarEstado/{id}', 'RegisterOrdenCompraController@cambiarEstadoTotal');

Route::post('registerOrdenCompras/getArticulosMinKit', 'ProductController@traeAllMinKit');
Route::post('registerOrdenCompras/getScompraArticulo', 'RegisterOrdenCompraController@allScomprArticulo');

Route::get('registerOrdenCompras/excel', 'RegisterOrdenCompraController@excel');

//Route::get('registerOrdenCompras/getDataArticulo/{id}', ['as' => 'registerOrdenCompras.getDataArticulo', 'uses' => 'SolicitudCompraController@getDataArticulo']);

//Route::get('registerOrdenCompras/deleteDetalleST/{id}', ['as' => 'registerOrdenCompras.deleteDetalleST', 'uses' => 'RegisterOrdenCompraController@deleteDetalleST']);

Route::put('registerOrdenCompras/cambiarEstadoParcial/{id}', ['as' => 'registerOrdenCompras.cambiarEstadoParcial', 'uses' => 'RegisterOrdenCompraController@cambiarEstado']);


//Route::get('registerOrdenCompras/procesarTransferencia/{id}', ['as' => 'register_transfers.procesarTransferencia', 'uses' => 'RegisterOrdenCompraController@procesarTransferencia']);


//Route::get('registerOrdenCompras/getKit/{id}', ['as' => 'registerOrdenCompras.getKit', 'uses' => 'RegisterOrdenCompraController@getKit']);

//Route::get('registerOrdenCompras/getLocalizacionSelec/{id}', 'RegisterOrdenCompraController@getLocalizacionSelec');

// Route::get('registerOrdenCompras/getStockLoc/{id}', 'RegisterOrdenCompraController@getStockLoc');

//Route::get('registerOrdenCompras/getLocaStock/{id}', 'RegisterOrdenCompraController@getLocaStock');

//Route::post('registerOrdenCompras/getArticulosSelect', ['as' => 'registerOrdenCompras.getArticulosSelect', 'uses' => 'ProductController@traeAll']);

//Route::post('registerOrdenCompras/getProductoSerie', ['as' => 'registerOrdenCompras.getProductoSerie', 'uses' => 'SerieController@traerSeries']);
//Route::post('registerOrdenCompras/getProductoSerieStock', ['as' => 'registerOrdenCompras.getProductoSerieStock', 'uses' => 'SerieController@traerSeriesStock']);

//Route::get('registerOrdenCompras/validateLote/{id}', ['as' => 'registerOrdenCompras.validateLote', 'uses' => 'RegisterOrdenCompraController@validateLote']);

//Route::get('registerOrdenCompras/validateCantSerie/{id}', ['as' => 'registerOrdenCompras.validateCantSerie', 'uses' => 'RegisterOrdenCompraController@validateCantSerie']);

//Route::get('registerOrdenCompras/validaDetalle/{id}', ['as' => 'registerOrdenCompras.validaDetalle', 'uses' => 'RegisterOrdenCompraController@validaDetalle']);

//Route::get('registerOrdenCompras/valida_series_serve/{id}', ['as' => 'registerOrdenCompras.valida_series_serve', 'uses' => 'RegisterOrdenCompraController@valida_series_serve']);

Route::get('registerOrdenCompras/find/{id}', ['as' => 'registerOrdenCompras.find', 'uses' => 'RegisterOrdenCompraController@find']);

// Route::post('registerOrdenCompras/delete', ['as' => 'registerOrdenCompras.delete', 'uses' => 'RegisterOrdenCompraController@destroy']);

Route::get('registerOrdenCompras/pdf', 'RegisterOrdenCompraController@pdf');

Route::post('registerOrdenCompras/xml', 'RegisterOrdenCompraController@xmlcargar');
