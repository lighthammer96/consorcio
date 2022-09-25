<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 5/3/2017
 * Time: 9:59 PM
 */

namespace App\Http\Recopro\Permission;

interface PermissionInterface
{
    public function getByProfile($profile_id);

    public function save(array $data);

    public function destroy($id);
}