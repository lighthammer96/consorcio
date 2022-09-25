<?php

use Illuminate\Database\Seeder;
use App\Http\Recopro\Module\Module;
use App\Http\Recopro\Permission\Permission;

class ComprasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $module = Module::create([
            'description' => 'Compras',
            'url' => '#',
            'parent_id' => 1,
            'icon' => 'shopping-cart'
        ]);
        $module1 = Module::create([
            'description' => 'Requerimientos',
            'url' => 'requirements',
            'parent_id' => $module->id,
            'order' => 0
        ]);
        $module2 = Module::create([
            'description' => 'Requerimientos vs Cotización',
            'url' => 'requirements_quotations',
            'parent_id' => $module->id,
            'order' => 5
        ]);
        $module3 = Module::create([
            'description' => 'Aprobación de Requerimientos',
            'url' => 'approval_requirements',
            'parent_id' => $module->id,
            'order' => 1
        ]);
        $module4 = Module::create([
            'description' => 'Asignación de Requerimientos a Compradores',
            'url' => 'assignment_requirements',
            'parent_id' => $module->id,
            'order' => 2
        ]);
        $module5 = Module::create([
            'description' => 'Cotización',
            'url' => 'quotations',
            'parent_id' => $module->id,
            'order' => 3
        ]);
        $module6 = Module::create([
            'description' => 'Aprobación de Cotizaciones',
            'url' => 'approval_quotations',
            'parent_id' => $module->id,
            'order' => 4
        ]);
        $module7 = Module::create([
            'description' => 'Orden de compra',
            'url' => 'purchase_orders',
            'parent_id' => $module->id,
            'order' => 6
        ]);
        $module8 = Module::create([
            'description' => 'Aprobación de Orden de compra',
            'url' => 'approval_purchase_orders',
            'parent_id' => $module->id,
            'order' => 7
        ]);
        $module9 = Module::create([
            'description' => 'Autonomias de Aprobación',
            'url' => 'approval_autonomy',
            'parent_id' => $module->id,
            'order' => 8
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

        Permission::create([
            'profile_id' => 1,
            'module_id' => $module9->id
        ]);
    }
}
