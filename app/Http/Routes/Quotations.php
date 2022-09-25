<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 22/06/2017
 * Time: 04:56 PM
 */
Route::post('contests/list', 'QuotationController@all');
Route::put('contests/save/{id}', 'QuotationController@createUpdate');
Route::put('contests/saveProvider/{id}', 'ContestProviderController@createUpdate');
Route::get('contests/find/{id}', 'QuotationController@find');
Route::post('contests/delete', 'QuotationController@destroy');
Route::get('contests/data_form', 'QuotationController@data_form');
Route::post('contests/requirementsList', 'RequirementController@all');
Route::post('contests/providersList', 'EntityController@providers');
Route::post('contests/providersItemsList', 'ContestConsolidatedController@itemsList');
Route::get('contests/consolidatedRequirement', 'ContestConsolidatedController@all');
Route::get('contests/consolidatedRequirementExcel', 'ContestConsolidatedController@excel');
Route::get('contests/consolidatedRequirementPDF', 'ContestConsolidatedController@pdf');
Route::post('contests/uploadProvider', 'ContestProviderController@uploadProvider');
Route::get('contests/findContestProvider/{id}', 'ContestProviderController@find');
Route::get('contests/detailContestProvider/{id}', 'ContestProviderController@findDetail');
Route::put('contests/saveComparisonQuotation/{id}', 'QuotationController@UpdateCompare');
Route::put('contests/sendApproval/{id}', 'QuotationController@sendApproval');
Route::put('contests/cancelContest/{id}', 'QuotationController@cancelContest');
Route::get('contests/findContestProviderDocument/{id}', 'ContestProviderController@findDocument');
Route::get('contests/listQuotes/{id}', 'ContestProviderController@findQuotes');
Route::get('contests/autonomyApproval', ['as' => 'contests.autonomyApproval', 'uses' => 'QuotationController@autonomyApproval']);

Route::get('contests/consolidatedRequirementDetail', 'QuotationController@compareQuotation');
Route::get('contests/quotationsProviders/{id}', 'ContestProviderController@quotationsProviders');

//cambiado por dinamico compare
Route::get('contests/quotationsConsolidated/{id}', 'QuotationController@compareConsolidated');
// find

