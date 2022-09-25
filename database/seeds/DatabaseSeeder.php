<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //  $this->call(SecurityTableSeeder::class);
//        $this->call(MaestrosTableSeeder::class);
        // $this->call(AlmacenTableSeeder::class);
//        $this->call(ComprasTableSeeder::class);
//        $this->call(ProyectoTableSeeder::class);
        //$this->call(TesoreriaTableSeeder::class);

        // $this->call(LevelsTableSeeder::class);
//        $this->call(TipoTableSeeder::class);
//        $this->call(CompradoresTableSeeder::class);
//        $this->call(FrentesTableSeeder::class);
        //     $this->call(ConfigsTableSeeder::class);
//        $this->call(AprovadoresProyectosTableSeeder::class);

//          $this->call(ConfigsTableSeeder::class);
//        //$this->call(AprovadoresProyectosTableSeeder::class);
//        // $this->call(valorizationTableSeeder::class);
//        $this->call(ConfigsTableSeeder::class);
//        //$this->call(AprovadoresProyectosTableSeeder::class);
//        $this->call(valorizationTableSeeder::class);
        $this->call(ReportsTableSeeder::class);
    }
}
