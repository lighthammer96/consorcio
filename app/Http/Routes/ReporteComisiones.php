<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017 
 * Time: 6:59 PM
 */

Route::post('reporteComisiones/list', ['as' => 'reporteComisiones.list', 'uses' => 'ReporteComisionesController@all']);
Route::post('reporteComisiones/create', ['as' => 'reporteComisiones.create', 'uses' => 'ReporteComisionesController@create']);
Route::post('reporteComisiones/delete', ['as' => 'reporteComisiones.delete', 'uses' => 'ReporteComisionesController@destroy']);
Route::post('reporteComisiones/update', ['as' => 'reporteComisiones.update', 'uses' => 'ReporteComisionesController@update']);
Route::get('reporteComisiones/excel', ['as' => 'reporteComisiones.excel', 'uses' => 'ReporteComisionesController@excel']);
Route::get('reporteComisiones/data_form', ['as' => 'reporteComisiones.data_form', 'uses' => 'AsignacioncobradorController@data_form']);
Route::get('reporteComisiones/pdf', ['as' => 'reporteComisiones.pdf', 'uses' => 'ReporteComisionesController@pdf']);

Route::get('reporteComisiones/traerConvenios/{id}', ['as' => 'reporteComisiones.traerConvenios', 'uses' => 'ReporteCreditosAprobadoController@traerConvenios']); 