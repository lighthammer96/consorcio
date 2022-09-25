<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017 
 * Time: 6:59 PM
 */

Route::post('reporteVentaClientes/list', ['as' => 'reporteVentaClientes.list', 'uses' => 'ReporteVentaClienteController@all']);
Route::post('reporteVentaClientes/create', ['as' => 'reporteVentaClientes.create', 'uses' => 'ReporteVentaClienteController@create']);
Route::post('reporteVentaClientes/delete', ['as' => 'reporteVentaClientes.delete', 'uses' => 'ReporteVentaClienteController@destroy']);
Route::post('reporteVentaClientes/update', ['as' => 'reporteVentaClientes.update', 'uses' => 'ReporteVentaClienteController@update']);
Route::get('reporteVentaClientes/excel', ['as' => 'reporteVentaClientes.excel', 'uses' => 'ReporteVentaClienteController@excel']);
Route::get('reporteVentaClientes/data_form', ['as' => 'reporteVentaClientes.data_form', 'uses' => 'AsignacioncobradorController@data_form']);
Route::get('reporteVentaClientes/pdf', ['as' => 'reporteVentaClientes.pdf', 'uses' => 'ReporteVentaClienteController@pdf']);

Route::get('reporteVentaClientes/traerConvenios/{id}', ['as' => 'reporteVentaClientes.traerConvenios', 'uses' => 'ReporteCreditosAprobadoController@traerConvenios']); 