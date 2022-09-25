<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 4/5/2017
 * Time: 6:59 PM
 */

Route::post('reception_transfers/list', ['as' => 'reception_transfers.list', 'uses' => 'ReceptionTransferController@all']);
Route::post('reception_transfers/delete', ['as' => 'reception_transfers.delete', 'uses' => 'ReceptionTransferController@destroy']);
Route::get('reception_transfers/find/{id}', ['as' => 'reception_transfers.find', 'uses' => 'ReceptionTransferController@find']);
Route::put('reception_transfers/saveReceptionTransfer/{id}', ['as' => 'reception_transfers.saveReceptionTransfer', 'uses' => 'ReceptionTransferController@update']);
Route::get('reception_transfers/excel', ['as' => 'reception_transfers.excel', 'uses' => 'ReceptionTransferController@excel']);

Route::get('reception_transfers/reception_transferPDF', 'ReceptionTransferController@pdf');