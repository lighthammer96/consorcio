<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('registerOrdenCompras/getScompraArticulo', ['as' => 'registerOrdenCompras.getScompraArticulo', 'uses' => 'RegisterOrdenCompraController@allScomprArticulo']);

Route::post('registerOrdenCompras/list', ['as' => 'registerOrdenCompras.list', 'uses' => 'RegisterOrdenCompraController@all']); 

Route::post('registerOrdenCompras/create', ['as' => 'registerOrdenCompras.create', 'uses' => 'RegisterOrdenCompraController@create']);

// Route::get('registerOrdenCompras/delete/{id}', ['as' => 'registerOrdenCompras.delete', 'uses' => 'RegisterOrdenCompraController@destroy']); 

Route::post('registerOrdenCompras/delete', ['as' => 'registerOrdenCompras.delete', 'uses' => 'RegisterOrdenCompraController@destroy']);


Route::post('registerOrdenCompras/update', ['as' => 'registerOrdenCompras.update', 'uses' => 'RegisterOrdenCompraController@update']);
Route::get('registerOrdenCompras/excel', ['as' => 'registerOrdenCompras.excel', 'uses' => 'RegisterOrdenCompraController@excel']);


Route::get('registerOrdenCompras/getDataArticulo/{id}', ['as' => 'registerOrdenCompras.getDataArticulo', 'uses' => 'SolicitudCompraController@getDataArticulo']);

Route::get('registerOrdenCompras/deleteDetalleST/{id}', ['as' => 'registerOrdenCompras.deleteDetalleST', 'uses' => 'RegisterOrdenCompraController@deleteDetalleST']);

Route::put('registerOrdenCompras/cambiarEstado/{id}', ['as' => 'registerOrdenCompras.cambiarEstado', 'uses' => 'RegisterOrdenCompraController@cambiarEstadoTotal']);

Route::put('registerOrdenCompras/cambiarEstadoParcial/{id}', ['as' => 'registerOrdenCompras.cambiarEstadoParcial', 'uses' => 'RegisterOrdenCompraController@cambiarEstado']);

Route::get('registerOrdenCompras/data_formOrden', ['as' => 'registerOrdenCompras.data_formOrden', 'uses' => 'Orden_servicioController@data_form']);

Route::get('registerOrdenCompras/data_formOrdenPro', ['as' => 'registerOrdenCompras.data_formOrdenPro', 'uses' => 'ProformaController@data_form']);



Route::get('registerOrdenCompras/procesarTransferencia/{id}', ['as' => 'register_transfers.procesarTransferencia', 'uses' => 'RegisterOrdenCompraController@procesarTransferencia']);

Route::get('registerOrdenCompras/data_form', ['as' => 'registerOrdenCompras.data_form', 'uses' => 'RegisterOrdenCompraController@data_form']);

Route::put('registerOrdenCompras/saveMovimiento/{id}', ['as' => 'registerOrdenCompras.saveMovimiento', 'uses' => 'RegisterOrdenCompraController@createUpdate']);

Route::get('registerOrdenCompras/getKit/{id}', ['as' => 'registerOrdenCompras.getKit', 'uses' => 'RegisterOrdenCompraController@getKit']);

Route::get('registerOrdenCompras/getLocalizacionSelec/{id}', ['as' => 'registerOrdenCompras.getLocalizacionSelec', 'uses' => 'RegisterOrdenCompraController@getLocalizacionSelec']);

// Route::get('registerOrdenCompras/getStockLoc/{id}', ['as' => 'registerOrdenCompras.getStockLoc', 'uses' => 'RegisterOrdenCompraController@getStockLoc']);

Route::get('registerOrdenCompras/getLocaStock/{id}', ['as' => 'registerOrdenCompras.getLocaStock', 'uses' => 'RegisterOrdenCompraController@getLocaStock']);

Route::post('registerOrdenCompras/getArticulosSelect', ['as' => 'registerOrdenCompras.getArticulosSelect', 'uses' => 'ProductController@traeAll']);

Route::post('registerOrdenCompras/getArticulosMinKit', ['as' => 'registerOrdenCompras.getArticulosMinKit', 'uses' => 'ProductController@traeAllMinKit']);

Route::post('registerOrdenCompras/getProductoSerie', ['as' => 'registerOrdenCompras.getProductoSerie', 'uses' => 'SerieController@traerSeries']);
Route::post('registerOrdenCompras/getProductoSerieStock', ['as' => 'registerOrdenCompras.getProductoSerieStock', 'uses' => 'SerieController@traerSeriesStock']);

Route::get('registerOrdenCompras/validateLote/{id}', ['as' => 'registerOrdenCompras.validateLote', 'uses' => 'RegisterOrdenCompraController@validateLote']);

Route::get('registerOrdenCompras/validateCantSerie/{id}', ['as' => 'registerOrdenCompras.validateCantSerie', 'uses' => 'RegisterOrdenCompraController@validateCantSerie']);

Route::put('registerOrdenCompras/saveMovimientArticulo/{id}', ['as' => 'registerOrdenCompras.saveMovimientArticulo', 'uses' => 'RegisterOrdenCompra_ArticuloController@createUpdate']);

Route::get('registerOrdenCompras/validaDetalle/{id}', ['as' => 'registerOrdenCompras.validaDetalle', 'uses' => 'RegisterOrdenCompraController@validaDetalle']);


Route::get('registerOrdenCompras/valida_series_serve/{id}', ['as' => 'registerOrdenCompras.valida_series_serve', 'uses' => 'RegisterOrdenCompraController@valida_series_serve']);

Route::get('registerOrdenCompras/find/{id}', ['as' => 'registerOrdenCompras.find', 'uses' => 'RegisterOrdenCompraController@find']);

// Route::post('registerOrdenCompras/delete', ['as' => 'registerOrdenCompras.delete', 'uses' => 'RegisterOrdenCompraController@destroy']);

Route::get('registerOrdenCompras/pdf', 'RegisterOrdenCompraController@pdf');

Route::post('registerOrdenCompras/xml', 'RegisterOrdenCompraController@xmlcargar');

Route::post('registerOrdenCompras/getAllOperationRegMov', 'OperationController@getAll'); 

Route::post('registerOrdenCompras/getAllUserRegMov', 'UserController@getAll');

Route::get('registerOrdenCompras/archivoTxt', 'RegisterOrdenCompraController@archivoTxt');

Route::get('registerOrdenCompras/deleteDetalle/{id}', ['as' => 'registerOrdenCompras.deleteDetalle', 'uses' => 'RegisterOrdenCompraController@deleteDetalle']);

Route::get('registerOrdenCompras/getAprobadores/{id}', ['as' => 'registerOrdenCompras.getAprobadores', 'uses' => 'AprobacionOrdenCompraController@getAprobadores']); 
