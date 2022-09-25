<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('convenios/list', ['as' => 'convenios.list', 'uses' => 'ConveniosController@all']);
Route::post('convenios/create', ['as' => 'convenios.create', 'uses' => 'ConveniosController@create']);
Route::post('convenios/delete', ['as' => 'convenios.delete', 'uses' => 'ConveniosController@destroy']);
Route::post('convenios/update', ['as' => 'convenios.update', 'uses' => 'ConveniosController@update']);
Route::get('convenios/excel', ['as' => 'convenios.excel', 'uses' => 'ConveniosController@excel']);