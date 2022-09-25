<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('typePersonas/list', ['as' => 'typePersonas.list', 'uses' => 'TypePersonaController@all']);
Route::post('typePersonas/create', ['as' => 'typePersonas.create', 'uses' => 'TypePersonaController@create']);
Route::post('typePersonas/delete', ['as' => 'typePersonas.delete', 'uses' => 'TypePersonaController@destroy']);
Route::post('typePersonas/update', ['as' => 'typePersonas.update', 'uses' => 'TypePersonaController@update']);
Route::get('typePersonas/excel', ['as' => 'typePersonas.excel', 'uses' => 'TypePersonaController@excel']);