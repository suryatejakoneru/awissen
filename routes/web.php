<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Blog;
use App\Models\Course;
use App\Models\SubCourse;
use App\Models\Certificate;
use App\Models\College;
use App\Models\User;
use App\Models\Setting;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Admin\SettingsController;

Route::get('/', function () {
    $courses = Course::with('subCourses')
        ->where('is_active', true)
        ->orderBy('order')
        ->limit(5)
        ->get()
        ->map(function ($course) {
            return [
                'id' => $course->id,
                'title' => $course->title,
                'slug' => $course->slug,
                'image' => $course->image,
                'gradient_color' => $course->gradient_color,
                'sub_courses_count' => $course->subCourses->count()
            ];
        });

    $subCourses = SubCourse::where('is_active', true)
        ->orderBy('order')
        ->limit(4)
        ->get()
        ->map(function ($subCourse) {
            return [
                'id' => $subCourse->id,
                'title' => $subCourse->title,
                'description' => $subCourse->description,
                'image' => $subCourse->image,
                'slug' => $subCourse->slug,
                'course_slug' => $subCourse->course->slug
            ];
        });

    $settings = Setting::all()->keyBy('key')->map(function ($setting) {
        return $setting->value;
    });

    return Inertia::render('Home', [
        'courses' => $courses,
        'subCourses' => $subCourses,
        'settings' => $settings
    ]);
});

// Public pages
Route::get('/blog', function () {
    $posts = Blog::latest('published_at')->get()->map(function ($post) {
        return [
            'id' => $post->id,
            'title' => $post->title,
            'slug' => $post->slug,
            'excerpt' => $post->excerpt,
            'content' => $post->content,
            'image' => $post->image,
            'published_at' => $post->published_at->format('Y-m-d'),
            'author' => [
                'name' => $post->author_name,
                'avatar' => $post->author_avatar
            ],
            'category' => $post->category,
            'tags' => $post->tags
        ];
    });

    $settings = Setting::all()->keyBy('key')->map(function ($setting) {
        return $setting->value;
    });

    return Inertia::render('Blog', [
        'initialPosts' => $posts,
        'settings' => $settings
    ]);
})->name('blog');

Route::get('/blog/{slug}', function ($slug) {
    $post = Blog::where('slug', $slug)->firstOrFail();
    
    // Get related posts based on the same category
    $relatedPosts = Blog::where('category', $post->category)
        ->where('id', '!=', $post->id)
        ->latest('published_at')
        ->take(3)
        ->get()
        ->map(function ($relatedPost) {
            return [
                'id' => $relatedPost->id,
                'title' => $relatedPost->title,
                'slug' => $relatedPost->slug,
                'image' => $relatedPost->image,
                'published_at' => $relatedPost->published_at->format('Y-m-d'),
            ];
        });
    
    $settings = Setting::all()->keyBy('key')->map(function ($setting) {
        return $setting->value;
    });

    return Inertia::render('BlogDetail', [
        'post' => [
            'id' => $post->id,
            'title' => $post->title,
            'slug' => $post->slug,
            'excerpt' => $post->excerpt,
            'content' => $post->content,
            'image' => $post->image,
            'published_at' => $post->published_at->format('Y-m-d'),
            'author' => [
                'name' => $post->author_name,
                'avatar' => $post->author_avatar
            ],
            'category' => $post->category,
            'tags' => $post->tags
        ],
        'relatedPosts' => $relatedPosts,
        'settings' => $settings
    ]);
})->name('blog.show');

Route::get('/faq', function () {
    $settings = Setting::all()->keyBy('key')->map(function ($setting) {
        return $setting->value;
    });
    return Inertia::render('FAQ', [
      'settings' => $settings
    ]);
})->name('faq');

Route::get('/privacy-policy', function () {
    $settings = Setting::all()->keyBy('key')->map(function ($setting) {
        return $setting->value;
    });
    return Inertia::render('PrivacyPolicy', [
        'settings' => $settings
    ]);
})->name('privacy-policy');

Route::get('/terms-of-service', function () {
    $settings = Setting::all()->keyBy('key')->map(function ($setting) {
        return $setting->value;
    });
    return Inertia::render('TermsOfService',[
        'settings' => $settings
    ]);
})->name('terms-of-service');

Route::get('/help-center', function () {
    $settings = Setting::all()->keyBy('key')->map(function ($setting) {
        return $setting->value;
    });
    return Inertia::render('HelpCenter',[
        'settings' => $settings
    ]);
})->name('help-center');

