<?php
/**
 * Created by PhpStorm.
 * User: Jair Vasquez
 * Date: 09/06/2017
 * Time: 12:10 PM
 */

namespace App\Http\Recopro\Project;

interface ProjectInterface
{
    public function search($filter);

    public function searchApproval($filter);

    public function searchSelect($filter);

    public function all();

    public function create(array $attributes);

    public function update($id, array $attributes);

    public function find($id);

    public function destroy($id);
}