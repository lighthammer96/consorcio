<?php

/**
 * Created by PhpStorm.
 * User: Lenovo
 * Date: 03/04/2017
 * Time: 03:50 PM
 */
namespace App\Http\Recopro\Module;

interface ModuleInterface
{
    public function search($s);

    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);

    public function getParents();

    public function getParentsAll();

    public function getAllPermission();

    public function getByProfileParent($profile_id, $parent_id);

    public function getByProfileUrl($profile_id, $url);
}