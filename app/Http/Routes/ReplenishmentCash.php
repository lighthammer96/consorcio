<?php

Route::post('replenishment_cashs/list', 'ReplenishmentCashController@all');
Route::get('replenishment_cashs/data_form', 'ReplenishmentCashController@data_form');
Route::put('replenishment_cashs/save/{id}', 'ReplenishmentCashController@createUpdate');
Route::get('replenishment_cashs/find/{id}', 'ReplenishmentCashController@find');
Route::post('replenishment_cashs/delete', 'ReplenishmentCashController@destroy');
Route::get('replenishment_cashs/validTypeChange/{date}', 'TypeChangeController@validTypeChangePeriod');
Route::get('replenishment_cashs/findBankAccount/{id}', 'ReplenishmentCashController@findBankAccount');
Route::post('replenishment_cashs/getPettyCash', 'PettyCashController@getPettyCash');
Route::post('replenishment_cashs/getPaymentMethod', 'FormasPagoController@all');