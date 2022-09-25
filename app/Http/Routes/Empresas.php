<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('empresas/list', ['as' => 'empresas.list', 'uses' => 'EmpresaController@all']);
Route::post('empresas/create', ['as' => 'empresas.create', 'uses' => 'EmpresaController@create']);
Route::post('empresas/delete', ['as' => 'empresas.delete', 'uses' => 'EmpresaController@destroy']);
Route::post('empresas/update', ['as' => 'empresas.update', 'uses' => 'EmpresaController@update']);
Route::get('empresas/excel', ['as' => 'empresas.excel', 'uses' => 'EmpresaController@excel']);