<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('reporteMetas/list', ['as' => 'reporteMetas.list', 'uses' => 'ReporteMetaController@all']);
Route::post('reporteMetas/create', ['as' => 'reporteMetas.create', 'uses' => 'ReporteMetaController@create']);
Route::post('reporteMetas/delete', ['as' => 'reporteMetas.delete', 'uses' => 'ReporteMetaController@destroy']);
Route::post('reporteMetas/update', ['as' => 'reporteMetas.update', 'uses' => 'ReporteMetaController@update']);

Route::get('reporteMetas/excelMes', ['as' => 'reporteMetas.excelMes', 'uses' => 'ReporteMetaController@excelMes']);

Route::get('reporteMetas/excelMesComple', ['as' => 'reporteMetas.excelMesComple', 'uses' => 'ReporteMetaController@excelMesComple']);

Route::get('reporteMetas/pdf', ['as' => 'reporteMetas.pdf', 'uses' => 'ReporteMetaController@pdf']);

Route::get('reporteMetas/data_form', ['as' => 'reporteMetas.data_form', 'uses' => 'ReporteMetaController@data_form']);



Route::get('reporteMetas/reporte_objetivos/{data}', 'ReporteMetaController@reporte_objetivos');