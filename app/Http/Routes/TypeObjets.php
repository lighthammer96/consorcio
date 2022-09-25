<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('typeObjets/list', ['as' => 'typeObjets.list', 'uses' => 'TypeObjetController@all']);
Route::post('typeObjets/create', ['as' => 'typeObjets.create', 'uses' => 'TypeObjetController@create']);
Route::post('typeObjets/delete', ['as' => 'typeObjets.delete', 'uses' => 'TypeObjetController@destroy']);
Route::post('typeObjets/update', ['as' => 'typeObjets.update', 'uses' => 'TypeObjetController@update']);
Route::get('typeObjets/excel', ['as' => 'typeObjets.excel', 'uses' => 'TypeObjetController@excel']);
Route::post('typeObjets/getTipoObjetivo', 'TypeObjetController@getAll');