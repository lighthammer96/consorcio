<?php
/**
 * Created by PhpStorm.
 * User: EVER
 * Date: 15/06/2017
 * Time: 11:58 AM
 */
Route::post('migrations/list', ['as' => 'migrations.list', 'uses' => 'MigrationController@all']);
Route::put('migrations/saveMigration/{id}', ['as' => 'migrations.saveMigration', 'uses' => 'MigrationController@create']);
Route::post('migrations/delete', ['as' => 'migrations.delete', 'uses' => 'MigrationController@destroy']);

