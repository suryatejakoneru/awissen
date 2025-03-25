<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\SubCourse;
use Illuminate\Database\Seeder;

class SubCourseSeeder extends Seeder
{
    public function run()
    {
        $courses = Course::all();
        $subCourses = $this->getSubCourses();

        foreach ($courses as $course) {
            if (isset($subCourses[$course->title])) {
                foreach ($subCourses[$course->title] as $subCourse) {
                    // Convert prerequisites array to JSON string
                    $subCourse['prerequisites'] = json_encode($subCourse['prerequisites']);
                    SubCourse::create(array_merge($subCourse, ['course_id' => $course->id]));
                }
            } else {
                // Create default modules for courses without specific sub-courses
                $defaultModules = $this->getDefaultModules($course->title);
                foreach ($defaultModules as $module) {
                    // Convert prerequisites array to JSON string
                    $module['prerequisites'] = json_encode($module['prerequisites']);
                    SubCourse::create(array_merge($module, ['course_id' => $course->id]));
                }
            }
        }
    }

    private function getSubCourses()
    {
        return [
            'Automotive Engine Technology' => [
                [
                    'title' => 'Engine Fundamentals',
                    'slug' => 'engine-fundamentals',
                    'description' => 'Dive deep into the foundational principles of internal combustion engines in this comprehensive module. Students will explore the four-stroke cycle in detail, understanding the precise timing and coordination of intake, compression, power, and exhaust strokes. The course covers essential engine components, including pistons, connecting rods, crankshafts, and valvetrains, examining their roles in converting chemical energy into mechanical power. Learn about engine displacement calculations, compression ratios, and their impact on performance. Study the principles of volumetric efficiency and how various design factors affect engine breathing. The module includes detailed analysis of combustion chamber design, valve timing diagrams, and the effects of variable valve timing systems. Practical sessions involve hands-on experience with engine teardown and assembly, allowing students to visualize theoretical concepts in real-world applications. Special attention is given to modern engine materials and manufacturing techniques, including cylinder bore treatments, piston ring technology, and bearing design. The course also covers essential maintenance procedures, diagnostic approaches, and troubleshooting methodologies for common engine issues. Environmental considerations and emission control strategies are discussed, preparing students for the challenges of modern engine technology.',
                    'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=Engine+Fundamentals',
                    'prerequisites' => ['Basic Mechanics', 'Safety Training'],
                    'is_active' => true,
                    'order' => 1,
                ],
                [
                    'title' => 'Fuel Systems',
                    'slug' => 'fuel-systems',
                    'description' => 'Master the complexities of modern automotive fuel systems in this comprehensive course. Students will explore the evolution of fuel delivery systems, from basic carburetors to advanced direct injection technology. The module begins with fundamental principles of fuel chemistry, air-fuel ratios, and stoichiometric combustion, providing a strong theoretical foundation. Detailed study of fuel system components includes high-pressure fuel pumps, injectors, pressure regulators, and fuel rails, with emphasis on their operation and interaction. Learn about the role of fuel mapping and engine management systems in optimizing fuel delivery across various operating conditions. The course covers advanced topics such as multi-port fuel injection, gasoline direct injection (GDI), and the latest developments in injection technology. Students will gain hands-on experience diagnosing fuel system issues using modern scan tools and pressure testing equipment. Special attention is given to fuel system maintenance, including injector cleaning, pressure testing, and fuel quality analysis. The module also addresses alternative fuel systems, including flex-fuel capability and bi-fuel systems. Environmental considerations and emissions control strategies are integrated throughout the course, preparing students for real-world challenges in modern vehicle maintenance.',
                    'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=Fuel+Systems',
                    'prerequisites' => ['Engine Fundamentals'],
                    'is_active' => true,
                    'order' => 2,
                ],
                [
                    'title' => 'Engine Management',
                    'slug' => 'engine-management',
                    'description' => 'Explore the sophisticated world of modern engine management systems in this advanced course. Students will delve into the intricate relationship between various engine sensors and actuators, understanding how the Engine Control Unit (ECU) processes information to optimize engine performance. The module covers comprehensive analysis of input sensors, including mass airflow sensors, oxygen sensors, knock sensors, and temperature sensors, examining their roles in real-time engine management. Learn about advanced control strategies for fuel injection timing, ignition timing, and variable valve timing systems. The course includes detailed study of closed-loop feedback systems, adaptive learning strategies, and onboard diagnostic capabilities. Students will gain practical experience in ECU mapping, calibration, and programming techniques using industry-standard tools. Special focus is given to understanding OBD-II diagnostic protocols, PIDs, and diagnostic trouble code interpretation. The module also covers emerging technologies in engine management, including cylinder deactivation, start-stop systems, and hybrid powertrain integration.',
                    'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=Engine+Management',
                    'prerequisites' => ['Fuel Systems', 'Basic Electronics'],
                    'is_active' => true,
                    'order' => 3,
                ],
            ],
            'Electric Vehicle Systems' => [
                [
                    'title' => 'EV Battery Technology',
                    'slug' => 'ev-battery-technology',
                    'description' => 'Immerse yourself in the cutting-edge world of electric vehicle battery technology. This comprehensive course explores the fundamentals of modern battery chemistry, focusing on lithium-ion technology and its variants. Students will learn about battery cell design, module assembly, and pack integration, understanding the critical aspects of thermal management and safety systems. The course covers detailed analysis of battery management systems (BMS), including cell balancing, state of charge estimation, and health monitoring algorithms. Learn about different cathode and anode materials, their characteristics, and their impact on battery performance and longevity. Practical sessions include hands-on experience with battery testing equipment, diagnostic tools, and safety protocols. The module examines fast-charging technologies, including DC fast charging standards and their impact on battery life. Students will study battery degradation mechanisms, lifecycle analysis, and strategies for extending battery service life.',
                    'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=EV+Battery',
                    'prerequisites' => ['Basic Electronics', 'Safety Training'],
                    'is_active' => true,
                    'order' => 1,
                ],
                [
                    'title' => 'Electric Motors',
                    'slug' => 'electric-motors',
                    'description' => 'Delve into the world of electric vehicle propulsion systems in this comprehensive course. Students will explore various types of electric motors used in modern EVs, including permanent magnet synchronous motors, induction motors, and switched reluctance motors. The module begins with fundamental principles of electromagnetic theory and motor operation, building a strong theoretical foundation. Learn about motor design considerations, including power density, efficiency, and thermal management. The course covers detailed analysis of motor control strategies, including field-oriented control, space Vector modulation, and torque vectoring in multi-motor configurations. Students will gain hands-on experience with motor testing, including dynamometer testing and efficiency mapping. Special attention is given to motor cooling systems, bearing design, and maintenance requirements.',
                    'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=Electric+Motors',
                    'prerequisites' => ['EV Battery Technology'],
                    'is_active' => true,
                    'order' => 2,
                ],
                [
                    'title' => 'Charging Systems',
                    'slug' => 'charging-systems',
                    'description' => 'Master the intricacies of electric vehicle charging infrastructure and systems in this comprehensive course. Students will explore the complete ecosystem of EV charging, from residential Level 1 charging to high-power DC fast charging stations. The module covers detailed analysis of charging standards and protocols, including J1772, CCS, CHAdeMO, and Tesla\'s proprietary system. Learn about power electronics in charging systems, including AC-DC conversion, power factor correction, and isolation requirements. The course examines charging station design considerations, including site planning, power distribution, and load management strategies. Students will gain practical experience with charging equipment installation, testing, and maintenance procedures. Special focus is given to smart charging systems, vehicle-to-grid (V2G) technology, and wireless charging solutions.',
                    'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=Charging+Systems',
                    'prerequisites' => ['Electric Motors'],
                    'is_active' => true,
                    'order' => 3,
                ],
            ],
            'Automotive Diagnostics' => [
                [
                    'title' => 'Diagnostic Tools',
                    'slug' => 'diagnostic-tools',
                    'description' => 'Explore the comprehensive world of modern automotive diagnostic equipment and methodologies. This course provides in-depth coverage of diagnostic tools ranging from basic hand-held scanners to advanced manufacturer-specific diagnostic systems. Students will learn about OBD-II protocols, including CAN, ISO, and SAE standards, understanding how different communication protocols interact with vehicle systems. The module covers scan tool operation, including PIDs (Parameter IDs), data stream analysis, and bi-directional control capabilities. Learn about oscilloscope usage for advanced signal analysis, including pattern interpretation and common waveforms for various automotive sensors and actuators. The course includes detailed study of lab scopes, multimeters, and specialized testing equipment for specific vehicle systems.',
                    'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=Diagnostic+Tools',
                    'prerequisites' => ['Basic Electronics'],
                    'is_active' => true,
                    'order' => 1,
                ],
                [
                    'title' => 'Troubleshooting Methods',
                    'slug' => 'troubleshooting-methods',
                    'description' => 'Develop advanced problem-solving skills through systematic automotive troubleshooting methodologies. This comprehensive course teaches structured approaches to vehicle diagnostics, emphasizing logical thinking and efficient problem resolution. Students will learn about diagnostic strategy development, including symptom verification, information gathering, and test plan creation. The module covers advanced diagnostic decision trees, flow charts, and guided diagnostic procedures. Learn about the importance of customer interview techniques, road test procedures, and documentation methods. The course includes detailed study of common failure patterns, component interaction, and system interdependencies. Students will gain practical experience with case study analysis, real-world problem scenarios, and hands-on troubleshooting exercises.',
                    'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=Troubleshooting',
                    'prerequisites' => ['Diagnostic Tools'],
                    'is_active' => true,
                    'order' => 2,
                ],
                [
                    'title' => 'Advanced Diagnostics',
                    'slug' => 'advanced-diagnostics',
                    'description' => 'Master complex diagnostic challenges in modern vehicles through this advanced-level course. Students will explore sophisticated diagnostic techniques for hybrid systems, advanced driver assistance systems (ADAS), and network communications. The module begins with advanced sensor testing methodologies, including hall effect sensors, pressure transducers, and complex input devices. Learn about manufacturer-specific diagnostic procedures, including special test modes and bidirectional controls. The course covers detailed analysis of data correlation, including multiple data PIDs and calculated load values. Students will gain hands-on experience with programming and coding procedures, including module configuration and adaptation.',
                    'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=Advanced+Diagnostics',
                    'prerequisites' => ['Troubleshooting Methods'],
                    'is_active' => true,
                    'order' => 3,
                ],
            ],
        ];
    }

