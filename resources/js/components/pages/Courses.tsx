import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Search } from 'lucide-react';

interface Course {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    gradient_color: string;
    is_active: boolean;
    sub_courses: SubCourse[];
}

interface SubCourse {
    id: number;
    title: string;
    description: string;
    price: number;
    duration_hours: number;
    schedule: string[];
    prerequisites: string[];
}

const Courses = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch('/api/courses');
            const data = await response.json();
            setCourses(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setLoading(false);
        }
    };

    const filteredCourses = courses.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Courses</h1>
                        <p className="text-xl text-gray-600">
                            Discover our comprehensive range of automotive technology courses designed to advance your career.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto mb-12">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Course Grid */}
                    {loading ? (
                        <div className="text-center">Loading courses...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer"
                                    onClick={() => setSelectedCourse(course)}
                                >
                                    <div className="aspect-w-16 aspect-h-9">
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="object-cover w-full h-full"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient_color} opacity-75`} />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                                        <p className="text-gray-600 mb-4">{course.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">
                                                {course.sub_courses.length} sub-courses available
                                            </span>
                                            <button
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedCourse(course);
                                                }}
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Course Details Modal */}
                    {selectedCourse && (
                        <div className="fixed inset-0 z-50 overflow-y-auto">
                            <div className="flex items-center justify-center min-h-screen px-4">
                                <div className="fixed inset-0 bg-black opacity-50" onClick={() => setSelectedCourse(null)} />
                                <div className="relative bg-white rounded-lg max-w-4xl w-full mx-auto">
                                    <div className="p-6">
                                        <button
                                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                                            onClick={() => setSelectedCourse(null)}
                                        >
                                            <span className="sr-only">Close</span>
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        <div className="aspect-w-16 aspect-h-9 mb-6">
                                            <img
                                                src={selectedCourse.image}
                                                alt={selectedCourse.title}
                                                className="object-cover w-full h-full rounded-lg"
                                            />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedCourse.title}</h2>
                                        <p className="text-gray-600 mb-6">{selectedCourse.description}</p>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">Available Sub-Courses</h3>
                                        <div className="space-y-4">
                                            {selectedCourse.sub_courses.map((subCourse) => (
                                                <div
                                                    key={subCourse.id}
                                                    className="bg-gray-50 rounded-lg p-4"
                                                >
                                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                                        {subCourse.title}
                                                    </h4>
                                                    <p className="text-gray-600 mb-2">{subCourse.description}</p>
                                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                                        <span>Duration: {subCourse.duration_hours} hours</span>
                                                        <span>Price: ${subCourse.price}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Courses; 