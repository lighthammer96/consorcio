<?php

use App\Http\Recopro\Project\Project;
use Illuminate\Database\Seeder;

class ProjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Project::create([
            'code' => 'P000000001',
            'description' => 'PP - PROYECTO PRUEBA'
        ]);
    }
}
