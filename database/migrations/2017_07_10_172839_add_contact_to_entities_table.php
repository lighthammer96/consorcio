<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddContactToEntitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('Entidad', function (Blueprint $table) {
            $table->string('contact')->nullable()->default(null);
            $table->string('contact_phone')->nullable()->default(null);
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
            $table->dropColumn(['contact', 'contact_phone']);
        });
    }
}
