<?php
// Autor: EVER 

Route::put('configs/saveConfig/{id}', ['as' => 'configs.update', 'uses' => 'ConfigController@update']);
Route::get('configs/all', ['as' => 'configs.all', 'uses' => 'ConfigController@getConfigs']);