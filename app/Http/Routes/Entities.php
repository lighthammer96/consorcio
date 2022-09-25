<?php

/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/6/2017
 * Time: 9:54 AM
 */

Route::post('entities/list', ['as' => 'entities.list', 'uses' => 'EntityController@all']);
Route::post('entities/create', ['as' => 'entities.create', 'uses' => 'EntityController@create']);
Route::post('entities/delete', ['as' => 'entities.delete', 'uses' => 'EntityController@destroy']);
Route::post('entities/update', ['as' => 'entities.update', 'uses' => 'EntityController@update']);
Route::post('entities/getTypePerson', ['as' => 'entities.getTypePerson', 'uses' => 'TypePersonController@getAll']);
Route::post('entities/getTypeDocumentIdentity', ['as' => 'entities.getTypeDocumentIdentity', 'uses' => 'TypeDocumentIdentityController@getAll']);
Route::get('entities/excel', ['as' => 'entities.excel', 'uses' => 'EntityController@excel']);
Route::get('entities/pdf', ['as' => 'entities.pdf', 'uses' => 'EntityController@pdf']);