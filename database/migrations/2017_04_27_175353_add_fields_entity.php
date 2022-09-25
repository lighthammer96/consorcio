<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFieldsEntity extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('Entidad', function (Blueprint $table) {
            $table->boolean('is_client')->default(1);
            $table->boolean('is_provider')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('Entidad', function (Blueprint $table) {
            $table->dropColumn(['is_client', 'is_provider']);
        });
    }
}
