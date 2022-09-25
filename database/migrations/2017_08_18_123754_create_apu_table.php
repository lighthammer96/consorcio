<?php

use App\Http\Recopro\Level\Level;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateApuTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('ERP_SubProyectoNiveles', function (Blueprint $table) {
            $table->decimal('apu_hh', 18, 2)->default(0);
            $table->decimal('apu_hq', 18, 2)->default(0);
            $table->decimal('apu_total_mo', 18, 2)->default(0);
            $table->decimal('apu_total_mat', 18, 2)->default(0);
            $table->decimal('apu_total_eq', 18, 2)->default(0);
            $table->decimal('apu_total_sc', 18, 2)->default(0);
        });
        Schema::create('ERP_AnalisisPreciosUnitarios', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('sub_project_level_id')->unsigned();
            $table->string('level_id')->nullable();
            $table->integer('type')->unsigned();
            $table->decimal('quantity', 18, 2)->default(0);
            $table->decimal('q_unity', 18, 2)->nullable()->default(null);
            $table->decimal('price', 18, 2)->default(0);
            $table->decimal('partial', 18, 2)->default(0);
            $table->integer('user_created')->unsigned()->default(1);
            $table->integer('user_updated')->unsigned()->default(1);
            $table->integer('user_deleted')->unsigned()->nullable()->default(null);
            $table->timestamps();
            $table->softDeletes();
        });
        foreach (Level::all() as $l) {
            if (($l->parent && $l->parent->type_apu == 4) || $l->code == '17') {
                $l->type_apu = 4;
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
        Schema::dropIfExists('ERP_AnalisisPreciosUnitarios');

        Schema::table('ERP_SubProyectoNiveles', function (Blueprint $table) {
            $table->dropColumn(['apu_hh', 'apu_hq', 'apu_total_mo', 'apu_total_mat', 'apu_total_eq', 'apu_total_sc']);
        });
    }
}
