<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('tipoTraslados/list', ['as' => 'tipoTraslados.list', 'uses' => 'TipoTrasladoController@all']);
Route::post('tipoTraslados/create', ['as' => 'tipoTraslados.create', 'uses' => 'TipoTrasladoController@create']);
Route::post('tipoTraslados/delete', ['as' => 'tipoTraslados.delete', 'uses' => 'TipoTrasladoController@destroy']);
Route::post('tipoTraslados/update', ['as' => 'tipoTraslados.update', 'uses' => 'TipoTrasladoController@update']);
Route::get('tipoTraslados/excel', ['as' => 'tipoTraslados.excel', 'uses' => 'TipoTrasladoController@excel']);