Route::get('/accessibility', function () {
    $settings = Setting::all()->keyBy('key')->map(function ($setting) {
        return $setting->value;
    });
    return Inertia::render('Accessibility',[
        'settings' => $settings
    ]);
})->name('accessibility');

Route::get('/sitemap', function () {
    $settings = Setting::all()->keyBy('key')->map(function ($setting) {
        return $setting->value;
    });
    return Inertia::render('Sitemap',[
        'settings' => $settings
    ]);
})->name('sitemap');

Route::get('/about', function () {
    $settings = Setting::all()->keyBy('key')->map(function ($setting) {
        return $setting->value;
    });
    return Inertia::render('About',[
        'settings' => $settings
    ]);
})->name('about');

Route::get('/courses', function () {
    $settings = Setting::all()->keyBy('key')->map(function ($setting) {
        return $setting->value;
    });
    return Inertia::render('Courses',[
        'settings' => $settings
    ]);
})->name('public.courses');

Route::get('/courses/{slug}', function ($slug) {
    $course = Course::with('subCourses')
        ->where('slug', $slug)
        ->where('is_active', true)
        ->firstOrFail();
    
    $settings = Setting::all()->keyBy('key')->map(function ($setting) {
        return $setting->value;
    });

    return Inertia::render('CourseDetail', [
        'settings' => $settings,
        'course' => [
            'id' => $course->id,
            'title' => $course->title,
            'slug' => $course->slug,
            'description' => $course->description,
            'image' => $course->image,
            'gradient_color' => $course->gradient_color,
            'sub_courses' => $course->subCourses->map(function ($subCourse) {
                return [
                    'id' => $subCourse->id,
                    'title' => $subCourse->title,
                    'slug' => $subCourse->slug,
                    'description' => $subCourse->description,
                    'image' => $subCourse->image,
                    'prerequisites' => $subCourse->prerequisites,
                    'order' => $subCourse->order
                ];
            })->sortBy('order')->values()
        ]
    ]);
})->name('public.courses.show');

Route::get('/courses/{courseSlug}/{subCourseSlug}', function ($courseSlug, $subCourseSlug) {
    $course = Course::with('subCourses')
        ->where('slug', $courseSlug)
        ->where('is_active', true)
        ->firstOrFail();

    $subCourse = SubCourse::where('course_id', $course->id)
        ->where('slug', $subCourseSlug)
        ->where('is_active', true)
        ->firstOrFail();

    $settings = Setting::all()->keyBy('key')->map(function ($setting) {
        return $setting->value;
    });

    return Inertia::render('SubCourseDetail', [
        'settings' => $settings,
        'course' => [
            'id' => $course->id,
            'title' => $course->title,
            'slug' => $course->slug,
            'description' => $course->description,
            'image' => $course->image,
            'gradient_color' => $course->gradient_color,
            'sub_courses' => $course->subCourses->map(function ($sc) {
                return [
                    'id' => $sc->id,
                    'title' => $sc->title,
                    'slug' => $sc->slug,
                    'description' => $sc->description,
                    'image' => $sc->image,
                    'order' => $sc->order
                ];
            })->sortBy('order')->values()
        ],
        'subCourse' => [
            'id' => $subCourse->id,
            'title' => $subCourse->title,
            'slug' => $subCourse->slug,
            'description' => $subCourse->description,
            'image' => $subCourse->image,
            'prerequisites' => $subCourse->prerequisites,
            'order' => $subCourse->order
        ]
    ]);
})->name('public.sub-courses.show');

Route::get('/certification', function () {
    $settings = Setting::all()->keyBy('key')->map(function ($setting) {
        return $setting->value;
    });
    return Inertia::render('Certification',[
       'settings' => $settings
    ]);
})->name('certification');

// Public certificate verification routes - PLACED RIGHT AFTER CERTIFICATION ROUTE
Route::get('/certificate-verification', function (Request $request) {
    if (!$request->has('code')) {
        return redirect()->route('certification');
    }
    
    $certificate = Certificate::with(['user', 'subCourse.course'])
        ->where('certificate_code', $request->code)
        ->first();

    if (!$certificate) {
        // Return to certification page with error message that will be displayed under the form
        return redirect()->route('certification')
            ->with('error', 'Certificate not found. Please check the code and try again.');
    }

    return Inertia::render('CertificateVerification', [
        'certificate' => [
            'id' => $certificate->id,
            'user' => [
                'name' => $certificate->user->name,
            ],
            'sub_course' => [
                'title' => $certificate->subCourse->title,
                'course' => [
                    'title' => $certificate->subCourse->course->title,
                ],
            ],
            'certificate_code' => $certificate->certificate_code,
            'issue_date' => $certificate->issue_date->format('Y-m-d'),
        ],
    ]);
})->name('certificate-verification');

