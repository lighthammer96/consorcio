<?php

use Illuminate\Database\Seeder;
use App\Http\Recopro\Module\Module;
use App\Http\Recopro\Permission\Permission;

class AlmacenTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $module = Module::create([
            'description' => 'Almacen',
            'url' => '#',
            'parent_id' => 1,
            'icon' => 'building'
        ]);
        $module1 = Module::create([
            'description' => 'Ingreso',
            'url' => 'entrys',
            'parent_id' => $module->id,
            'order' => 6
        ]);
        $module2 = Module::create([
            'description' => 'Recepción de OC',
            'url' => 'receptions',
            'parent_id' => $module->id,
            'order' => 0
        ]);
        $module3 = Module::create([
            'description' => 'Consumo',
            'url' => 'consumptions',
            'parent_id' => $module->id,
            'order' => 4
        ]);
        $module4 = Module::create([
            'description' => 'Transferencia',
            'url' => 'transfers',
            'parent_id' => $module->id,
            'order' => 1
        ]);
        $module5 = Module::create([
            'description' => 'Guia de remisión',
            'url' => 'referral_guides',
            'parent_id' => $module->id,
            'order' => 3
        ]);
        $module6 = Module::create([
            'description' => 'Recepción de Transferencia',
            'url' => 'reception_transfers',
            'parent_id' => $module->id,
            'order' => 2
        ]);
        $module7 = Module::create([
            'description' => 'Salida',
            'url' => 'departures',
            'parent_id' => $module->id,
            'order' => 7
        ]);
        $module8 = Module::create([
            'description' => 'Devolución de Consumo',
            'url' => 'consumer_returns',
            'parent_id' => $module->id,
            'order' => 5
        ]);

        Permission::create([
            'profile_id' => 1,
            'module_id' => $module1->id
        ]);
        Permission::create([
            'profile_id' => 1,
            'module_id' => $module2->id
        ]);
        Permission::create([
            'profile_id' => 1,
            'module_id' => $module3->id
        ]);
        Permission::create([
            'profile_id' => 1,
            'module_id' => $module4->id
        ]);
        Permission::create([
            'profile_id' => 1,
            'module_id' => $module5->id
        ]);
        Permission::create([
            'profile_id' => 1,
            'module_id' => $module6->id
        ]);
        Permission::create([
            'profile_id' => 1,
            'module_id' => $module7->id
        ]);
        Permission::create([
            'profile_id' => 1,
            'module_id' => $module8->id
        ]);
    }
}
