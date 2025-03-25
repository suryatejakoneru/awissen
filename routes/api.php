<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\SubCourseController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\CollegeController;
use App\Http\Controllers\BlogController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;

// Course routes
Route::apiResource('courses', CourseController::class);
Route::get('courses/{course}/sub-courses', [CourseController::class, 'subCourses']);

// Sub-course routes
Route::apiResource('sub-courses', SubCourseController::class);
Route::get('courses/{course}/sub-courses', [SubCourseController::class, 'byCourse']);

// Testimonial routes
Route::apiResource('testimonials', TestimonialController::class);

// Certificate routes
Route::apiResource('certificates', CertificateController::class);
Route::get('certificates/verify/{certificateCode}', [CertificateController::class, 'verify']);
Route::get('users/{user}/certificates', [CertificateController::class, 'byUser']);

// College routes
Route::apiResource('colleges', CollegeController::class);
Route::get('colleges/search', [CollegeController::class, 'search']);

// Blog routes
Route::get('/blog-posts', [BlogController::class, 'index']);

Route::post('/contact', [ContactController::class, 'submit']); 