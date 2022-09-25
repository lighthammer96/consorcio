<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('query_stocks/list', ['as' => 'query_stocks.list', 'uses' => 'Query_stockController@all']);
Route::post('query_stocks/create', ['as' => 'query_stocks.create', 'uses' => 'Query_stockController@create']);
Route::post('query_stocks/delete', ['as' => 'query_stocks.delete', 'uses' => 'Query_stockController@destroy']);
Route::post('query_stocks/update', ['as' => 'query_stocks.update', 'uses' => 'Query_stockController@update']);
Route::get('query_stocks/excel', ['as' => 'query_stocks.excel', 'uses' => 'Query_stockController@excel']);
Route::get('query_stocks/getDataFiltro', 'Query_stockController@getDataFiltro');
Route::get('query_stocks/get_localizacion/{id}', ['as' => 'query_stocks.get_localizacion', 'uses' => 'Query_stockController@get_localizacion_al']);
Route::get('query_stocks/pdf', ['as' => 'query_stocks.pdf', 'uses' => 'Query_stockController@pdf']);
