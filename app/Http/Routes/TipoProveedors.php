<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('tipoProveedors/list', ['as' => 'tipoProveedors.list', 'uses' => 'TipoProveedorController@all']);
Route::post('tipoProveedors/create', ['as' => 'tipoProveedors.create', 'uses' => 'TipoProveedorController@create']);
Route::post('tipoProveedors/delete', ['as' => 'tipoProveedors.delete', 'uses' => 'TipoProveedorController@destroy']);
Route::post('tipoProveedors/update', ['as' => 'tipoProveedors.update', 'uses' => 'TipoProveedorController@update']);
Route::get('tipoProveedors/excel', ['as' => 'tipoProveedors.excel', 'uses' => 'TipoProveedorController@excel']);