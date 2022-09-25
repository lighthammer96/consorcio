<?php

/**
 * Created by PhpStorm.
 * User: EVER C.R
 * Date: 06/09/2017
 * Time: 03:44 PM
 */

Route::post('approval_contests/list', 'QuotationController@all');
Route::put('approval_contests/approveContest/{id}', 'ApprovalContestController@approveContest');
Route::get('approval_contests/find/{id}', 'QuotationController@find');
Route::get('approval_contests/findCompare/{id}', 'QuotationController@findCompare');
Route::get('approval_contests/quotationsProviders/{id}', 'ContestProviderController@quotationsProviders');
Route::get('approval_contests/consolidatedRequirementDetail', 'QuotationController@compareQuotation');
Route::put('approval_contests/rejectContest/{id}', 'ApprovalContestController@rejectContest');
Route::get('approval_contests/autonomyApproval', ['as' => 'approval_contests.autonomyApproval', 'uses' => 'ApprovalContestController@autonomyApproval']);