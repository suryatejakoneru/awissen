<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->timestamps();
        });

        // Insert default settings
        $this->seedDefaultSettings();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }

    /**
     * Seed default settings
     */
    private function seedDefaultSettings(): void
    {
        $settings = [
            'site_name' => 'Awissen',
            'site_description' => 'A Laravel application',
            'contact_email' => 'contact@example.com',
            'contact_phone' => '',
            'contact_address' => '',
            'social_media_facebook' => '',
            'social_media_twitter' => '',
            'social_media_instagram' => '',
            'social_media_linkedin' => '',
            'branding_logo' => '',
            'branding_logo_light' => '',
            'branding_logo_dark' => '',
            'branding_icon_light' => '',
            'branding_icon_dark' => '',
            'branding_favicon' => '',
            'branding_footer_logo' => '',
            'maintenance_mode' => '0',
        ];

        foreach ($settings as $key => $value) {
            DB::table('settings')->insert([
                'key' => $key,
                'value' => $value,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
};