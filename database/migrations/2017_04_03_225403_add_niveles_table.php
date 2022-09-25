<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNivelesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ERP_Niveles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description');
            $table->integer('parent_id')->unsigned();
            $table->integer('user_created')->unsigned()->default(1);
            $table->integer('user_updated')->unsigned()->default(1);
            $table->integer('user_deleted')->unsigned()->nullable()->default(null);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ERP_Niveles');
    }
}
