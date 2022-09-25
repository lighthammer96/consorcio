<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 08/06/2017
 * Time: 12:39 PM
 */

namespace App\Http\Recopro\Requirement;

interface RequirementInterface
{
    public function search($filter);

    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function findByState($id);

    public function destroy($id);

    public function search_project($filter);
}