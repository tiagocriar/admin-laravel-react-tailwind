<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Marca;
use Inertia\Inertia;

class MarcasController extends Controller{

    /**
     * Display a form create user.
     * @return Renderable
     */
    function index()
    {

        $marcas = Marca::orderBy('id', 'DESC')
        ->paginate(20);

        return Inertia::render('App/Marcas', [
            'marcas' => $marcas,
            'breadcrumb' => [
                'pageName' => 'Marcas',
                'paths' => ['App']
            ]
        ]);
    }
}
