<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('renegociacion_mora/list', ['as' => 'renegociacion_mora.list', 'uses' => 'RenegociacionMoraController@all']);
Route::post('renegociacion_mora/create', ['as' => 'renegociacion_mora.create', 'uses' => 'RenegociacionMoraController@create']);
Route::post('renegociacion_mora/delete', ['as' => 'renegociacion_mora.delete', 'uses' => 'RenegociacionMoraController@destroy']);
Route::post('renegociacion_mora/update', ['as' => 'renegociacion_mora.update', 'uses' => 'RenegociacionMoraController@update']);
Route::get('renegociacion_mora/excel', ['as' => 'renegociacion_mora.excel', 'uses' => 'RenegociacionMoraController@excel']);

Route::post('renegociacion_mora/find', ['as' => 'renegociacion_mora.find', 'uses' => 'RenegociacionMoraController@find']);
Route::post('renegociacion_mora/find_documento', ['as' => 'renegociacion_mora.find_documento', 'uses' => 'RenegociacionMoraController@find_documento']);
Route::get('renegociacion_mora/data_form', ['as' => 'renegociacion_mora.data_form', 'uses' => 'RenegociacionMoraController@data_form']);

Route::post('renegociacion_mora/guardar_renegociacion_mora', ['as' => 'renegociacion_mora.guardar_renegociacion_mora', 'uses' => 'RenegociacionMoraController@guardar_renegociacion_mora']);
Route::post('renegociacion_mora/get_notas_devolucion', ['as' => 'renegociacion_mora.get_notas_devolucion', 'uses' => 'RenegociacionMoraController@get_notas_devolucion']);

Route::get('renegociacion_mora/get_venta_detalle/{id}', ['as' => 'renegociacion_mora.get_venta_detalle', 'uses' => 'RenegociacionMoraController@get_venta_detalle']);


Route::post('renegociacion_mora/get_caja_diaria', 'MovimientoCajaController@get_caja_diaria');
