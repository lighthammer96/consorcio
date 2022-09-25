<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('resetearContrasenias/list', ['as' => 'resetearContrasenias.list', 'uses' => 'CategoryController@all']);
Route::post('resetearContrasenias/create', ['as' => 'resetearContrasenias.create', 'uses' => 'CategoryController@create']);
Route::post('resetearContrasenias/delete', ['as' => 'resetearContrasenias.delete', 'uses' => 'CategoryController@destroy']);
Route::post('resetearContrasenias/update', ['as' => 'resetearContrasenias.update', 'uses' => 'CategoryController@update']);
Route::get('resetearContrasenias/excel', ['as' => 'resetearContrasenias.excel', 'uses' => 'CategoryController@excel']);
Route::put('resetearContrasenias/reset/{id}', 'UserController@reset');
Route::get('resetearContrasenias/data_form', ['as' => 'resetearContrasenias.data_form', 'uses' => 'ProductController@data_form_dd']);


Route::put('resetearContrasenias/change_password_user/{id}', ['as' => 'resetearContrasenias.change_password_user', 'uses' => 'ResetPasswordController@change_password_post_user']);