<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('tipos_movimiento/list', ['as' => 'tipos_movimiento.list', 'uses' => 'TiposMovimientoController@all']);
Route::post('tipos_movimiento/create', ['as' => 'tipos_movimiento.create', 'uses' => 'TiposMovimientoController@create']);
Route::post('tipos_movimiento/delete', ['as' => 'tipos_movimiento.delete', 'uses' => 'TiposMovimientoController@destroy']);
Route::post('tipos_movimiento/update', ['as' => 'tipos_movimiento.update', 'uses' => 'TiposMovimientoController@update']);
Route::get('tipos_movimiento/excel', ['as' => 'tipos_movimiento.excel', 'uses' => 'TiposMovimientoController@excel']);