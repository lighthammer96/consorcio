<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('avance_morosidad/list', ['as' => 'avance_morosidad.list', 'uses' => 'VentasController@all']);
Route::post('avance_morosidad/create', ['as' => 'avance_morosidad.create', 'uses' => 'VentasController@create']);
Route::post('avance_morosidad/delete', ['as' => 'avance_morosidad.delete', 'uses' => 'VentasController@destroy']);
Route::post('avance_morosidad/update', ['as' => 'avance_morosidad.update', 'uses' => 'VentasController@update']);
Route::get('avance_morosidad/excel', ['as' => 'avance_morosidad.excel', 'uses' => 'VentasController@excel']);

Route::post('avance_morosidad/find', ['as' => 'avance_morosidad.find', 'uses' => 'VentasController@find']);
Route::post('avance_morosidad/find_documento', ['as' => 'avance_morosidad.find_documento', 'uses' => 'VentasController@find_documento']);


Route::post('avance_morosidad/guardar_venta', ['as' => 'avance_morosidad.guardar_venta', 'uses' => 'VentasController@guardar_venta']);
Route::post('avance_morosidad/get_notas_devolucion', ['as' => 'avance_morosidad.get_notas_devolucion', 'uses' => 'VentasController@get_notas_devolucion']);

Route::get('avance_morosidad/get_venta_detalle/{id}', ['as' => 'avance_morosidad.get_venta_detalle', 'uses' => 'VentasController@get_venta_detalle']);

Route::post('avance_morosidad/get_venta_separacion', ['as' => 'avance_morosidad.get_venta_separacion', 'uses' => 'VentasController@get_venta_separacion']);


Route::get('avance_morosidad/imprimir_lista_cobraza_cuotas', 'VentasController@imprimir_lista_cobraza_cuotas');
Route::get('avance_morosidad/excel_lista_cobranza_cuotas', 'VentasController@excel_lista_cobranza_cuotas');


Route::get('avance_morosidad/data_form', ['as' => 'avance_morosidad.data_form', 'uses' => 'VisitaClienteController@data_form']);

Route::get('avance_morosidad/TraerDepartamentos/{id}', ['as' => 'avance_morosidad.TraerDepartamentos', 'uses' => 'UbigeoController@TraerDepartamentos']);
Route::get('avance_morosidad/TraerProvincias/{id}', ['as' => 'avance_morosidad.TraerProvincias', 'uses' => 'UbigeoController@TraerProvincias']);
Route::get('avance_morosidad/TraerDistritos/{id}', ['as' => 'avance_morosidad.TraerDistritos', 'uses' => 'UbigeoController@TraerDistritos']);



Route::post('avance_morosidad/ver_reporte_avance_morosidad', ['as' => 'avance_morosidad.ver_reporte_avance_morosidad', 'uses' => 'VentasController@ver_reporte_avance_morosidad']);

Route::get('avance_morosidad/imprimir_avance_morosidad', 'VentasController@imprimir_avance_morosidad');