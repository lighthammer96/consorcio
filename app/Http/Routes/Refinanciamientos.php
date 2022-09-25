<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('refinanciamientos/list', ['as' => 'refinanciamientos.list', 'uses' => 'RefinanciamientosController@all']);
Route::post('refinanciamientos/create', ['as' => 'refinanciamientos.create', 'uses' => 'RefinanciamientosController@create']);
Route::post('refinanciamientos/delete', ['as' => 'refinanciamientos.delete', 'uses' => 'RefinanciamientosController@destroy']);
Route::post('refinanciamientos/update', ['as' => 'refinanciamientos.update', 'uses' => 'RefinanciamientosController@update']);
Route::get('refinanciamientos/excel', ['as' => 'refinanciamientos.excel', 'uses' => 'RefinanciamientosController@excel']);

Route::post('refinanciamientos/find', ['as' => 'refinanciamientos.find', 'uses' => 'RefinanciamientosController@find']);
Route::post('refinanciamientos/find_documento', ['as' => 'refinanciamientos.find_documento', 'uses' => 'RefinanciamientosController@find_documento']);
Route::get('refinanciamientos/data_form', ['as' => 'refinanciamientos.data_form', 'uses' => 'RefinanciamientosController@data_form']);

Route::post('refinanciamientos/generar_refinanciamiento', ['as' => 'refinanciamientos.generar_refinanciamiento', 'uses' => 'RefinanciamientosController@generar_refinanciamiento']);



Route::post('refinanciamientos/list_solicitudes_refinanciamiento', ['as' => 'refinanciamientos.list_solicitudes_refinanciamiento', 'uses' => 'SolicitudController@list_solicitudes_refinanciamiento']);


Route::get('refinanciamientos/get_persona_documento/{id}', ['as' => 'refinanciamientos.get_persona_documento', 'uses' => 'RefinanciamientosController@get_persona_documento']);
Route::post('refinanciamientos/get_caja_diaria', 'MovimientoCajaController@get_caja_diaria');
Route::post('refinanciamientos/get_caja_tienda', 'RefinanciamientosController@get_caja_tienda');


Route::get('refinanciamientos/get_cliente/{id}', ['as' => 'refinanciamientos.get_cliente', 'uses' => 'CustomerController@get_cliente_documento']);

Route::post('refinanciamientos/obtener_consecutivo_comprobante', 'RefinanciamientosController@obtener_consecutivo_comprobante');


Route::get('refinanciamientos/imprimir_cronograma/{id}', 'MovimientoCajaController@imprimir_cronograma');

Route::get('refinanciamientos/imprimir_comprobante/{id}', 'MovimientoCajaController@imprimir_comprobante');
