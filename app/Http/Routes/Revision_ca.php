<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('revision_cas/list', ['as' => 'revision_cas.list', 'uses' => 'Revision_caController@all']);
Route::post('revision_cas/create', ['as' => 'revision_cas.create', 'uses' => 'Revision_caController@create']);
Route::post('revision_cas/delete', ['as' => 'revision_cas.delete', 'uses' => 'Revision_caController@destroy']);
Route::post('revision_cas/update', ['as' => 'revision_cas.update', 'uses' => 'Revision_caController@update']);
Route::get('revision_cas/excel', ['as' => 'revision_cas.excel', 'uses' => 'Revision_caController@excel']);
Route::post('revision_cas/getGrupo', 'Group_caController@getAll');