// Make sure this route is properly defined and accessible
Route::post('/verify-certificate', function (Request $request) {
    $request->validate([
        'certificate_code' => 'required|string',
    ]);

    $certificate = Certificate::with(['user', 'subCourse.course'])
        ->where('certificate_code', $request->certificate_code)
        ->first();

    if (!$certificate) {
        return response()->json([
            'errors' => [
                'certificate_code' => ['Certificate not found.']
            ]
        ], 404);
    }

    // Return certificate data without redirecting
    return response()->json([
        'success' => true,
        'certificate' => [
            'id' => $certificate->id,
            'user' => [
                'name' => $certificate->user->name,
            ],
            'sub_course' => [
                'title' => $certificate->subCourse->title,
                'course' => [
                    'title' => $certificate->subCourse->course->title,
                ],
            ],
            'certificate_code' => $certificate->certificate_code,
            'issue_date' => $certificate->issue_date->format('Y-m-d'),
        ],
    ]);
})->name('verify-certificate');

// Add a GET route for verify-certificate that redirects to the certification page
Route::get('/verify-certificate', function (Request $request) {
    if ($request->has('certificate_code')) {
        // If certificate_code is provided in GET request, redirect to certificate-verification
        return redirect()->route('certificate-verification', ['code' => $request->certificate_code]);
    }
    
    // Otherwise redirect to the certification page
    return redirect()->route('certification');
})->name('verify-certificate.get');

Route::get('/contact', function () {
    $settings = Setting::all()->keyBy('key')->map(function ($setting) {
        return $setting->value;
    });
    return Inertia::render('Contact', [
        'settings' => $settings
    ]);
})->name('contact');

Route::get('/api/courses', function () {
    return Course::with('subCourses')
        ->where('is_active', true)
        ->orderBy('order')
        ->get();
});

Route::get('/api/courses/{slug}', function ($slug) {
    return Course::with('subCourses')
        ->where('slug', $slug)
        ->where('is_active', true)
        ->firstOrFail();
});

Route::post('/logout', function () {
    Auth::logout();
    return redirect('/');
})->middleware('auth')->name('logout');

