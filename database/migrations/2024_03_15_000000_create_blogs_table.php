<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt');
            $table->longText('content');
            $table->string('image');
            $table->string('author_name');
            $table->string('author_avatar');
            $table->string('category');
            $table->timestamp('published_at');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('blogs');
    }
}; 