<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('reporteOrdenDiarios/list', ['as' => 'reporteOrdenDiarios.list', 'uses' => 'ReporteOrdenDiarioController@all']);
Route::post('reporteOrdenDiarios/create', ['as' => 'reporteOrdenDiarios.create', 'uses' => 'ReporteOrdenDiarioController@create']);
Route::post('reporteOrdenDiarios/delete', ['as' => 'reporteOrdenDiarios.delete', 'uses' => 'ReporteOrdenDiarioController@destroy']);
Route::post('reporteOrdenDiarios/update', ['as' => 'reporteOrdenDiarios.update', 'uses' => 'ReporteOrdenDiarioController@update']);
Route::get('reporteOrdenDiarios/excel', ['as' => 'reporteOrdenDiarios.excel', 'uses' => 'ReporteOrdenDiarioController@excel']);
Route::get('reporteOrdenDiarios/data_form', ['as' => 'reporteOrdenDiarios.data_form', 'uses' => 'ReporteOrdenDiarioController@data_form']);