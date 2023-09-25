<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\PermissionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

class PermissionsController extends Controller{

    protected $permissionService;

    public function __construct(PermissionService $permissionService)
    {
        $this->permissionService = $permissionService;
    }

    public function store(Request $request){

        try {
            DB::beginTransaction();

            $user = User::findOrFail($request->idUser);
            $this->permissionService->savePermission($request->permissions, $user);

            DB::commit();

            return redirect()->back()->with('success', 'Permissões salvas com sucesso.');
        } catch (Throwable $exception) {
            DB::rollBack();
            Log::error($exception);

            return redirect()->back()->with('error', 'Não foi possível salvar as permissões.');
        }
    }

}
