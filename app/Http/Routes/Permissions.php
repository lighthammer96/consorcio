<?php

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 5/3/2017
 * Time: 9:41 PM
 */

Route::get('permissions/getProfiles', ['as' => 'permissions.getProfiles', 'uses' => 'ProfileController@getAll']);
Route::get('permissions/list', ['as' => 'permissions.list', 'uses' => 'PermissionController@all']);
Route::get('permissions/getPermissions', ['as' => 'permissions.getPermissions', 'uses' => 'PermissionController@getPermissions']);
Route::put('permissions/add/{id}', ['as' => 'permissions.add', 'uses' => 'PermissionController@add']);
Route::put('permissions/del/{id}', ['as' => 'permissions.del', 'uses' => 'PermissionController@del']);