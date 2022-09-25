<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */
 
Route::post('aprobacionOrdenCompras/list', ['as' => 'aprobacionOrdenCompras.list', 'uses' => 'AprobacionOrdenCompraController@all']);
Route::post('aprobacionOrdenCompras/create', ['as' => 'aprobacionOrdenCompras.create', 'uses' => 'AprobacionOrdenCompraController@create']);
Route::post('aprobacionOrdenCompras/delete', ['as' => 'aprobacionOrdenCompras.delete', 'uses' => 'AprobacionOrdenCompraController@destroy']);
Route::post('aprobacionOrdenCompras/update', ['as' => 'aprobacionOrdenCompras.update', 'uses' => 'AprobacionOrdenCompraController@update']);
Route::get('aprobacionOrdenCompras/excel', ['as' => 'aprobacionOrdenCompras.excel', 'uses' => 'AprobacionOrdenCompraController@excel']);


Route::get('aprobacionOrdenCompras/getDataArticulo/{id}', ['as' => 'aprobacionOrdenCompras.getDataArticulo', 'uses' => 'SolicitudCompraController@getDataArticulo']);//SI

Route::get('aprobacionOrdenCompras/deleteDetalleST/{id}', ['as' => 'aprobacionOrdenCompras.deleteDetalleST', 'uses' => 'RegisterOrdenCompraController@deleteDetalleST']);//si


Route::get('aprobacionOrdenCompras/data_formOrden', ['as' => 'aprobacionOrdenCompras.data_formOrden', 'uses' => 'Orden_servicioController@data_form']);//si

Route::get('aprobacionOrdenCompras/data_formOrdenPro', ['as' => 'aprobacionOrdenCompras.data_formOrdenPro', 'uses' => 'ProformaController@data_form']);//SI


Route::get('aprobacionOrdenCompras/data_form', ['as' => 'aprobacionOrdenCompras.data_form', 'uses' => 'RegisterOrdenCompraController@data_form']);//si

Route::put('aprobacionOrdenCompras/saveMovimiento/{id}', ['as' => 'aprobacionOrdenCompras.saveMovimiento', 'uses' => 'RegisterOrdenCompraController@createUpdate']);//SI


Route::get('aprobacionOrdenCompras/getLocalizacionSelec/{id}', ['as' => 'aprobacionOrdenCompras.getLocalizacionSelec', 'uses' => 'RegisterOrdenCompraController@getLocalizacionSelec']);//si


Route::get('aprobacionOrdenCompras/getLocaStock/{id}', ['as' => 'aprobacionOrdenCompras.getLocaStock', 'uses' => 'RegisterOrdenCompraController@getLocaStock']);//si



Route::put('aprobacionOrdenCompras/saveMovimientArticulo/{id}', ['as' => 'aprobacionOrdenCompras.saveMovimientArticulo', 'uses' => 'RegisterOrdenCompra_ArticuloController@createUpdate']);//si



Route::get('aprobacionOrdenCompras/find/{id}', ['as' => 'aprobacionOrdenCompras.find', 'uses' => 'RegisterOrdenCompraController@find']); //si

Route::get('aprobacionOrdenCompras/getAprobadores/{id}', ['as' => 'aprobacionOrdenCompras.getAprobadores', 'uses' => 'AprobacionOrdenCompraController@getAprobadores']); 


Route::put('aprobacionOrdenCompras/updateComentarioAprobacion/{id}', ['as' => 'aprobacionOrdenCompras.updateComentarioAprobacion', 'uses' => 'AprobacionOrdenCompraController@updateComentarioAprobacion']);

Route::put('aprobacionOrdenCompras/AprobarRechazar/{id}', ['as' => 'aprobacionOrdenCompras.AprobarRechazar', 'uses' => 'AprobacionOrdenCompraController@AprobarRechazarSolicitud']);
