<?php

use App\Http\Recopro\Module\Module;
use App\Http\Recopro\Permission\Permission;
use Illuminate\Database\Seeder;

class MaestrosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        $mod= Module::where('description', 'Maestros')->first();
//
//        Module::where('parent_id', $mod->id)->delete();

        $profile_id = 1;
        $parent_id = 1;

        $module = Module::create([
            'description' => 'Maestros',
            'url' => '#',
            'parent_id' => $parent_id,
            'icon' => 'cogs',
        ]);
        $module1 = Module::create([
            'description' => 'Marcas',
            'url' => 'brands',
            'parent_id' => $module->id,
            'order' => 1
        ]);
        $module2 = Module::create([
            'description' => 'Entidades',
            'url' => 'entities',
            'parent_id' => $module->id,
            'order' => 2
        ]);
        $module3 = Module::create([
            'description' => 'Artículos',
            'url' => 'articles',
            'parent_id' => $module->id,
            'order' => 3
        ]);
        $module4 = Module::create([
            'description' => 'Recursos',
            'url' => 'resources',
            'parent_id' => $module->id,
            'order' => 4
        ]);
        $module5 = Module::create([
            'description' => 'Almacenes',
            'url' => 'warehouses',
            'parent_id' => $module->id,
            'order' => 5
        ]);
        $module6 = Module::create([
            'description' => 'Tipo de Cambio',
            'url' => 'type_change',
            'parent_id' => $module->id,
            'order' => 6
        ]);
        $module7 = Module::create([
            'description' => 'Compradores',
            'url' => 'buyers',
            'parent_id' => $module->id,
            'order' => 7
        ]);
        $module8 = Module::create([
            'description' => 'Frentes',
            'url' => 'fronts',
            'parent_id' => $module->id,
            'order' => 8
        ]);
        $module9 = Module::create([
            'description' => 'Caja Chica',
            'url' => 'petty_cash',
            'parent_id' => $module->id,
            'order' => 9
        ]);
        $module10 = Module::create([
            'description' => 'Condición Pago',
            'url' => 'payment_condition',
            'parent_id' => $module->id,
            'order' => 10
        ]);


        Permission::create([
            'profile_id' => $profile_id,
            'module_id' => $module1->id
        ]);
        Permission::create([
            'profile_id' => $profile_id,
            'module_id' => $module2->id
        ]);
        Permission::create([
            'profile_id' => $profile_id,
            'module_id' => $module3->id
        ]);
        Permission::create([
            'profile_id' => $profile_id,
            'module_id' => $module4->id
        ]);
        Permission::create([
            'profile_id' => $profile_id,
            'module_id' => $module5->id
        ]);
        Permission::create([
            'profile_id' => $profile_id,
            'module_id' => $module6->id
        ]);
        Permission::create([
            'profile_id' => $profile_id,
            'module_id' => $module7->id
        ]);
        Permission::create([
            'profile_id' => $profile_id,
            'module_id' => $module8->id
        ]);
        Permission::create([
            'profile_id' => $profile_id,
            'module_id' => $module9->id
        ]);
        Permission::create([
            'profile_id' => $profile_id,
            'module_id' => $module10->id
        ]);
    }
}
