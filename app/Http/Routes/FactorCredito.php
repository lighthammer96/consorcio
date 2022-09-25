<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('factor_credito/list', ['as' => 'factor_credito.list', 'uses' => 'FactorCreditoController@all']);
Route::post('factor_credito/create', ['as' => 'factor_credito.create', 'uses' => 'FactorCreditoController@create']);
Route::post('factor_credito/delete', ['as' => 'factor_credito.delete', 'uses' => 'FactorCreditoController@destroy']);
Route::post('factor_credito/update', ['as' => 'factor_credito.update', 'uses' => 'FactorCreditoController@update']);
Route::get('factor_credito/excel', ['as' => 'factor_credito.excel', 'uses' => 'FactorCreditoController@excel']);