<?php

use App\Http\Recopro\Unity\Unity;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSymbolToUnitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('UnidadMedida', function (Blueprint $table) {
            $table->string('symbol')->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('UnidadMedida', function (Blueprint $table) {
            $table->dropColumn('symbol');
        });
    }
}