    private function getDefaultModules($courseTitle)
    {
        return [
            [
                'title' => 'Fundamentals',
                'slug' => strtolower(str_replace(' ', '-', $courseTitle)) . '-fundamentals',
                'description' => 'Begin your journey in ' . $courseTitle . ' with this comprehensive foundational module. This course provides an extensive introduction to the fundamental principles and concepts essential for understanding ' . $courseTitle . '. Students will explore the historical development of the field, key theoretical frameworks, and modern applications. The module covers basic terminology, standard practices, and essential tools used in the industry. Through a combination of theoretical study and hands-on exercises, students will develop a strong foundation in core concepts. The course emphasizes safety protocols, industry standards, and best practices specific to ' . $courseTitle . '.',
                'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=Module+1',
                'prerequisites' => ['Basic Knowledge'],
                'is_active' => true,
                'order' => 1,
            ],
            [
                'title' => 'Advanced Concepts',
                'slug' => strtolower(str_replace(' ', '-', $courseTitle)) . '-advanced',
                'description' => 'Elevate your expertise in ' . $courseTitle . ' through this advanced-level module. Building on the foundational knowledge, this course delves into sophisticated concepts and cutting-edge technologies in the field. Students will explore advanced theoretical principles, complex system interactions, and modern technological applications. The module covers advanced diagnostic techniques, specialized tools, and professional-grade equipment used in the industry. Learn about system optimization, performance enhancement, and advanced troubleshooting methodologies specific to ' . $courseTitle . '.',
                'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=Module+2',
                'prerequisites' => ['Fundamentals'],
                'is_active' => true,
                'order' => 2,
            ],
            [
                'title' => 'Practical Applications',
                'slug' => strtolower(str_replace(' ', '-', $courseTitle)) . '-practical',
                'description' => 'Apply your knowledge of ' . $courseTitle . ' in real-world scenarios through this practical application module. This hands-on course focuses on implementing theoretical knowledge in practical situations, preparing students for professional work environments. The module emphasizes problem-solving skills, diagnostic procedures, and maintenance techniques specific to ' . $courseTitle . '. Students will work with actual components and systems, gaining valuable hands-on experience in installation, testing, and repair procedures. The course covers common challenges encountered in the field, including troubleshooting strategies and solution implementation.',
                'image' => 'https://placehold.co/800x400/161B22/0EA5A0.png?text=Module+3',
                'prerequisites' => ['Advanced Concepts'],
                'is_active' => true,
                'order' => 3,
            ],
        ];
    }
}