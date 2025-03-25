<?php

namespace Database\Factories;

use App\Models\College;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CollegeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = College::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $name = $this->faker->company() . ' ' . $this->faker->randomElement(['University', 'College', 'Institute', 'Academy']);
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => $this->faker->paragraph(),
            'address' => $this->faker->streetAddress(),
            'city' => $this->faker->city(),
            'state' => $this->faker->state(),
            'country' => $this->faker->country(),
            'phone' => $this->faker->phoneNumber(),
            'email' => $this->faker->companyEmail(),
            'website' => $this->faker->url(),
            'logo' => $this->faker->imageUrl(200, 200, 'education'),
            'is_active' => $this->faker->boolean(80), // 80% chance of being active
        ];
    }

    /**
     * Indicate that the college is active.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function active()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_active' => true,
            ];
        });
    }

    /**
     * Indicate that the college is inactive.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function inactive()
    {
        return $this->state(function (array $attributes) {
            return [
                'is_active' => false,
            ];
        });
    }
}