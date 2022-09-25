<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('resumenMensualActividads/list', ['as' => 'resumenMensualActividads.list', 'uses' => 'ResumenMensualActividadController@all']);
Route::post('resumenMensualActividads/create', ['as' => 'resumenMensualActividads.create', 'uses' => 'ResumenMensualActividadController@create']);
Route::post('resumenMensualActividads/delete', ['as' => 'resumenMensualActividads.delete', 'uses' => 'ResumenMensualActividadController@destroy']);
Route::post('resumenMensualActividads/update', ['as' => 'resumenMensualActividads.update', 'uses' => 'ResumenMensualActividadController@update']);
Route::get('resumenMensualActividads/excel', ['as' => 'resumenMensualActividads.excel', 'uses' => 'ResumenMensualActividadController@excel']);
Route::get('resumenMensualActividads/pdf', ['as' => 'resumenMensualActividads.pdf', 'uses' => 'ResumenMensualActividadController@pdf']);
Route::get('resumenMensualActividads/excelMetas', ['as' => 'resumenMensualActividads.excelMetas', 'uses' => 'ResumenMensualActividadController@excelMetas']);