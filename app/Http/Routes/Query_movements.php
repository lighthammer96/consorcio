<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('query_movements/list', 'Query_movementsController@all');
Route::post('query_movements/create', ['as' => 'query_movements.create', 'uses' => 'Query_movementsController@create']);
Route::post('query_movements/delete', ['as' => 'query_movements.delete', 'uses' => 'Query_movementsController@destroy']);
Route::post('query_movements/update', ['as' => 'query_movements.update', 'uses' => 'Query_movementsController@update']);
Route::get('query_movements/excel', 'Query_movementsController@excel');
Route::get('query_movements/getDataFiltro', 'Query_movementsController@getDataFiltro');
Route::get('query_movements/pdf', ['as' => 'query_movements.pdf', 'uses' => 'Query_movementsController@pdf']);