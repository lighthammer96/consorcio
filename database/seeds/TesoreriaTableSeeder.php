<?php

use Illuminate\Database\Seeder;
use App\Http\Recopro\Module\Module;
use App\Http\Recopro\Permission\Permission;

class TesoreriaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $module = Module::create([
            'description' => 'Tesoreria',
            'url' => '#',
            'parent_id' => 1,
            'icon' => 'suitcase'
        ]);
  	    $module1 = Module::create([
            'description' => 'Gastos de Caja Chica',
            'url' => 'cash_expense_girls',
            'parent_id' => $module->id,
        ]);
        $module2 = Module::create([
            'description' => 'Reposición de Caja',
            'url' => 'replenishment_cashs',
            'parent_id' => $module->id,
        ]);
        $module3 = Module::create([
            'description' => 'Cobros de Ventas',
            'url' => 'sales_charges',
            'parent_id' => $module->id,
        ]);
        $module4 = Module::create([
            'description' => 'Pagos de Compras y Gastos',
            'url' => 'purchase_payments',
            'parent_id' => $module->id,
        ]);
        $module5 = Module::create([
            'description' => 'Emisión de Cheques',
            'url' => 'writing_checks',
            'parent_id' => $module->id,
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
    }
}
