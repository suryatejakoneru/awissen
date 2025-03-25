<?php

namespace Database\Seeders;

use App\Models\College;
use Illuminate\Database\Seeder;

class CollegeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create some predefined colleges
        $colleges = [
            [
                'name' => 'Harvard University',
                'description' => 'Harvard University is a private Ivy League research university in Cambridge, Massachusetts.',
                'address' => '86 Brattle Street',
                'city' => 'Cambridge',
                'state' => 'Massachusetts',
                'country' => 'United States',
                'phone' => '+1 617-495-1000',
                'email' => 'admissions@harvard.edu',
                'website' => 'https://www.harvard.edu',
                'logo' => 'https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Harvard_shield_wreath.svg/1200px-Harvard_shield_wreath.svg.png',
                'is_active' => true,
            ],
            [
                'name' => 'Stanford University',
                'description' => 'Stanford University is a private research university in Stanford, California.',
                'address' => '450 Serra Mall',
                'city' => 'Stanford',
                'state' => 'California',
                'country' => 'United States',
                'phone' => '+1 650-723-2300',
                'email' => 'admission@stanford.edu',
                'website' => 'https://www.stanford.edu',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Stanford_Cardinal_logo.svg/1200px-Stanford_Cardinal_logo.svg.png',
                'is_active' => true,
            ],
            [
                'name' => 'University of Oxford',
                'description' => 'The University of Oxford is a collegiate research university in Oxford, England.',
                'address' => 'Wellington Square',
                'city' => 'Oxford',
                'state' => 'Oxfordshire',
                'country' => 'United Kingdom',
                'phone' => '+44 1865 270000',
                'email' => 'admissions@ox.ac.uk',
                'website' => 'https://www.ox.ac.uk',
                'logo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Oxford-University-Circlet.svg/1200px-Oxford-University-Circlet.svg.png',
                'is_active' => true,
            ],
        ];

        foreach ($colleges as $college) {
            College::create($college);
        }

        // Create additional random colleges
        College::factory()->count(10)->create();
    }
}