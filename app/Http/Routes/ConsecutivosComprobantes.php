<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('consecutivos_comprobantes/list', ['as' => 'consecutivos_comprobantes.list', 'uses' => 'ConsecutivosComprobantesController@all']);
Route::post('consecutivos_comprobantes/create', ['as' => 'consecutivos_comprobantes.create', 'uses' => 'ConsecutivosComprobantesController@create']);
Route::post('consecutivos_comprobantes/delete', ['as' => 'consecutivos_comprobantes.delete', 'uses' => 'ConsecutivosComprobantesController@destroy']);
Route::post('consecutivos_comprobantes/update', ['as' => 'consecutivos_comprobantes.update', 'uses' => 'ConsecutivosComprobantesController@update']);
Route::get('consecutivos_comprobantes/excel', ['as' => 'consecutivos_comprobantes.excel', 'uses' => 'ConsecutivosComprobantesController@excel']);

Route::post('consecutivos_comprobantes/getTiendas', 'ShopController@getTiendas');

Route::post('consecutivos_comprobantes/getDocumentos', 'ConsecutivosComprobantesController@getDocumentos');

Route::put('consecutivos_comprobantes/saveComprobante/{id}', ['as' => 'consecutivos_comprobantes.saveComprobante', 'uses' => 'ConsecutivosComprobantesController@createUpdate']);
Route::get('consecutivos_comprobantes/find/{id}', ['as' => 'consecutivos_comprobantes.find', 'uses' => 'ConsecutivosComprobantesController@find']);

Route::get('consecutivos_comprobantes/deleteUsuario/{id}', ['as' => 'consecutivos_comprobantes.deleteUsuario', 'uses' => 'ConsecutivosComprobantesController@deleteDetalle']);

Route::get('consecutivos_comprobantes/data_formDescCc', ['as' => 'consecutivos_comprobantes.data_formDescCc', 'uses' => 'DescuentoController@data_form']);

Route::get('consecutivos_comprobantes/data_formJerConComp', ['as' => 'consecutivos_comprobantes.data_formJerConComp', 'uses' => 'ConfigJerarquiaController@data_form']);


Route::get('consecutivos_comprobantes/data_form', ['as' => 'consecutivos_comprobantes.data_form', 'uses' => 'ConsecutivosComprobantesController@data_form']);


Route::post('consecutivos_comprobantes/obtener_consecutivo_comprobante', 'ConsecutivosComprobantesController@obtener_consecutivo_comprobante');

