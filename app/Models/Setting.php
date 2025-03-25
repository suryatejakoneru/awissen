<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = ['key', 'value'];

    /**
     * Get all settings formatted for the frontend
     *
     * @return array
     */
    public static function getAllSettings()
    {
        $settings = self::all()->pluck('value', 'key')->toArray();
        
        // Format the settings into the structure expected by the frontend
        return [
            'site_name' => $settings['site_name'] ?? '',
            'site_description' => $settings['site_description'] ?? '',
            'contact_email' => $settings['contact_email'] ?? '',
            'contact_phone' => $settings['contact_phone'] ?? '',
            'contact_address' => $settings['contact_address'] ?? '',
            'social_media' => [
                'facebook' => $settings['social_media_facebook'] ?? '',
                'twitter' => $settings['social_media_twitter'] ?? '',
                'instagram' => $settings['social_media_instagram'] ?? '',
                'linkedin' => $settings['social_media_linkedin'] ?? '',
            ],
            'branding' => [
                'logo' => $settings['branding_logo'] ?? '',
                'logo_light' => $settings['branding_logo_light'] ?? '',
                'logo_dark' => $settings['branding_logo_dark'] ?? '',
                'icon_light' => $settings['branding_icon_light'] ?? '',
                'icon_dark' => $settings['branding_icon_dark'] ?? '',
                'favicon' => $settings['branding_favicon'] ?? '',
                'footer_logo' => $settings['branding_footer_logo'] ?? '',
            ],
            'maintenance_mode' => (bool)($settings['maintenance_mode'] ?? false),
        ];
    }
}