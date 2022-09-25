<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('quality_controls/list', ['as' => 'quality_controls.list', 'uses' => 'Quality_controlController@all']);
Route::post('quality_controls/create', ['as' => 'quality_controls.create', 'uses' => 'Quality_controlController@create']);
Route::post('quality_controls/delete', ['as' => 'quality_controls.delete', 'uses' => 'Quality_controlController@destroy']);
Route::post('quality_controls/update', ['as' => 'quality_controls.update', 'uses' => 'Quality_controlController@update']);
Route::get('quality_controls/excel', ['as' => 'quality_controls.excel', 'uses' => 'Quality_controlController@excel']);
Route::get('quality_controls/data_form', ['as' => 'quality_controls.data_form', 'uses' => 'Quality_controlController@data_form']);

Route::put('quality_controls/createControl/{id}', ['as' => 'quality_controls.createControl', 'uses' => 'Quality_controlController@createUpdate']);

Route::get('quality_controls/find/{id}', ['as' => 'quality_controls.find', 'uses' => 'Quality_controlController@find']);

Route::get('quality_controls/pdf', 'Quality_controlController@pdf');

Route::get('quality_controls/data_formProf', ['as' => 'proformas.data_formProf', 'uses' => 'ProformaController@data_form']);