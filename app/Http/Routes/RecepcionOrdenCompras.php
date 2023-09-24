<?php

Route::post('recepcionOrdenCompras/list', 'RecepcionOrdenCompraController@all');
Route::get('recepcionOrdenCompras/data_form', 'RecepcionOrdenCompraController@data_form');
//Route::put('recepcionOrdenCompras/save/{id}', 'Entrega_servicesTecnicoController@createUpdate');
Route::put('recepcionOrdenCompras/save/{id}', 'RecepcionOrdenCompraController@createUpdate');
//Route::get('recepcionOrdenCompras/find/{id}', 'Register_movementController@find');
Route::get('recepcionOrdenCompras/find/{id}', 'RecepcionOrdenCompraController@find');
Route::post('recepcionOrdenCompras/delete', 'RecepcionOrdenCompraController@destroy');
Route::post('recepcionOrdenCompras/listOC', 'RegisterOrdenCompraController@all');
Route::post('recepcionOrdenCompras/listLoc', 'LocalizationController@all');
Route::post('recepcionOrdenCompras/listSeries', 'SerieController@traerSeries');
Route::post('recepcionOrdenCompras/listLote', 'LotController@all');
Route::get('recepcionOrdenCompras/valida_series_serve/{id}', 'Register_movementController@valida_series_serve');
Route::get('recepcionOrdenCompras/validateCantSerie/{id}', 'Register_movementController@validateCantSerie');

Route::get('recepcionOrdenCompras/excel', 'RecepcionOrdenCompraController@excel');

Route::get('recepcionOrdenCompras/pdf', 'Register_movementController@pdf');

