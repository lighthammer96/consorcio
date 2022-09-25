<?php

use Illuminate\Database\Seeder;
use App\Http\Recopro\Profile\Profile;
use App\Http\Recopro\Module\Module;
use App\Http\Recopro\Permission\Permission;
use App\Http\Recopro\User\User;

class SecurityTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create Profile
//        $profile = Profile::create([
//            'description' => 'Administrador'
//        ]);
        $profile = Profile::find(1);
        // Create User
//        User::create([
//            'name'		=> 'Admin',
//            'username'	=> 'admin',
//            'password'	=> bcrypt('123'),
//            'profile_id' => $profile->id
//        ]);

        // Create Module
        $parent = Module::create([
            'description' => 'Modulo Padre',
            'url' => '#',
            'parent_id' => 1
        ]);
        $module = Module::create([
            'description' => 'Seguridad',
            'url' => '#',
            'parent_id' => $parent->id,
            'icon' => 'lock'
        ]);
        $module1 = Module::create([
            'description' => 'Módulos',
            'url' => 'modules',
            'parent_id' => $module->id,
        ]);
        $module2 = Module::create([
            'description' => 'Perfiles',
            'url' => 'profiles',
            'parent_id' => $module->id,
        ]);
        $module3 = Module::create([
            'description' => 'Usuarios',
            'url' => 'users',
            'parent_id' => $module->id,
        ]);
        $module4 = Module::create([
            'description' => 'Permisos',
            'url' => 'permissions',
            'parent_id' => $module->id,
        ]);
        $module5 = Module::create([
            'description' => 'Configuración',
            'url' => 'config',
            'parent_id' => $module->id,
        ]);

        // Create Permissions
        Permission::create([
            'profile_id' => $profile->id,
            'module_id' => $module1->id
        ]);
        Permission::create([
            'profile_id' => $profile->id,
            'module_id' => $module2->id
        ]);
        Permission::create([
            'profile_id' => $profile->id,
            'module_id' => $module3->id
        ]);
        Permission::create([
            'profile_id' => $profile->id,
            'module_id' => $module4->id
        ]);
        Permission::create([
            'profile_id' => $profile->id,
            'module_id' => $module5->id
        ]);
    }
}
