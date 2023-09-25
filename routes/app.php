<?php

use App\Http\Controllers\App\CategoriasController;
use App\Http\Controllers\App\MarcasController;
use App\Http\Controllers\App\ProdutosController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/welcome', function(){
    return Inertia::render('Welcome');
})->name('app.welcome');

Route::get('/produtos', [ProdutosController::class, 'index'])->middleware('permissions:PRODUTOS')->name('produtos.index');
Route::get('/marcas', [MarcasController::class, 'index'])->middleware('permissions:MARCAS')->name('marcas.index');
Route::get('/categorias', [CategoriasController::class, 'index'])->middleware('permissions:CATEGORIAS')->name('categorias.index');
