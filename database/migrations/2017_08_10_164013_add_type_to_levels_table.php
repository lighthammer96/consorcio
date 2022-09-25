<?php

use App\Http\Recopro\Level\Level;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTypeToLevelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ERP_Niveles', function (Blueprint $table) {
            $table->integer('type')->unsigned()->default(1);
        });
        foreach (Level::all() as $l) {
            if (($l->parent && $l->parent->type == 2) || $l->code == 17) {
                $l->type = 2;
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
            $table->dropColumn('type');
        });
    }
}
