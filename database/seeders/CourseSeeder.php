<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run()
    {
        $courses = [
            [
                'title' => 'Automotive Engine Technology',
                'slug' => 'automotive-engine-technology',
                'description' => 'Master the fundamentals of modern automotive engine systems, from basic principles to advanced diagnostics.',
                'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=Engine+Technology',
                'gradient_color' => 'from-red-500 to-orange-500',
                'is_active' => true,
                'order' => 1,
            ],
            [
                'title' => 'Electric Vehicle Systems',
                'slug' => 'electric-vehicle-systems',
                'description' => 'Comprehensive training in electric vehicle technology, including battery systems, motors, and charging infrastructure.',
                'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=EV+Systems',
                'gradient_color' => 'from-blue-500 to-cyan-500',
                'is_active' => true,
                'order' => 2,
            ],
            [
                'title' => 'Automotive Diagnostics',
                'slug' => 'automotive-diagnostics',
                'description' => 'Learn modern diagnostic techniques and tools for troubleshooting vehicle systems.',
                'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=Diagnostics',
                'gradient_color' => 'from-green-500 to-emerald-500',
                'is_active' => true,
                'order' => 3,
            ],
            [
                'title' => 'Brake Systems Technology',
                'slug' => 'brake-systems-technology',
                'description' => 'Detailed study of modern brake systems, including ABS, stability control, and regenerative braking.',
                'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=Brake+Systems',
                'gradient_color' => 'from-purple-500 to-pink-500',
                'is_active' => true,
                'order' => 4,
            ],
            [
                'title' => 'Transmission Systems',
                'slug' => 'transmission-systems',
                'description' => 'Comprehensive coverage of manual, automatic, and CVT transmission systems.',
                'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=Transmission',
                'gradient_color' => 'from-yellow-500 to-amber-500',
                'is_active' => true,
                'order' => 5,
            ],
            [
                'title' => 'Hybrid Vehicle Technology',
                'slug' => 'hybrid-vehicle-technology',
                'description' => 'Study hybrid vehicle systems, including power management, regenerative braking, and diagnostics.',
                'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=Hybrid+Tech',
                'gradient_color' => 'from-teal-500 to-green-500',
                'is_active' => true,
                'order' => 6,
            ],
            [
                'title' => 'Automotive Electronics',
                'slug' => 'automotive-electronics',
                'description' => 'Learn about modern automotive electrical systems, sensors, and control modules.',
                'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=Electronics',
                'gradient_color' => 'from-indigo-500 to-purple-500',
                'is_active' => true,
                'order' => 7,
            ],
            [
                'title' => 'ADAS Technology',
                'slug' => 'adas-technology',
                'description' => 'Advanced driver assistance systems technology and calibration techniques.',
                'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=ADAS',
                'gradient_color' => 'from-blue-500 to-indigo-500',
                'is_active' => true,
                'order' => 8,
            ],
            [
                'title' => 'Automotive HVAC Systems',
                'slug' => 'automotive-hvac-systems',
                'description' => 'Complete study of modern automotive heating, ventilation, and air conditioning systems.',
                'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=HVAC',
                'gradient_color' => 'from-cyan-500 to-blue-500',
                'is_active' => true,
                'order' => 9,
            ],
            [
                'title' => 'Vehicle Network Systems',
                'slug' => 'vehicle-network-systems',
                'description' => 'Study of CAN bus, LIN bus, and other vehicle network protocols.',
                'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=Networks',
                'gradient_color' => 'from-violet-500 to-purple-500',
                'is_active' => true,
                'order' => 10,
            ],
        ];

        foreach ($courses as $course) {
            Course::create($course);
        }
    }
} 