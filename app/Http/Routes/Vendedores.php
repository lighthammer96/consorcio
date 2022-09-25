<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('vendedores/list', ['as' => 'vendedores.list', 'uses' => 'VendedoresController@all']);
Route::post('vendedores/create', ['as' => 'vendedores.create', 'uses' => 'VendedoresController@create']);
Route::post('vendedores/delete', ['as' => 'vendedores.delete', 'uses' => 'VendedoresController@destroy']);
Route::post('vendedores/update', ['as' => 'vendedores.update', 'uses' => 'VendedoresController@update']);
Route::get('vendedores/excel', ['as' => 'vendedores.excel', 'uses' => 'VendedoresController@excel']);