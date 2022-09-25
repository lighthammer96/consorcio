<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompradoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('ERP_Compradores', function (Blueprint $table) {
          $table->increments('id');
          $table->string('code');
          $table->string('description');
          $table->boolean('state')->default(true);
          $table->integer('user_id');
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
        Schema::dropIfExists('ERP_Compradores');
    }
}
