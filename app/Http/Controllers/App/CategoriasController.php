<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use Inertia\Inertia;

class CategoriasController extends Controller{

    /**
     * Display a form create user.
     * @return Renderable
     */
    function index()
    {

        $categorias = Categoria::orderBy('id', 'DESC')
        ->paginate(20);

        return Inertia::render('App/Categorias', [
            'categorias' => $categorias,
            'breadcrumb' => [
                'pageName' => 'Categorias',
                'paths' => ['App']
            ]
        ]);
    }
}
