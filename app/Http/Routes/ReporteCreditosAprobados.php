<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('reporteCreditosAprobados/list', 'ReporteCreditosAprobadoController@all');
Route::post('reporteCreditosAprobados/create', ['as' => 'reporteCreditosAprobados.create', 'uses' => 'ReporteCreditosAprobadoController@create']);
Route::post('reporteCreditosAprobados/delete', ['as' => 'reporteCreditosAprobados.delete', 'uses' => 'ReporteCreditosAprobadoController@destroy']);
Route::post('reporteCreditosAprobados/update', ['as' => 'reporteCreditosAprobados.update', 'uses' => 'ReporteCreditosAprobadoController@update']);
Route::get('reporteCreditosAprobados/excel', 'ReporteCreditosAprobadoController@excel');
Route::get('reporteCreditosAprobados/pdf', ['as' => 'reporteCreditosAprobados.pdf', 'uses' => 'ReporteCreditosAprobadoController@pdf']);
Route::get('reporteCreditosAprobados/data_form', 'ReporteCreditosAprobadoController@data_form');

Route::get('reporteCreditosAprobados/traerConvenios/{id}', ['as' => 'reporteCreditosAprobados.traerConvenios', 'uses' => 'ReporteCreditosAprobadoController@traerConvenios']);

Route::post('reporteCreditosAprobados/listClient', 'CustomerController@all');