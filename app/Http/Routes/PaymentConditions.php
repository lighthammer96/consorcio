<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 05/07/2017
 * Time: 10:49 AM
 */
Route::post('payment_condition/list', ['as' => 'payment_condition.list', 'uses' => 'PaymentConditionController@all']);
Route::post('payment_condition/create', ['as' => 'payment_condition.create', 'uses' => 'PaymentConditionController@create']);
Route::post('payment_condition/delete', ['as' => 'payment_condition.delete', 'uses' => 'PaymentConditionController@destroy']);
Route::post('payment_condition/update', ['as' => 'payment_condition.update', 'uses' => 'PaymentConditionController@update']);
Route::get('payment_condition/excel', ['as' => 'payment_condition.excel', 'uses' => 'PaymentConditionController@excel']);