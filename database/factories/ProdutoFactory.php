<?php

namespace Database\Factories;

use App\Models\Categoria;
use App\Models\Marca;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ProdutoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $marca = Marca::inRandomOrder()->first();
        $categoria = Categoria::inRandomOrder()->first();

        return [
            'idMarca' => $marca->id,
            'idCategoria' => $categoria->id,
            'title' => $this->faker->sentence,
        ];
    }
}
