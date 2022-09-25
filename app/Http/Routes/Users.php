<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 5/3/2017
 * Time: 6:10 PM
 */

Route::post('users/list', 'UserController@all');
Route::post('users/create', 'UserController@create');
Route::post('users/delete', 'UserController@destroy');
Route::post('users/update', 'UserController@update');
Route::post('users/getProfiles', 'ProfileController@getAll');
Route::post('users/getAll', 'UserController@getAll');
Route::post('users/supervisors', 'UserController@supervisors');
Route::put('users/reset/{id}', 'UserController@reset');