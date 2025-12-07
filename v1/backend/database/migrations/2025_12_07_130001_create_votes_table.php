<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('poll_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('encrypted_user_hash');
            $table->enum('vote_type', ['up', 'down']);
            $table->timestamps();

            $table->unique(['poll_id', 'user_id']);
            $table->index('encrypted_user_hash');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('votes');
    }
};
