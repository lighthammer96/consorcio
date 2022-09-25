<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('lista_cobranza_cuotas/list', ['as' => 'lista_cobranza_cuotas.list', 'uses' => 'VentasController@all']);
Route::post('lista_cobranza_cuotas/create', ['as' => 'lista_cobranza_cuotas.create', 'uses' => 'VentasController@create']);
Route::post('lista_cobranza_cuotas/delete', ['as' => 'lista_cobranza_cuotas.delete', 'uses' => 'VentasController@destroy']);
Route::post('lista_cobranza_cuotas/update', ['as' => 'lista_cobranza_cuotas.update', 'uses' => 'VentasController@update']);
Route::get('lista_cobranza_cuotas/excel', ['as' => 'lista_cobranza_cuotas.excel', 'uses' => 'VentasController@excel']);

Route::post('lista_cobranza_cuotas/find', ['as' => 'lista_cobranza_cuotas.find', 'uses' => 'VentasController@find']);
Route::post('lista_cobranza_cuotas/find_documento', ['as' => 'lista_cobranza_cuotas.find_documento', 'uses' => 'VentasController@find_documento']);


Route::post('lista_cobranza_cuotas/guardar_venta', ['as' => 'lista_cobranza_cuotas.guardar_venta', 'uses' => 'VentasController@guardar_venta']);
Route::post('lista_cobranza_cuotas/get_notas_devolucion', ['as' => 'lista_cobranza_cuotas.get_notas_devolucion', 'uses' => 'VentasController@get_notas_devolucion']);

Route::get('lista_cobranza_cuotas/get_venta_detalle/{id}', ['as' => 'lista_cobranza_cuotas.get_venta_detalle', 'uses' => 'VentasController@get_venta_detalle']);

Route::post('lista_cobranza_cuotas/get_venta_separacion', ['as' => 'lista_cobranza_cuotas.get_venta_separacion', 'uses' => 'VentasController@get_venta_separacion']);


Route::get('lista_cobranza_cuotas/imprimir_lista_cobraza_cuotas', 'VentasController@imprimir_lista_cobraza_cuotas');
Route::get('lista_cobranza_cuotas/excel_lista_cobranza_cuotas', 'VentasController@excel_lista_cobranza_cuotas');


Route::get('lista_cobranza_cuotas/data_form', ['as' => 'lista_cobranza_cuotas.data_form', 'uses' => 'VisitaClienteController@data_form']);

Route::get('lista_cobranza_cuotas/TraerDepartamentos/{id}', ['as' => 'lista_cobranza_cuotas.TraerDepartamentos', 'uses' => 'UbigeoController@TraerDepartamentos']);
Route::get('lista_cobranza_cuotas/TraerProvincias/{id}', ['as' => 'lista_cobranza_cuotas.TraerProvincias', 'uses' => 'UbigeoController@TraerProvincias']);
Route::get('lista_cobranza_cuotas/TraerDistritos/{id}', ['as' => 'lista_cobranza_cuotas.TraerDistritos', 'uses' => 'UbigeoController@TraerDistritos']);