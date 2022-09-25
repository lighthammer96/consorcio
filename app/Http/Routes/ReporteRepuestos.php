<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('reporteRepuestos/list', ['as' => 'reporteRepuestos.list', 'uses' => 'ReporteRepuestoController@all']);
Route::post('reporteRepuestos/create', ['as' => 'reporteRepuestos.create', 'uses' => 'ReporteRepuestoController@create']);
Route::post('reporteRepuestos/delete', ['as' => 'reporteRepuestos.delete', 'uses' => 'ReporteRepuestoController@destroy']);
Route::post('reporteRepuestos/update', ['as' => 'reporteRepuestos.update', 'uses' => 'ReporteRepuestoController@update']);
Route::get('reporteRepuestos/excel', ['as' => 'reporteRepuestos.excel', 'uses' => 'ReporteRepuestoController@excel']);
Route::get('reporteRepuestos/pdf', ['as' => 'reporteRepuestos.pdf', 'uses' => 'ReporteRepuestoController@pdf']);
Route::get('reporteRepuestos/data_form', ['as' => 'reporteRepuestos.data_form', 'uses' => 'AsignacioncobradorController@data_form']);