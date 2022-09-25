<?php

use Illuminate\Database\Seeder;
use App\Http\Recopro\Module\Module;
use App\Http\Recopro\Permission\Permission;

class ProyectoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $module = Module::create([
            'description' => 'Proyectos',
            'url' => '#',
            'parent_id' => 1,
            'icon' => 'tasks'
        ]);
        $module1 = Module::create([
            'description' => 'Proyectos',
            'url' => 'projects',
            'parent_id' => $module->id,
        ]);
        $module2 = Module::create([
            'description' => 'Facturación Directa',
            'url' => 'direct_billing',
            'parent_id' => $module->id,
            'order' => 1
        ]);

        Permission::create([
            'profile_id' => 1,
            'module_id' => $module1->id
        ]);

        Permission::create([
            'profile_id' => 1,
            'module_id' => $module2->id
        ]);
    }
}
