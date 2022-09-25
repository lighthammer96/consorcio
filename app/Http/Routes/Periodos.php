<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('periodos/list', ['as' => 'periodos.list', 'uses' => 'PeriodoController@all']);
Route::post('periodos/create', ['as' => 'periodos.create', 'uses' => 'PeriodoController@create']);
Route::post('periodos/delete', ['as' => 'periodos.delete', 'uses' => 'PeriodoController@destroy']);
Route::post('periodos/update', ['as' => 'periodos.update', 'uses' => 'PeriodoController@update']);
Route::get('periodos/excel', ['as' => 'periodos.excel', 'uses' => 'PeriodoController@excel']); 
Route::put('periodos/savePeriodo/{id}', ['as' => 'periodos.savePeriodo', 'uses' => 'PeriodoController@createUpdate']);
Route::get('periodos/find/{id}', ['as' => 'periodos.find', 'uses' => 'PeriodoController@find']);