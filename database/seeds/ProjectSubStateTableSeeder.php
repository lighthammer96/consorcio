<?php

use Illuminate\Database\Seeder;
use App\Http\Recopro\ProjectSubState\ProjectSubState;

class ProjectSubStateTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProjectSubState::truncate();

        ProjectSubState::create([
            'description' => 'Registrado'
        ]);

        ProjectSubState::create([
            'description' => 'Aprobar LB'
        ]);

        ProjectSubState::create([
            'description' => 'Aprobado LB'
        ]);

        ProjectSubState::create([
            'description' => 'Aprobar PV'
        ]);

        ProjectSubState::create([
            'description' => 'Aprobado PV'
        ]);

        ProjectSubState::create([
            'description' => 'Aprobar Meta'
        ]);

        ProjectSubState::create([
            'description' => 'Aprobado Meta'
        ]);
    }
}
