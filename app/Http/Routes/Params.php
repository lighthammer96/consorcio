<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 5/19/2017
 * Time: 6:40 PM
 */

Route::post('params/list', 'ParamController@all');
Route::post('params/create', 'ParamController@create');
Route::post('params/delete', 'ParamController@destroy');
Route::post('params/update', 'ParamController@update');