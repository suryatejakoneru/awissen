<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    public function run()
    {
        $roles = [
            [
                'name' => 'admin',
                'display_name' => 'Administrator',
                'description' => 'Full access to all features',
                'permissions' => [
                    'manage_users',
                    'manage_roles',
                    'manage_courses',
                    'manage_blog',
                    'manage_settings',
                    'view_dashboard',
                    'edit_content',
                    'delete_content',
                    'approve_content',
                ],
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'moderator',
                'display_name' => 'Moderator',
                'description' => 'Manages content and users',
                'permissions' => [
                    'manage_courses',
                    'manage_blog',
                    'view_dashboard',
                    'edit_content',
                    'approve_content',
                ],
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'writer',
                'display_name' => 'Content Writer',
                'description' => 'Creates and edits content',
                'permissions' => [
                    'manage_blog',
                    'view_dashboard',
                    'edit_content',
                ],
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'user',
                'display_name' => 'Regular User',
                'description' => 'Basic access to platform features',
                'permissions' => [
                    'view_content',
                    'enroll_courses',
                ],
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($roles as $role) {
            $permissions = $role['permissions'];
            unset($role['permissions']);
            
            // Insert role
            $roleId = DB::table('roles')->insertGetId($role);

            // Insert permissions for this role
            foreach ($permissions as $permission) {
                DB::table('role_permissions')->insert([
                    'role_id' => $roleId,
                    'permission' => $permission,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
} 