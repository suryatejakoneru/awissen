<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Setting;
use Illuminate\Support\Facades\Log;

class SettingsController extends Controller
{
    /**
     * Display the settings page.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        try {
            // Get all settings using the model method
            $settings = Setting::getAllSettings();
            
            // Log the settings for debugging
            Log::info('Initial settings load:', ['settings' => $settings]);
            
            return Inertia::render('admin/settings', [
                'settings' => $settings
            ]);
        } catch (\Exception $e) {
            Log::error('Settings page error: ' . $e->getMessage());
            
            // Return a basic page with error information
            return Inertia::render('admin/settings', [
                'error' => 'Error loading settings: ' . $e->getMessage(),
                'settings' => []
            ]);
        }
    }

    /**
     * Update the settings.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request)
    {
        try {
            $data = $request->all();
            
            // Update general settings
            Setting::updateOrCreate(['key' => 'site_name'], ['value' => $data['site_name'] ?? '']);
            Setting::updateOrCreate(['key' => 'site_description'], ['value' => $data['site_description'] ?? '']);
            
            // Update contact settings
            Setting::updateOrCreate(['key' => 'contact_email'], ['value' => $data['contact_email'] ?? '']);
            Setting::updateOrCreate(['key' => 'contact_phone'], ['value' => $data['contact_phone'] ?? '']);
            Setting::updateOrCreate(['key' => 'contact_address'], ['value' => $data['contact_address'] ?? '']);
            
            // Update social media settings
            if (isset($data['social_media'])) {
                Setting::updateOrCreate(['key' => 'social_media_facebook'], ['value' => $data['social_media']['facebook'] ?? '']);
                Setting::updateOrCreate(['key' => 'social_media_twitter'], ['value' => $data['social_media']['twitter'] ?? '']);
                Setting::updateOrCreate(['key' => 'social_media_instagram'], ['value' => $data['social_media']['instagram'] ?? '']);
                Setting::updateOrCreate(['key' => 'social_media_linkedin'], ['value' => $data['social_media']['linkedin'] ?? '']);
            }
            
            // Update branding settings
            if (isset($data['branding'])) {
                Setting::updateOrCreate(['key' => 'branding_logo'], ['value' => $data['branding']['logo'] ?? '']);
                Setting::updateOrCreate(['key' => 'branding_logo_light'], ['value' => $data['branding']['logo_light'] ?? '']);
                Setting::updateOrCreate(['key' => 'branding_logo_dark'], ['value' => $data['branding']['logo_dark'] ?? '']);
                Setting::updateOrCreate(['key' => 'branding_icon_light'], ['value' => $data['branding']['icon_light'] ?? '']);
                Setting::updateOrCreate(['key' => 'branding_icon_dark'], ['value' => $data['branding']['icon_dark'] ?? '']);
                Setting::updateOrCreate(['key' => 'branding_favicon'], ['value' => $data['branding']['favicon'] ?? '']);
                Setting::updateOrCreate(['key' => 'branding_footer_logo'], ['value' => $data['branding']['footer_logo'] ?? '']);
            }
            
            // Update advanced settings
            Setting::updateOrCreate(['key' => 'maintenance_mode'], ['value' => $data['maintenance_mode'] ?? false]);
            
            return redirect()->back()->with('success', 'Settings updated successfully');
        } catch (\Exception $e) {
            Log::error('Settings update error: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update settings: ' . $e->getMessage());
        }
    }

    /**
     * Refresh settings data.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        try {
            $settings = Setting::getAllSettings();
            
            // Log the settings being returned for debugging
            Log::info('Refreshed settings:', ['settings' => $settings]);
            
            return response()->json(['settings' => $settings]);
        } catch (\Exception $e) {
            Log::error('Settings refresh error: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to refresh settings'], 500);
        }
    }

    /**
     * Handle file uploads for settings
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|image|max:2048',
            'field' => 'required|string'
        ]);
        
        $file = $request->file('file');
        $path = $file->store('settings', 'public');
        
        return response()->json([
            'success' => true,
            'path' => '/storage/' . $path
        ]);
    }
}