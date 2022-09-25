<?php

use Illuminate\Database\Seeder;
use App\Http\Recopro\Level\Level;

class LevelsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Level::create(['description'=>'GERENCIA GENERAL', 'parent_id'=>0]);
        Level::create(['description'=>'GERENCIA ESTRATEGICA', 'parent_id'=>0]);
        $obr = Level::create(['description'=>'OBRAS', 'parent_id'=>0]);
        $gas = Level::create(['description'=>'GASTOS', 'parent_id'=>$obr->id]);
        Level::create(['description'=>'GG INDIRECTO', 'parent_id'=>$gas->id]);
        Level::create(['description'=>'GG DIRECTO', 'parent_id'=>$gas->id]);
        $mat = Level::create(['description'=>'MATERIALES', 'parent_id'=>$gas->id]);
        Level::create(['description'=>'POSTES Y ACCESORIOS', 'parent_id'=>$mat->id]);
    }
}
