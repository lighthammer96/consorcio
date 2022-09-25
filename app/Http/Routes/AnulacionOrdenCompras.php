<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('anulacionOrdenCompras/list', ['as' => 'anulacionOrdenCompras.list', 'uses' => 'AnulacionOrdenCompraController@all']);
Route::post('anulacionOrdenCompras/create', ['as' => 'anulacionOrdenCompras.create', 'uses' => 'AnulacionOrdenCompraController@create']);
Route::post('anulacionOrdenCompras/delete', ['as' => 'anulacionOrdenCompras.delete', 'uses' => 'AnulacionOrdenCompraController@destroy']);
Route::post('anulacionOrdenCompras/update', ['as' => 'anulacionOrdenCompras.update', 'uses' => 'AnulacionOrdenCompraController@update']);
Route::get('anulacionOrdenCompras/excel', ['as' => 'anulacionOrdenCompras.excel', 'uses' => 'AnulacionOrdenCompraController@excel']);