Route::middleware(['auth', 'verified'])->group(function () {
    // Admin Routes
    Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'adminDashboard'])->name('admin.dashboard');
        
        // User Management Routes
        Route::get('/users', [UserController::class, 'index'])->name('admin.users');
        Route::post('/users', [UserController::class, 'store'])->name('admin.users.store');
        Route::put('/users/{user}', [UserController::class, 'update'])->name('admin.users.update');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('admin.users.destroy');
        Route::patch('/users/{user}/status', [UserController::class, 'updateStatus'])->name('admin.users.update-status');
        Route::patch('/users/{user}/role', [UserController::class, 'updateRole'])->name('admin.users.update-role');
        
        // Course Management Routes
        Route::get('/courses', function () {
            $query = Course::with('subCourses')
                ->when(request('search'), function ($query, $search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                })
                ->when(request('status'), function ($query, $status) {
                    if ($status === 'active') {
                        $query->where('is_active', true);
                    } else if ($status === 'inactive') {
                        $query->where('is_active', false);
                    }
                })
                ->orderBy('created_at', 'desc');

            $courses = $query->paginate(9)
                ->through(function ($course) {
                    return [
                        'id' => $course->id,
                        'title' => $course->title,
                        'description' => $course->description,
                        'image' => $course->image,
                        'gradient_color' => $course->gradient_color,
                        'order' => $course->order,
                        'is_active' => $course->is_active,
                        'sub_courses' => $course->subCourses,
                    ];
                });

            return Inertia::render('admin/Courses', [
                'courses' => $courses,
                'filters' => request()->only(['search', 'status']),
            ]);
        })->name('admin.courses');
        
        Route::post('/courses', function (Request $request) {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'image' => 'required|url',
                'gradient_color' => 'required|string',
                'order' => 'required|integer|min:0',
                'is_active' => 'required|boolean',
            ]);

            Course::create($validated);

            return redirect()->back()->with('success', 'Course created successfully.');
        })->name('admin.courses.store');

        Route::put('/courses/{course}', function (Request $request, Course $course) {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'image' => 'required|url',
                'gradient_color' => 'required|string',
                'order' => 'required|integer|min:0',
                'is_active' => 'required|boolean',
            ]);

            $course->update($validated);

            return redirect()->back()->with('success', 'Course updated successfully.');
        })->name('admin.courses.update');

        Route::delete('/courses/{course}', function (Course $course) {
            $course->delete();
            return redirect()->back()->with('success', 'Course deleted successfully.');
        })->name('admin.courses.destroy');
        
        // Toggle Course Status
        Route::put('/courses/{course}/toggle-status', function (Course $course) {
            $course->update([
                'is_active' => !$course->is_active
            ]);
            
            return back()->with('success', 'Course status updated successfully');
        })->name('admin.courses.toggle-status');
        
        // View Sub-courses Route
        Route::get('/courses/{course}/sub-courses', function (Course $course) {
            return Inertia::render('admin/SubCourses', [
                'course' => [
                    'id' => $course->id,
                    'title' => $course->title,
                    'description' => $course->description,
                    'image' => $course->image,
                    'gradient_color' => $course->gradient_color,
                    'sub_courses' => $course->subCourses->map(function ($subCourse) {
                        return [
                            'id' => $subCourse->id,
                            'title' => $subCourse->title,
                            'description' => $subCourse->description,
                            'image' => $subCourse->image,
                            'order' => $subCourse->order,
                            'is_active' => $subCourse->is_active
                        ];
                    })->sortBy('order')->values()
                ]
            ]);
        })->name('admin.courses.sub-courses');
        
        // Sub-course Management Routes
        Route::post('/courses/{course}/sub-courses', function (Request $request, Course $course) {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'image' => 'required|url',
                'order' => 'required|integer|min:0',
                'is_active' => 'required|boolean',
            ]);

            $course->subCourses()->create($validated);
            return redirect()->back()->with('success', 'Sub-course created successfully.');
        })->name('admin.courses.sub-courses.store');

        Route::put('/courses/{course}/sub-courses/{subCourse}', function (Request $request, Course $course, SubCourse $subCourse) {
            if ($subCourse->course_id !== $course->id) {
                abort(404);
            }

            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'image' => 'required|url',
                'order' => 'required|integer|min:0',
                'is_active' => 'required|boolean',
            ]);

            $subCourse->update($validated);
            return redirect()->back()->with('success', 'Sub-course updated successfully.');
        })->name('admin.courses.sub-courses.update');

        Route::delete('/courses/{course}/sub-courses/{subCourse}', function (Course $course, SubCourse $subCourse) {
            if ($subCourse->course_id !== $course->id) {
                abort(404);
            }

            $subCourse->delete();
            return redirect()->back()->with('success', 'Sub-course deleted successfully.');
        })->name('admin.courses.sub-courses.destroy');
        
        // Toggle Sub-Course Status
        Route::put('/courses/{course}/sub-courses/{subCourse}/toggle-status', function (Course $course, SubCourse $subCourse) {
            if ($subCourse->course_id !== $course->id) {
                abort(404);
            }
            
            $subCourse->update([
                'is_active' => !$subCourse->is_active
            ]);
            
            return back()->with('success', 'Sub-course status updated successfully');
        })->name('admin.courses.sub-courses.toggle-status');
        
        // Course Image Upload Route
        Route::post('/courses/upload-image', function (Request $request) {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            $path = $request->file('image')->store('courses', 'public');
            
            if ($request->wantsJson()) {
                return response()->json([
                    'image_url' => asset('storage/' . $path)
                ]);
            }

            return back()->with('success', 'Image uploaded successfully.');
        })->name('admin.courses.upload-image');
        
        Route::get('/blog', function () {
            $query = Blog::query()
                ->when(request('search'), function ($query, $search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%")
                        ->orWhere('excerpt', 'like', "%{$search}%");
                })
                ->when(request('category'), function ($query, $category) {
                    $query->where('category', $category);
                })
                ->orderBy('created_at', 'desc');
        
            $blogs = $query->paginate(10)
                ->through(function ($blog) {
                    return [
                        'id' => $blog->id,
                        'title' => $blog->title,
                        'slug' => $blog->slug,
                        'excerpt' => $blog->excerpt,
                        'content' => Str::limit(strip_tags($blog->content), 100),
                        'full_content' => $blog->content,
                        'image' => $blog->image,
                        'author_name' => $blog->author_name,
                        'author_avatar' => $blog->author_avatar,
                        'category' => $blog->category,
                        'tags' => $blog->tags,
                        'published_at' => $blog->published_at,
                        'created_at' => $blog->created_at,
                    ];
                });
        
            $categories = ['Technology', 'Education', 'Electric Vehicles'];
        
            return Inertia::render('admin/Blog', [
                'blogs' => $blogs,
                'filters' => request()->only(['search', 'category']),
                'categories' => $categories
            ]);
        })->name('admin.blog');
        
        Route::post('/blog', function (Request $request) {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'excerpt' => 'required|string|max:255',
                'content' => 'required|string',
                'image' => 'required|url',
                'author_name' => 'required|string|max:255',
                'author_avatar' => 'required|url',
                'category' => 'required|string|max:255',
            ]);
        
            $validated['published_at'] = now();
            $validated['slug'] = Str::slug($validated['title']);
        
            Blog::create($validated);
        
            return redirect()->back()->with('success', 'Blog post created successfully.');
        })->name('admin.blog.store');
        
        Route::put('/blog/{blog}', function (Request $request, Blog $blog) {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'excerpt' => 'required|string|max:255',
                'content' => 'required|string',
                'image' => 'required|url',
                'author_name' => 'required|string|max:255',
                'author_avatar' => 'required|url',
                'category' => 'required|string|max:255',
            ]);
            
            if ($validated['title'] !== $blog->title) {
                $validated['slug'] = Str::slug($validated['title']);
            }
        
            $blog->update($validated);
        
            return redirect()->back()->with('success', 'Blog post updated successfully.');
        })->name('admin.blog.update');
        
        Route::delete('/blog/{blog}', function (Blog $blog) {
            $blog->delete();
            return redirect()->back()->with('success', 'Blog post deleted successfully.');
        })->name('admin.blog.destroy');
        
        // Blog Image Upload Route
        Route::post('/blog/upload-image', function (Request $request) {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);
        
            $path = $request->file('image')->store('blog', 'public');
            
            if ($request->wantsJson()) {
                return response()->json([
                    'image_url' => asset('storage/' . $path)
                ]);
            }
        
            return back()->with('success', 'Image uploaded successfully.');
        })->name('admin.blog.upload-image');
        
        // College Management Routes
        Route::get('/colleges', function () {
            $query = College::query()
                ->when(request('search'), function ($query, $search) {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('city', 'like', "%{$search}%")
                        ->orWhere('state', 'like', "%{$search}%")
                        ->orWhere('country', 'like', "%{$search}%");
                })
                ->when(request('country'), function ($query, $country) {
                    $query->where('country', $country);
                })
                ->orderBy('name');

            $colleges = $query->paginate(10)
                ->through(function ($college) {
                    return [
                        'id' => $college->id,
                        'name' => $college->name,
                        'slug' => $college->slug,
                        'description' => $college->description,
                        'address' => $college->address,
                        'city' => $college->city,
                        'state' => $college->state,
                        'country' => $college->country,
                        'phone' => $college->phone,
                        'email' => $college->email,
                        'website' => $college->website,
                        'logo' => $college->logo,
                        'is_active' => $college->is_active,
                        'created_at' => $college->created_at,
                        'updated_at' => $college->updated_at,
                    ];
                });

            $countries = College::distinct()->pluck('country')->filter()->values();

            return Inertia::render('admin/Colleges', [
                'colleges' => $colleges,
                'filters' => request()->only(['search', 'country']),
                'countries' => $countries,
            ]);
        })->name('admin.colleges');

        Route::post('/colleges', function (Request $request) {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'address' => 'required|string|max:255',
                'city' => 'required|string|max:255',
                'state' => 'required|string|max:255',
                'country' => 'required|string|max:255',
                'phone' => 'nullable|string|max:255',
                'email' => 'nullable|email|max:255',
                'website' => 'nullable|url|max:255',
                'logo' => 'nullable|url',
                'is_active' => 'boolean',
            ]);

            $validated['slug'] = Str::slug($validated['name']);

            College::create($validated);

            return redirect()->back()->with('success', 'College created successfully.');
        })->name('admin.colleges.store');

        Route::put('/colleges/{college}', function (Request $request, College $college) {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'address' => 'required|string|max:255',
                'city' => 'required|string|max:255',
                'state' => 'required|string|max:255',
                'country' => 'required|string|max:255',
                'phone' => 'nullable|string|max:255',
                'email' => 'nullable|email|max:255',
                'website' => 'nullable|url|max:255',
                'logo' => 'nullable|url',
                'is_active' => 'boolean',
            ]);

            if ($validated['name'] !== $college->name) {
                $validated['slug'] = Str::slug($validated['name']);
            }

            $college->update($validated);

            return redirect()->back()->with('success', 'College updated successfully.');
        })->name('admin.colleges.update');

        Route::delete('/colleges/{college}', function (College $college) {
            $college->delete();
            return redirect()->back()->with('success', 'College deleted successfully.');
        })->name('admin.colleges.destroy');

        Route::put('/colleges/{college}/toggle-status', function (College $college) {
            $college->update([
                'is_active' => !$college->is_active
            ]);
            
            return back()->with('success', 'College status updated successfully');
        })->name('admin.colleges.toggle-status');

        Route::post('/colleges/upload-logo', function (Request $request) {
            $request->validate([
                'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            $path = $request->file('logo')->store('colleges', 'public');
            
            if ($request->wantsJson()) {
                return response()->json([
                    'logo_url' => asset('storage/' . $path)
                ]);
            }

            return back()->with('success', 'Logo uploaded successfully.');
        })->name('admin.colleges.upload-logo');

        // Certificate Management Routes
        Route::get('/certificates', function () {
            $query = Certificate::with(['user', 'subCourse.course'])
                ->when(request('search'), function ($query, $search) {
                    $query->whereHas('user', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    })->orWhereHas('subCourse', function ($q) use ($search) {
                        $q->where('title', 'like', "%{$search}%");
                    })->orWhere('certificate_code', 'like', "%{$search}%");
                })
                ->orderBy('created_at', 'desc');
        
            $certificates = $query->paginate(10);
        
            $users = User::where('role', 'user')->select('id', 'name', 'email')->get();
            $subCourses = SubCourse::with('course')->where('is_active', true)->get()
                ->map(function ($subCourse) {
                    return [
                        'id' => $subCourse->id,
                        'title' => $subCourse->title,
                        'course_title' => $subCourse->course->title,
                        'full_title' => $subCourse->course->title . ' - ' . $subCourse->title,
                    ];
                });
        
            return Inertia::render('admin/Certificates', [
                'certificates' => $certificates,
                'filters' => request()->only(['search']),
                'users' => $users,
                'subCourses' => $subCourses,
            ]);
        })->name('admin.certificates');
        
        Route::post('/certificates', function (Request $request) {
            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
                'sub_course_id' => 'required|exists:sub_courses,id',
                'issue_date' => 'required|date',
            ]);
        
            // Check if certificate already exists for this user and sub-course
            $existingCertificate = Certificate::where('user_id', $validated['user_id'])
                ->where('sub_course_id', $validated['sub_course_id'])
                ->first();
                
            if ($existingCertificate) {
                // Use withErrors instead of with('error') to ensure the error is properly displayed
                return redirect()->route('admin.certificates')
                    ->withErrors(['certificate' => 'A certificate already exists for this user and course.']);
            }
        
            // Get user and course details for certificate code generation
            $user = User::find($validated['user_id']);
            $subCourse = SubCourse::with('course')->find($validated['sub_course_id']);
            
            // Generate certificate code using the model's method with course title
            $certificateCode = Certificate::generateCertificateCode(
                $user->name, 
                $subCourse->course->title
            );
            
            $validated['certificate_code'] = $certificateCode;
        
            try {
                Certificate::create($validated);
                return redirect()->route('admin.certificates')
                    ->with('success', 'Certificate created successfully.');
            } catch (\Exception $e) {
                // Use withErrors for all error cases to ensure consistent error display
                return redirect()->route('admin.certificates')
                    ->withErrors(['certificate' => 'Failed to create certificate: ' . $e->getMessage()]);
            }
        })->name('admin.certificates.store');
        
        Route::put('/certificates/{certificate}', function (Certificate $certificate, Request $request) {
            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
                'sub_course_id' => 'required|exists:sub_courses,id',
                'issue_date' => 'required|date',
            ]);
        
            $certificate->update($validated);
        
            return redirect()->route('admin.certificates')
                ->with('success', 'Certificate updated successfully.');
        })->name('admin.certificates.update');
        
        Route::delete('/certificates/{certificate}', function (Certificate $certificate) {
            $certificate->delete();
            return redirect()->back()->with('success', 'Certificate deleted successfully.');
        })->name('admin.certificates.destroy');
        

        Route::get('/settings', function () {
            return Inertia::render('admin/settings');
        })->name('admin.settings');
        
        // Add the settings update route
        Route::post('/settings', [SettingsController::class, 'update'])
            ->name('admin.settings.update');
        
        Route::post('/settings/upload', [SettingsController::class, 'upload'])
            ->name('admin.settings.upload');

        Route::get('/settings/refresh', [SettingsController::class, 'refresh'])
            ->name('admin.settings.refresh');
    });

    // Moderator Routes
    Route::prefix('moderator')->middleware(['role:moderator'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'moderatorDashboard'])->name('moderator.dashboard');
        Route::get('/courses', function () {
            return Inertia::render('moderator/Courses');
        })->name('moderator.courses');
        Route::get('/blog', function () {
            return Inertia::render('moderator/Blog');
        })->name('moderator.blog');
        Route::get('/approvals', function () {
            return Inertia::render('moderator/Approvals');
        })->name('moderator.approvals');
    });

    // Writer Routes
    Route::prefix('writer')->middleware(['role:writer'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'writerDashboard'])->name('writer.dashboard');
        Route::get('/blog', function () {
            return Inertia::render('writer/Blog');
        })->name('writer.blog');
        Route::get('/posts', function () {
            return Inertia::render('writer/Posts');
        })->name('writer.posts');
    });

    // User Routes (default)
    Route::middleware(['role:user'])->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'userDashboard'])->name('dashboard');
        Route::get('/dashboard/courses', function () {
            return Inertia::render('dashboard/Courses');
        })->name('user.courses');
        Route::get('/dashboard/progress', function () {
            return Inertia::render('dashboard/Progress');
        })->name('user.progress');
        Route::get('/profile', function () {
            return Inertia::render('dashboard/user/settings/Profile');
        })->name('user.settings.profile');
        
        Route::post('/profile', [ProfileController::class, 'update'])
            ->name('user.settings.profile.update');
        
        Route::get('/password', function () {
            return Inertia::render('dashboard/user/settings/Password');
        })->name('user.settings.password');
        
        Route::post('/password', [PasswordController::class, 'update'])
            ->name('user.settings.password.update');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// Admin Dashboard API Routes
