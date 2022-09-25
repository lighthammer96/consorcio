<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('group_cas/list', ['as' => 'group_cas.list', 'uses' => 'Group_caController@all']);
Route::post('group_cas/create', ['as' => 'group_cas.create', 'uses' => 'Group_caController@create']);
Route::post('group_cas/delete', ['as' => 'group_cas.delete', 'uses' => 'Group_caController@destroy']);
Route::post('group_cas/update', ['as' => 'group_cas.update', 'uses' => 'Group_caController@update']);
Route::get('group_cas/excel', ['as' => 'group_cas.excel', 'uses' => 'Group_caController@excel']);