<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('visita_cliente/list', ['as' => 'visita_cliente.list', 'uses' => 'VisitaClienteController@all']);
Route::post('visita_cliente/create', ['as' => 'visita_cliente.create', 'uses' => 'VisitaClienteController@create']);
Route::post('visita_cliente/delete', ['as' => 'visita_cliente.delete', 'uses' => 'VisitaClienteController@destroy']);
Route::post('visita_cliente/update', ['as' => 'visita_cliente.update', 'uses' => 'VisitaClienteController@update']);
Route::get('visita_cliente/excel', ['as' => 'visita_cliente.excel', 'uses' => 'VisitaClienteController@excel']);

Route::post('visita_cliente/find_visita', ['as' => 'visita_cliente.find_visita', 'uses' => 'VisitaClienteController@find_visita']);
Route::post('visita_cliente/find_documento', ['as' => 'visita_cliente.find_documento', 'uses' => 'VisitaClienteController@find_documento']);
Route::get('visita_cliente/data_form', ['as' => 'visita_cliente.data_form', 'uses' => 'VisitaClienteController@data_form']);

Route::post('visita_cliente/guardar_visita', ['as' => 'visita_cliente.guardar_visita', 'uses' => 'VisitaClienteController@guardar_visita']);
Route::post('visita_cliente/obtener_solicitud', ['as' => 'visita_cliente.obtener_solicitud', 'uses' => 'VisitaClienteController@obtener_solicitud']);
Route::post('visita_cliente/obtener_cuotas_cronograma', ['as' => 'visita_cliente.obtener_cuotas_cronograma', 'uses' => 'VisitaClienteController@obtener_cuotas_cronograma']);
Route::post('visita_cliente/procesar_visita', ['as' => 'visita_cliente.procesar_visita', 'uses' => 'VisitaClienteController@procesar_visita']);


Route::get('visita_cliente/imprimir_cartas_cobranza/{id}', 'VisitaClienteController@imprimir_cartas_cobranza');
Route::get('visita_cliente/imprimir_visita/{id}', 'VisitaClienteController@imprimir_visita');

