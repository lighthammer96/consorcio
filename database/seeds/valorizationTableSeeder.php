<?php

use Illuminate\Database\Seeder;
use App\Http\Recopro\Module\Module;
use App\Http\Recopro\Permission\Permission;

class valorizationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $module11 = Module::create([
            'description' => 'Valorizaciones',
            'url' => 'valorizations',
            'parent_id' => 36,
        ]);
        Permission::create([
            'profile_id' => 1,
            'module_id' => $module11->id
        ]);
    }
}
