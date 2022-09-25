<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('aprobacion/list', ['as' => 'aprobacion.list', 'uses' => 'AprobacionController@all']);
Route::post('aprobacion/create', ['as' => 'aprobacion.create', 'uses' => 'AprobacionController@create']);
Route::post('aprobacion/delete', ['as' => 'aprobacion.delete', 'uses' => 'AprobacionController@destroy']);
Route::post('aprobacion/update', ['as' => 'aprobacion.update', 'uses' => 'AprobacionController@update']);
Route::get('aprobacion/excel', ['as' => 'aprobacion.excel', 'uses' => 'AprobacionController@excel']);

Route::post('aprobacion/getTiendas', 'ShopController@getTiendas');

Route::put('aprobacion/saveAprobaSoli/{id}', ['as' => 'aprobacion.saveAprobaSoli', 'uses' => 'AprobacionController@createUpdate']);

Route::get('aprobacion/find/{id}', ['as' => 'aprobacion.find', 'uses' => 'AprobacionController@find']);

Route::get('aprobacion/deleteUsuario/{id}', ['as' => 'aprobacion.deleteUsuario', 'uses' => 'AprobacionController@deleteDetalle']);