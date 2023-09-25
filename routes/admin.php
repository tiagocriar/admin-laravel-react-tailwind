<?php

use App\Http\Controllers\Admin\PermissionsController;
use App\Http\Controllers\Admin\UsersController;
use Illuminate\Support\Facades\Route;

Route::prefix('users')->group(function() {
    Route::get('/', [UsersController::class, 'index'])->name('users.index');
    Route::get('create', [UsersController::class, 'create'])->name('users.create');
    Route::get('edit/{idUser}', [UsersController::class, 'edit'])->name('users.edit');
    Route::post('store', [UsersController::class, 'store'])->name('users.store');
    Route::delete('delete/{idUser}', [UsersController::class, 'delete'])->name('users.delete');
});

Route::prefix('permissions')->group(function() {
    Route::post('store', [PermissionsController::class, 'store'])->name('permissions.store');
});
