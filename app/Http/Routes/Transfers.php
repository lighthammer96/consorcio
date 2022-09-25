<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('transfers/list', ['as' => 'transfers.list', 'uses' => 'TransferController@all']);
Route::put('transfers/saveTransfer/{id}', ['as' => 'transfers.saveTransfer', 'uses' => 'TransferController@createUpdate']);
Route::post('transfers/delete', ['as' => 'transfers.delete', 'uses' => 'TransferController@destroy']);
Route::post('transfers/update', ['as' => 'transfers.update', 'uses' => 'TransferController@update']);
Route::get('transfers/find/{id}', ['as' => 'transfers.find', 'uses' => 'TransferController@find']);
Route::get('transfers/excel', ['as' => 'transfers.excel', 'uses' => 'TransferController@excel']);
Route::get('transfers/data_form', ['as' => 'transfers.data_form', 'uses' => 'TransferController@data_form']);
Route::post('transfers/uploadTransfer', 'TransferController@uploadTransfer');
Route::post('transfers/getArticlesWithWithoutProject', 'ProductController@getArticlesWithWithoutProject');
Route::put('transfers/saveTransferReferral/{id}', ['as' => 'transfers.saveTransferReferral', 'uses' => 'TransferController@createUpdateReferral']);
