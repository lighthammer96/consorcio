<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 5/3/2017
 * Time: 10:00 PM
 */

namespace App\Http\Recopro\Permission;


class PermissionRepository implements PermissionInterface
{
    public static $PARENT_ID = 1;

    protected $model;

    public function __construct(Permission $model)
    {
        $this->model = $model;
    }

    public function getByProfile($profile_id)
    {
        return $this->model->join('ERP_Modulos as m', 'ERP_Permisos.module_id', '=', 'm.id')
                            ->where('ERP_Permisos.profile_id', $profile_id)
                            ->where('m.parent_id', '<>', self::$PARENT_ID)
                            ->select('ERP_Permisos.id', 'm.description as modulo')
                            ->orderBy('m.description')
                            ->get();
    }

    public function save(array $data)
    {
        $permissions = explode(',', $data['id']);
        $profile_id = $data['profile_id'];

        foreach($permissions as $p)
        {
            $module_id = trim($p);
            $this->model->firstOrCreate([
                'profile_id' => $profile_id,
                'module_id' => $module_id
            ]);
        }
        return true;
    }

    public function destroy($id)
    {
        $model = $this->model->find($id);
        $model->forceDelete();
    }

}