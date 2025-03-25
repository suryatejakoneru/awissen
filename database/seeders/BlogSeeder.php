<?php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Seeder;

class BlogSeeder extends Seeder
{
    public function run()
    {
        $blogs = [
            [
                'title' => 'Latest Trends in Automotive Technology',
                'slug' => 'latest-trends-in-automotive-technology',
                'excerpt' => 'Discover the cutting-edge advancements shaping the future of automotive industry. From autonomous driving to electric powertrains, learn how technology is revolutionizing the automotive sector.',
                'content' => "The automotive industry is undergoing a dramatic transformation driven by technological innovation. This article explores the latest trends that are shaping the future of automotive technology.

                1. Autonomous Driving Technology
                - Advanced driver assistance systems (ADAS)
                - Machine learning and AI in vehicle control
                - Sensor fusion and environmental perception
                
                2. Electric Vehicle Innovation
                - Next-generation battery technology
                - Fast-charging infrastructure
                - Improved range and performance
                
                3. Connected Car Technologies
                - Vehicle-to-everything (V2X) communication
                - Over-the-air updates
                - Smart infotainment systems
                
                4. Advanced Manufacturing
                - 3D printing in automotive production
                - Smart factories and automation
                - Sustainable manufacturing practices",
                'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=Automotive+Technology',
                'published_at' => '2024-03-15',
                'author_name' => 'John Doe',
                'author_avatar' => 'https://placehold.co/100x100/161B22/0EA5A0.png?text=JD',
                'category' => 'Technology',
            ],
            [
                'title' => 'The Importance of Continuous Learning in Automotive',
                'slug' => 'importance-of-continuous-learning',
                'excerpt' => 'Why staying updated with the latest automotive knowledge is crucial for success. Explore how continuous learning can advance your career in the automotive industry.',
                'content' => "In the rapidly evolving automotive industry, continuous learning is not just an option – it's a necessity. This article explores why ongoing education is crucial for automotive professionals.

                1. Technological Evolution
                - Keeping pace with new technologies
                - Understanding emerging systems
                - Adapting to industry changes
                
                2. Career Advancement
                - Professional certification benefits
                - Skill development opportunities
                - Industry recognition
                
                3. Industry Requirements
                - Updated safety standards
                - Environmental regulations
                - Quality control processes
                
                4. Practical Benefits
                - Improved job performance
                - Higher earning potential
                - Greater job security",
                'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=Continuous+Learning',
                'published_at' => '2024-03-10',
                'author_name' => 'Jane Smith',
                'author_avatar' => 'https://placehold.co/100x100/161B22/0EA5A0.png?text=JS',
                'category' => 'Education',
            ],
            [
                'title' => 'Electric Vehicles: The Future of Transportation',
                'slug' => 'electric-vehicles-future',
                'excerpt' => 'Exploring the rise of electric vehicles and their impact on the automotive industry. Learn about the latest developments in EV technology and what it means for the future.',
                'content' => "Electric vehicles are revolutionizing the transportation industry. This comprehensive guide explores the current state of EVs and their promising future.

                1. Current State of EVs
                - Market growth and adoption rates
                - Leading manufacturers and models
                - Infrastructure development
                
                2. Technology Advancements
                - Battery innovations
                - Charging solutions
                - Performance improvements
                
                3. Environmental Impact
                - Carbon footprint reduction
                - Sustainable practices
                - Recycling and waste management
                
                4. Future Prospects
                - Market predictions
                - Upcoming technologies
                - Industry challenges and solutions",
                'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=Electric+Vehicles',
                'published_at' => '2024-03-05',
                'author_name' => 'Mike Johnson',
                'author_avatar' => 'https://placehold.co/100x100/161B22/0EA5A0.png?text=MJ',
                'category' => 'Electric Vehicles',
            ]
        ];

        foreach ($blogs as $blog) {
            Blog::create($blog);
        }
    }
} 