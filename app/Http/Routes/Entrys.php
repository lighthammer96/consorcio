<?php

/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 21/06/2017
 * Time: 03:21 PM
 */
Route::post('entrys/list', ['as' => 'entrys.list', 'uses' => 'EntryController@all']);
Route::post('entrys/listProduct', ['as' => 'entrys.listProduct', 'uses' => 'ProductController@all']);
Route::put('entrys/saveEntry/{id}', ['as' => 'entrys.saveEntry', 'uses' => 'EntryController@createUpdate']);
Route::get('entrys/data_form', ['as' => 'entrys.data_form', 'uses' => 'EntryController@data_form']);
Route::get('entrys/find/{id}', ['as' => 'entrys.find', 'uses' => 'EntryController@find']);
Route::post('entrys/delete', ['as' => 'entrys.delete', 'uses' => 'EntryController@destroy']);
Route::get('entrys/excel', ['as' => 'entrys.excel', 'uses' => 'EntryController@excel']);
Route::post('entrys/getArticles', 'ProductController@getArticles');