Route::get('/api/admin/dashboard-stats', function () {
    // Ensure user is authenticated and is an admin
    if (!Auth::check() || Auth::user()->role !== 'admin') {
        return response()->json(['error' => 'Unauthorized'], 403);
    }

    // Get current date and date 30 days ago for comparison
    $now = now();
    $thirtyDaysAgo = now()->subDays(30);
    $sixtyDaysAgo = now()->subDays(60);

    // User statistics
    $totalUsers = User::count();
    $usersLastMonth = User::where('created_at', '>=', $thirtyDaysAgo)->count();
    $usersPreviousMonth = User::whereBetween('created_at', [$sixtyDaysAgo, $thirtyDaysAgo])->count();
    $userPercentChange = $usersPreviousMonth > 0 
        ? round((($usersLastMonth - $usersPreviousMonth) / $usersPreviousMonth) * 100, 1)
        : 100;

    // Course statistics
    $activeCourses = Course::where('is_active', true)->count();
    $newCoursesLastMonth = Course::where('created_at', '>=', $thirtyDaysAgo)->count();
    $coursesPreviousMonth = Course::whereBetween('created_at', [$sixtyDaysAgo, $thirtyDaysAgo])->count();
    $coursePercentChange = $coursesPreviousMonth > 0 
        ? round((($newCoursesLastMonth - $coursesPreviousMonth) / $coursesPreviousMonth) * 100, 1)
        : 100;

    // Blog statistics
    $totalBlogs = Blog::count();
    $blogsLastMonth = Blog::where('created_at', '>=', $thirtyDaysAgo)->count();
    $blogsPreviousMonth = Blog::whereBetween('created_at', [$sixtyDaysAgo, $thirtyDaysAgo])->count();
    $blogPercentChange = $blogsPreviousMonth > 0 
        ? round((($blogsLastMonth - $blogsPreviousMonth) / $blogsPreviousMonth) * 100, 1)
        : 100;

    // Certificate statistics
    $totalCertificates = Certificate::count();
    $certificatesLastMonth = Certificate::where('created_at', '>=', $thirtyDaysAgo)->count();
    $certificatesPreviousMonth = Certificate::whereBetween('created_at', [$sixtyDaysAgo, $thirtyDaysAgo])->count();
    $certificatePercentChange = $certificatesPreviousMonth > 0 
        ? round((($certificatesLastMonth - $certificatesPreviousMonth) / $certificatesPreviousMonth) * 100, 1)
        : 100;

    // Get chart data for the last 6 months
    $chartData = [];
    for ($i = 11; $i >= 0; $i--) {
        $startDate = now()->subMonths($i)->startOfMonth();
        $endDate = now()->subMonths($i)->endOfMonth();
        
        $chartData[] = [
            'month' => $startDate->format('M'),
            'users' => User::whereBetween('created_at', [$startDate, $endDate])->count(),
            'courses' => Course::whereBetween('created_at', [$startDate, $endDate])->count(),
            'blogs' => Blog::whereBetween('created_at', [$startDate, $endDate])->count(),
            'certificates' => Certificate::whereBetween('created_at', [$startDate, $endDate])->count(),
        ];
    }

    // Get recent activity (combine recent users, courses, blogs, certificates)
    $recentUsers = User::select('id', 'name', 'created_at')
        ->orderBy('created_at', 'desc')
        ->limit(5)
        ->get()
        ->map(function ($user) {
            return [
                'type' => 'user',
                'description' => "New user registered: {$user->name}",
                'time' => $user->created_at->diffForHumans(),
                'actionUrl' => route('admin.users') . "?search={$user->name}"
            ];
        });

    $recentCourses = Course::select('id', 'title', 'created_at')
        ->orderBy('created_at', 'desc')
        ->limit(5)
        ->get()
        ->map(function ($course) {
            return [
                'type' => 'course',
                'description' => "New course created: {$course->title}",
                'time' => $course->created_at->diffForHumans(),
                'actionUrl' => route('admin.courses') . "?search={$course->title}"
            ];
        });

    $recentBlogs = Blog::select('id', 'title', 'created_at')
        ->orderBy('created_at', 'desc')
        ->limit(5)
        ->get()
        ->map(function ($blog) {
            return [
                'type' => 'blog',
                'description' => "New blog post: {$blog->title}",
                'time' => $blog->created_at->diffForHumans(),
                'actionUrl' => route('admin.blog') . "?search={$blog->title}"
            ];
        });

    $recentCertificates = Certificate::with(['user', 'subCourse.course'])
        ->orderBy('created_at', 'desc')
        ->limit(5)
        ->get()
        ->map(function ($certificate) {
            return [
                'type' => 'certificate',
                'description' => "Certificate issued to {$certificate->user->name} for {$certificate->subCourse->course->title}",
                'time' => $certificate->created_at->diffForHumans(),
                'actionUrl' => route('admin.certificates') . "?search={$certificate->certificate_code}"
            ];
        });

        // Combine and sort all recent activity
        $recentActivity = $recentUsers->concat($recentCourses)
        ->concat($recentBlogs)
        ->concat($recentCertificates)
        ->sortByDesc(function ($item) {
            return strtotime($item['time']);
        })
        ->values()
        ->take(50);

    // User activity (logins, etc.) - this is a placeholder, implement actual tracking if needed
    $totalActivity = $recentActivity->count();
    $activityPercentChange = 5.2; // Placeholder value

    return response()->json([
        'users' => [
            'total' => $totalUsers,
            'new' => $usersLastMonth,
            'percentChange' => $userPercentChange
        ],
        'courses' => [
            'active' => $activeCourses,
            'new' => $newCoursesLastMonth,
            'percentChange' => $coursePercentChange
        ],
        'blogs' => [
            'total' => $totalBlogs,
            'new' => $blogsLastMonth,
            'percentChange' => $blogPercentChange
        ],
        'certificates' => [
            'total' => $totalCertificates,
            'new' => $certificatesLastMonth,
            'percentChange' => $certificatePercentChange
        ],
        'activity' => [
            'total' => $totalActivity,
            'percentChange' => $activityPercentChange
        ],
        'recentActivity' => $recentActivity,
        'chartData' => $chartData
    ]);
})->middleware('auth');
