<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('currencys/list', ['as' => 'currencys.list', 'uses' => 'CurrencyController@all']);
Route::post('currencys/create', ['as' => 'currencys.create', 'uses' => 'CurrencyController@create']);
Route::post('currencys/delete', ['as' => 'currencys.delete', 'uses' => 'CurrencyController@destroy']);
Route::post('currencys/update', ['as' => 'currencys.update', 'uses' => 'CurrencyController@update']);
Route::get('currencys/excel', ['as' => 'currencys.excel', 'uses' => 'CurrencyController@excel']);