<?php

use App\Http\Recopro\RequirementState\RequirementState;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RequirementStateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        RequirementState::truncate();

        RequirementState::create([
            'description' => 'Registrado'
        ]);
        RequirementState::create([
            'description' => 'Enviado a Aprobación'
        ]);
        RequirementState::create([
            'description' => 'Aprobado'
        ]);
        RequirementState::create([
            'description' => 'Cancelado'
        ]);
        RequirementState::create([
            'description' => 'Rechazado'
        ]);
        RequirementState::create([
            'description' => 'Asignado'
        ]);
    }
}
