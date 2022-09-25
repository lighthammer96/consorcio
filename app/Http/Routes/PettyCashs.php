<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 04/07/2017
 * Time: 05:17 PM
 */
Route::post('petty_cash/list', ['as' => 'petty_cash.list', 'uses' => 'PettyCashController@all']);
Route::post('petty_cash/create', ['as' => 'petty_cash.create', 'uses' => 'PettyCashController@create']);
Route::put('petty_cash/savePettyCash/{id}', ['as' => 'petty_cash.savePettyCash', 'uses' => 'PettyCashController@createUpdate']);
Route::get('petty_cash/find/{id}', ['as' => 'petty_cash.find', 'uses' => 'PettyCashController@find']);
Route::post('petty_cash/delete', ['as' => 'petty_cash.delete', 'uses' => 'PettyCashController@destroy']);
Route::post('petty_cash/update', ['as' => 'petty_cash.update', 'uses' => 'PettyCashController@update']);
Route::get('petty_cash/excel', ['as' => 'petty_cash.excel', 'uses' => 'PettyCashController@excel']);
Route::get('petty_cash/pdf', ['as' => 'petty_cash.pdf', 'uses' => 'EntityController@pdf']);
Route::get('petty_cash/data_form', ['as' => 'petty_cash.data_form', 'uses' => 'PettyCashController@data_form']);
Route::post('petty_cash/listUser', ['as' => 'petty_cash.listUser', 'uses' => 'UserController@all']);
