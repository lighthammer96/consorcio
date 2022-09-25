<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('reprogramacion_fechas/list', ['as' => 'reprogramacion_fechas.list', 'uses' => 'ReprogramacionFechasController@all']);
Route::post('reprogramacion_fechas/create', ['as' => 'reprogramacion_fechas.create', 'uses' => 'ReprogramacionFechasController@create']);
Route::post('reprogramacion_fechas/delete', ['as' => 'reprogramacion_fechas.delete', 'uses' => 'ReprogramacionFechasController@destroy']);
Route::post('reprogramacion_fechas/update', ['as' => 'reprogramacion_fechas.update', 'uses' => 'ReprogramacionFechasController@update']);
Route::get('reprogramacion_fechas/excel', ['as' => 'reprogramacion_fechas.excel', 'uses' => 'ReprogramacionFechasController@excel']);

Route::post('reprogramacion_fechas/find', ['as' => 'reprogramacion_fechas.find', 'uses' => 'ReprogramacionFechasController@find']);
Route::post('reprogramacion_fechas/find_documento', ['as' => 'reprogramacion_fechas.find_documento', 'uses' => 'ReprogramacionFechasController@find_documento']);
Route::get('reprogramacion_fechas/data_form', ['as' => 'reprogramacion_fechas.data_form', 'uses' => 'ReprogramacionFechasController@data_form']);

Route::post('reprogramacion_fechas/guardar_reprogramacion_fechas', ['as' => 'reprogramacion_fechas.guardar_reprogramacion_fechas', 'uses' => 'ReprogramacionFechasController@guardar_reprogramacion_fechas']);
Route::post('reprogramacion_fechas/get_notas_devolucion', ['as' => 'reprogramacion_fechas.get_notas_devolucion', 'uses' => 'ReprogramacionFechasController@get_notas_devolucion']);

Route::get('reprogramacion_fechas/get_venta_detalle/{id}', ['as' => 'reprogramacion_fechas.get_venta_detalle', 'uses' => 'ReprogramacionFechasController@get_venta_detalle']);


Route::post('reprogramacion_fechas/get_caja_diaria', 'MovimientoCajaController@get_caja_diaria');
