<?php
/**
 * Created by PhpStorm.
 * User: JAIR
 * Date: 5/3/2017
 * Time: 9:45 PM
 */

namespace App\Http\Controllers;

use App\Http\Recopro\Module\ModuleInterface;
use App\Http\Recopro\Permission\PermissionInterface;
use App\Http\Requests\PermissionRequest;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function all(ModuleInterface $module)
    {
        return response()->json([
            'validation_failed' => 0,
            'Records' => $module->getAllPermission()
        ]);
    }

    public function getPermissions(PermissionInterface $permission, Request $request)
    {
        $profile_id = $request->input('id');
        return response()->json([
            'validation_failed' => 0,
            'Records' => $permission->getByProfile($profile_id)
        ]);
    }

    public function add($p_id, PermissionInterface $permission, PermissionRequest $request)
    {
        if ($permission->save($request->all())) {
            $return = [
                'validation_failed' => 0
            ];
        } else {
            $return = [
                'validation_failed' => 1,
                'errors' => 'Hubo un error al registrar permisos. Actualice su navegador porfavor'
            ];
        }
        return response()->json($return);
    }

    public function del($p_id, PermissionInterface $permission, PermissionRequest $request)
    {
        $ids =  explode(',', $request->input('id'));
        foreach ($ids as $id) {
            $permission->destroy($id);
        }
        return response()->json([
            'validation_failed' => 0
        ]);
    }
}