<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'image',
        'published_at',
        'author_name',
        'author_avatar',
        'category',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($blog) {
            if (empty($blog->slug)) {
                $blog->slug = Str::slug($blog->title);
            }
        });

        static::updating(function ($blog) {
            if ($blog->isDirty('title') && empty($blog->slug)) {
                $blog->slug = Str::slug($blog->title);
            }
        });
    }

    public function getTagsAttribute()
    {
        $defaultTags = [
            'Technology' => ['Automotive', 'Technology', 'Innovation'],
            'Education' => ['Education', 'Career Growth', 'Professional Development'],
            'Electric Vehicles' => ['Electric Vehicles', 'Sustainability', 'Future'],
        ];

        return $defaultTags[$this->category] ?? [];
    }
} 