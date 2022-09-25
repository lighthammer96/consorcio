<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('cuentas_bancarias/list', ['as' => 'cuentas_bancarias.list', 'uses' => 'CuentasBancariasController@all']);
Route::post('cuentas_bancarias/create', ['as' => 'cuentas_bancarias.create', 'uses' => 'CuentasBancariasController@create']);
Route::post('cuentas_bancarias/delete', ['as' => 'cuentas_bancarias.delete', 'uses' => 'CuentasBancariasController@destroy']);
Route::post('cuentas_bancarias/update', ['as' => 'cuentas_bancarias.update', 'uses' => 'CuentasBancariasController@update']);
Route::get('cuentas_bancarias/excel', ['as' => 'cuentas_bancarias.excel', 'uses' => 'CuentasBancariasController@excel']);

Route::post('cuentas_bancarias/getBancos', 'BancosController@getAll');