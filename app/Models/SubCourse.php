<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class SubCourse extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'image',
        'prerequisites',
        'order',
        'is_active',
        'course_id',
    ];

    protected $casts = [
        'prerequisites' => 'array',
        'is_active' => 'boolean',
        'order' => 'integer'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($subCourse) {
            // Create a unique slug by combining the title with the course_id
            $baseSlug = Str::slug($subCourse->title);
            $subCourse->slug = $baseSlug . '-' . $subCourse->course_id;
        });

        static::updating(function ($subCourse) {
            if ($subCourse->isDirty('title') || $subCourse->isDirty('course_id')) {
                // Update slug if title or course_id changes
                $baseSlug = Str::slug($subCourse->title);
                $subCourse->slug = $baseSlug . '-' . $subCourse->course_id;
            }
        });
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function certificates()
    {
        return $this->hasMany(Certificate::class);
    }
}
