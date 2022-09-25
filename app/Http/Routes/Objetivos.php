<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('objetivos/list', ['as' => 'objetivos.list', 'uses' => 'ObjetivoController@all']);
Route::post('objetivos/create', ['as' => 'objetivos.create', 'uses' => 'ObjetivoController@create']);
Route::post('objetivos/delete', ['as' => 'objetivos.delete', 'uses' => 'ObjetivoController@destroy']);
Route::post('objetivos/update', ['as' => 'objetivos.update', 'uses' => 'ObjetivoController@update']);
Route::get('objetivos/excel', ['as' => 'objetivos.excel', 'uses' => 'ObjetivoController@excel']);

Route::get('objetivos/data_form', ['as' => 'objetivos.data_form', 'uses' => 'ObjetivoController@data_form']);

Route::get('objetivos/get_personas/{id}', ['as' => 'objetivos.get_personas', 'uses' => 'ObjetivoController@get_personas']);

Route::put('objetivos/saveObjetivos/{id}', ['as' => 'objetivos.saveObjetivos', 'uses' => 'ObjetivoController@createUpdate']);

Route::get('objetivos/find/{id}', ['as' => 'objetivos.find', 'uses' => 'ObjetivoController@find']);

Route::get('objetivos/aprobarObjetivo/{id}', ['as' => 'objetivos.aprobarObjetivo', 'uses' => 'ObjetivoController@aprobarObjetivo']);

Route::get('objetivos/data_formRegis', ['as' => 'objetivos.data_formRegis', 'uses' => 'Register_movementController@data_form']);

Route::post('objetivos/getTipoObjetivo', 'TypeObjetController@getAll');

Route::post('objetivos/getMonedas', 'CurrencyController@getAll');