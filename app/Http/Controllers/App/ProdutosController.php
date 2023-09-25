<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Produto;
use Inertia\Inertia;

class ProdutosController extends Controller{

    /**
     * Display a form create user.
     * @return Renderable
     */
    function index()
    {

        $produtos = Produto::with(['marca', 'categoria'])
        ->orderBy('id', 'DESC')
        ->paginate(20);

        return Inertia::render('App/Produtos', [
            'produtos' => $produtos,
            'breadcrumb' => [
                'pageName' => 'Produtos',
                'paths' => ['App']
            ]
        ]);
    }
}
