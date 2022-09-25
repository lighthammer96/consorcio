<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('carroceria/list', ['as' => 'carroceria.list', 'uses' => 'CarroceriaController@all']);
Route::post('carroceria/create', ['as' => 'carroceria.create', 'uses' => 'CarroceriaController@create']);
Route::post('carroceria/delete', ['as' => 'carroceria.delete', 'uses' => 'CarroceriaController@destroy']);
Route::post('carroceria/update', ['as' => 'carroceria.update', 'uses' => 'CarroceriaController@update']);
Route::get('carroceria/excel', ['as' => 'carroceria.excel', 'uses' => 'CarroceriaController@excel']);