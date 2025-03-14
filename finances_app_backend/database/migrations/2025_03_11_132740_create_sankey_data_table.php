<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('sankey_data', function (Blueprint $table) {
            $table->id();
            $table->string('from');
            $table->string('to');
            $table->decimal('amount', 10, 2);
            $table->string('type');
            $table->foreignId('parent_id')->nullable()->constrained('sankey_data')->nullOnDelete();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sankey_data');
    }
};
