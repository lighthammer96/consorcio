<?php

use App\Http\Recopro\Module\Module;
use App\Http\Recopro\Permission\Permission;

use Illuminate\Database\Seeder;

class ReportsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $profile_id = 1;
        $parent_id = 1;

        $module = Module::create([
            'description' => 'Reportes',
            'url' => '#',
            'parent_id' => $parent_id,
            'icon' => 'th-list',
        ]);
        $module1 = Module::create([
            'description' => 'Stock',
            'url' => 'stocks',
            'parent_id' => $module->id,
            'order' => 1
        ]);




        Permission::create([
            'profile_id' => $profile_id,
            'module_id' => $module1->id
        ]);
    }
}
