<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/10/2017
 * Time: 10:38 AM
 */

Route::post('modules/list', ['as' => 'modules.list', 'uses' => 'ModuleController@all']);
Route::post('modules/create', ['as' => 'modules.create', 'uses' => 'ModuleController@create']);
Route::post('modules/delete', ['as' => 'modules.delete', 'uses' => 'ModuleController@destroy']);
Route::post('modules/update', ['as' => 'modules.update', 'uses' => 'ModuleController@update']);
Route::post('modules/parents', ['as' => 'modules.parents', 'uses' => 'ModuleController@parents']);