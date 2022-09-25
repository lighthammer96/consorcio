<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 12/07/2017
 * Time: 06:33 PM
 */
Route::post('referral_guides/list', ['as' => 'referral_guides.list', 'uses' => 'ReferralGuideController@all']);
Route::post('referral_guides/listEntity', ['as' => 'referral_guides.listEntity', 'uses' => 'EntityController@all']);
Route::get('referral_guides/data_form', 'ReferralGuideController@data_form')->name('referral_guides.data_form');
Route::post('referral_guides/getProjects', 'ProjectController@all');
Route::get('referral_guides/getMatrix/{id}', 'ProjectConsolidatedController@getMatrix');
Route::put('referral_guides/saveReferralGuide/{id}', ['as' => 'referral_guides.saveReferralGuide', 'uses' => 'ReferralGuideController@createUpdate']);
Route::put('referral_guides/saveSerial/{id}', ['as' => 'referral_guides.saveSerial', 'uses' => 'ReferralGuideController@createUpdateSerial']);
Route::get('referral_guides/find/{id}', ['as' => 'referral_guides.find', 'uses' => 'ReferralGuideController@find']);
Route::get('referral_guides/referralGuidePDF', 'ReferralGuideController@pdf');
Route::get('referral_guides/data_search', 'ReferralGuideController@data_search')->name('referral_guides.data_search');
Route::get('referral_guides/excel', ['as' => 'referral_guides.excel', 'uses' => 'ReferralGuideController@excel']);