<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('series/list', ['as' => 'series.list', 'uses' => 'SerieController@all']);
Route::post('series/create', ['as' => 'series.create', 'uses' => 'SerieController@create']);
Route::post('series/delete', ['as' => 'series.delete', 'uses' => 'SerieController@destroy']);
Route::post('series/update', ['as' => 'series.update', 'uses' => 'SerieController@update']);
Route::get('series/excel', ['as' => 'series.excel', 'uses' => 'SerieController@excel']);


Route::get('series/data_form', ['as' => 'series.data_form', 'uses' => 'SerieController@data_form']);

Route::post('series/getArticulos', 'ProductController@getAll'); 
Route::post('series/getArticulosSelect', ['as' => 'series.getArticulosSelect', 'uses' => 'ProductController@traeAll']);

Route::post('series/getArticulosSerie', ['as' => 'series.getArticulosSerie', 'uses' => 'ProductController@traeAllSerie']);

Route::put('series/createserie/{id}', ['as' => 'series.createserie', 'uses' => 'SerieController@createUpdate']);

Route::put('series/createserie_varios/{id}', ['as' => 'series.createserie_varios', 'uses' => 'SerieController@createUpdateVarios']);

Route::get('series/find/{id}', ['as' => 'series.find', 'uses' => 'SerieController@find']);


Route::post('series/validar_registro', ['as' => 'series.validar_registro', 'uses' => 'SerieController@validar_registro']);