<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */
Route::post('solicitudCompras/list', 'SolicitudCompraController@all');
Route::get('solicitudCompras/data_form', 'SolicitudCompraController@data_form');
Route::put('solicitudCompras/save/{id}', 'SolicitudCompraController@createUpdate');
Route::get('solicitudCompras/find/{id}', 'SolicitudCompraController@find');
Route::post('solicitudCompras/delete', 'SolicitudCompraController@destroy');
Route::get('solicitudCompras/excel', 'SolicitudCompraController@excel');
Route::post('solicitudCompras/getArticulosMinKit', 'ProductController@traeAllMinKit');
Route::put('solicitudCompras/cambiarEstado/{id}', 'SolicitudCompraController@cambiarEstado');

//Route::get('solicitudCompras/procesarTransferencia/{id}', 'SolicitudCompraController@procesarTransferencia');
//Route::get('solicitudCompras/getKit/{id}', 'SolicitudCompraController@getKit');
//Route::get('solicitudCompras/getLocalizacionSelec/{id}', 'SolicitudCompraController@getLocalizacionSelec');
// Route::get('solicitudCompras/getStockLoc/{id}', 'SolicitudCompraController@getStockLoc');
//Route::get('solicitudCompras/getLocaStock/{id}', 'SolicitudCompraController@getLocaStock');
//Route::post('solicitudCompras/getArticulosSelect', 'ProductController@traeAll');
//Route::post('solicitudCompras/getProductoSerie', 'SerieController@traerSeries');
//Route::post('solicitudCompras/getProductoSerieStock', 'SerieController@traerSeriesStock');
//Route::get('solicitudCompras/validateLote/{id}', 'SolicitudCompraController@validateLote');
//Route::get('solicitudCompras/validateCantSerie/{id}', 'SolicitudCompraController@validateCantSerie');
//Route::get('solicitudCompras/validaDetalle/{id}', 'SolicitudCompraController@validaDetalle');
//Route::get('solicitudCompras/valida_series_serve/{id}', 'SolicitudCompraController@valida_series_serve');
//Route::get('solicitudCompras/getDataArticulo/{id}', 'SolicitudCompraController@getDataArticulo');
// Route::post('solicitudCompras/delete', 'SolicitudCompraController@destroy');
//Route::get('solicitudCompras/pdf', 'SolicitudCompraController@pdf');
//Route::post('solicitudCompras/xml', 'SolicitudCompraController@xmlcargar');
//Route::post('solicitudCompras/getAllOperationRegMov', 'OperationController@getAll');
//Route::post('solicitudCompras/getAllUserRegMov', 'UserController@getAll');
//Route::get('solicitudCompras/archivoTxt', 'SolicitudCompraController@archivoTxt');
//Route::get('solicitudCompras/deleteDetalleSC/{id}', 'SolicitudCompraController@deleteDetalleSC');