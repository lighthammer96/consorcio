<?php

use App\Http\Recopro\Level\Level;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddLevelApuToLevelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ERP_Niveles', function (Blueprint $table) {
            $table->integer('type_apu')->unsigned()->default(0);
        });
        foreach (Level::all() as $l) {
            if (($l->parent && $l->parent->type_apu == 1) || $l->code == '14') {
                $l->type_apu = 1;
                $l->save();
            } elseif (($l->parent && $l->parent->type_apu == 2) || $l->code == '15') {
                $l->type_apu = 2;
                $l->save();
            } elseif (($l->parent && $l->parent->type_apu == 3) || $l->code == '16') {
                $l->type_apu = 3;
                $l->save();
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ERP_Niveles', function (Blueprint $table) {
            $table->dropColumn('type_apu');
        });
    }
}
