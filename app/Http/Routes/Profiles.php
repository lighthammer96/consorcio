<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 4:02 PM
 */

Route::post('profiles/list', ['as' => 'profiles.list', 'uses' => 'ProfileController@all']);
Route::post('profiles/create', ['as' => 'profiles.create', 'uses' => 'ProfileController@create']);
Route::post('profiles/delete', ['as' => 'profiles.delete', 'uses' => 'ProfileController@destroy']);
Route::post('profiles/update', ['as' => 'profiles.update', 'uses' => 'ProfileController@update']);