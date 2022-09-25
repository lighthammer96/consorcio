<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/6/2017
 * Time: 9:54 AM
 */

Route::post('buyers/list', ['as' => 'buyers.list', 'uses' => 'BuyerController@all']);
Route::put('buyers/saveBuyer/{id}', ['as' => 'buyers.saveBuyer', 'uses' => 'BuyerController@createUpdate']);
Route::get('buyers/find/{id}', ['as' => 'buyers.find', 'uses' => 'BuyerController@find']);
Route::post('buyers/delete', ['as' => 'buyers.delete', 'uses' => 'BuyerController@destroy']);
Route::post('buyers/update', ['as' => 'buyers.update', 'uses' => 'BuyerController@update']);
Route::post('buyers/listUser', ['as' => 'buyers/listUser', 'uses' => 'UserController@all']);
Route::get('buyers/excel', ['as' => 'buyers.excel', 'uses' => 'BuyerController@excel']);


