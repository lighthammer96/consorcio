<?php

Route::post('petty_cash_expense/list', 'PettyCashExpenseController@all');
Route::get('petty_cash_expense/data_form', 'PettyCashExpenseController@data_form');
Route::put('petty_cash_expense/save/{id}', 'PettyCashExpenseController@createUpdate');
Route::get('petty_cash_expense/find/{id}', 'PettyCashExpenseController@find');
Route::post('petty_cash_expense/delete', 'PettyCashExpenseController@destroy');
Route::put('petty_cash_expense/saveDocument/{id}', 'AccountPayController@createUpdate');
Route::get('petty_cash_expense/findDocument/{id}', 'AccountPayController@find');
Route::put('petty_cash_expense/saveVoucher/{id}', 'GasVoucherController@createUpdate');
Route::get('petty_cash_expense/findVoucher/{id}', 'GasVoucherController@find');
Route::post('petty_cash_expense/getPettyCash', 'PettyCashController@getPettyCash');
Route::get('petty_cash_expense/validTypeChange/{date}', 'TypeChangeController@validTypeChangePeriod');
Route::get('petty_cash_expense/documents/{id}', 'PettyCashExpenseController@documents');
Route::post('petty_cash_expense/getClassificationAcquisition', 'ClassificationAcquisitionController@getClassificationAcquisition');
Route::post('petty_cash_expense/getDocumentType', 'DocumentTypeController@getDocumentType');
Route::post('petty_cash_expense/providersList', 'EntityController@providers');
Route::post('petty_cash_expense/getCC', 'PlanAccountController@all');
Route::post('petty_cash_expense/getCCe', 'CostCenterController@all');
Route::get('petty_cash_expense/excel/{id}', 'PettyCashExpenseController@excel');
Route::put('petty_cash_expense/saveDocumentClose/{id}', 'PettyCashExpenseCloseController@createUpdate');
Route::get('petty_cash_expense/findDocumentClose/{id}', 'PettyCashExpenseCloseController@find');