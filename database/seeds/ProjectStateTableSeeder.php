<?php

use Illuminate\Database\Seeder;
use App\Http\Recopro\ProjectState\ProjectState;

class ProjectStateTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProjectState::truncate();

        ProjectState::create([
            'description' => 'Registrado'
        ]);

        ProjectState::create([
            'description' => 'Activo'
        ]);

        ProjectState::create([
            'description' => 'Baja'
        ]);

        ProjectState::create([
            'description' => 'Inactivo'
        ]);
    }
}
