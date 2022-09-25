<?php

/**
 * Created by PhpStorm.
 * User: ever-pc
 * Date: 22/06/2017
 * Time: 12:18 AM
 */
Route::post('departures/list', ['as' => 'departures.list', 'uses' => 'DepartureController@all']);
Route::post('departures/listProduct', ['as' => 'departures.listProduct', 'uses' => 'ProductController@all']);
Route::put('departures/saveDeparture/{id}', ['as' => 'departures.saveDeparture', 'uses' => 'DepartureController@createUpdate']);
Route::get('departures/find/{id}', ['as' => 'departures.find', 'uses' => 'DepartureController@find']);
Route::get('departures/data_form', ['as' => 'departures.data_form', 'uses' => 'DepartureController@data_form']);
Route::get('departures/excel', ['as' => 'departures.excel', 'uses' => 'DepartureController@excel']);
Route::post('departures/delete', ['as' => 'departures.delete', 'uses' => 'DepartureController@destroy']);
Route::post('departures/getArticles', 'ProductController@getArticles');