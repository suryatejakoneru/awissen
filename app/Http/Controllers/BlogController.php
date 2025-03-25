<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        $posts = Blog::latest('published_at')->get();

        return response()->json($posts->map(function ($post) {
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
        }));
    }
} 