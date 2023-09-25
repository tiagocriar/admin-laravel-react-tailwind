<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserFormRequest;
use App\Models\Permission;
use App\Models\User;
use App\Services\UserService;
use App\Services\PermissionService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Throwable;

class UsersController extends Controller{

    protected $userService;
    protected $permissionService;

    public function __construct(UserService $userService, PermissionService $permissionService)
    {
        $this->userService = $userService;
        $this->permissionService = $permissionService;
    }

    /**
     * Display a form create user.
     * @return Renderable
     */
    function index()
    {

        $users = User::orderBy('id', 'DESC')
        ->paginate(20);

        $users->map(function($user){
            $user->permissions = $this->permissionService->getUserPermissions($user->id);
            return $user;
        });

        return Inertia::render('Users/List', [
            'users' => $users,
            'breadcrumb' => [
                'pageName' => 'Listar Usuários',
                'paths' => ['Usuários']
            ]
        ]);
    }

    /**
     * Display a form create user.
     * @return Renderable
     */
    function create()
    {
        return Inertia::render('Users/Form', [
            'breadcrumb' => [
                'pageName' => 'Criar Usuário',
                'paths' => ['Usuários']
            ]
        ]);
    }

     /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function edit($idUser)
    {
        $user = User::find($idUser);
        $permissions = $this->permissionService->getUserPermissions($idUser);

        if(!isset($user->id)){
            return redirect()->route('users.index')->with('error', 'Não foi possível acessar esse usuário');
        }

        return Inertia::render('Users/Form', [
            'user' => $user,
            'permissions' => $permissions,
            'breadcrumb' => [
                'pageName' => 'Criar Usuário',
                'paths' => ['Usuários']
            ]
        ]);
    }

    function store(UserFormRequest $request)
    {

        try {
            DB::beginTransaction();

            $user = $this->userService->saveUser($request);
            $this->permissionService->savePermission($request->permissions, $user);

            DB::commit();

            return redirect()->route('users.index')->with('success', 'Usuário cadastrado com sucesso');

        } catch (Throwable $exception) {
            DB::rollBack();
            Log::error($exception);

            return redirect()->back()->with('error', 'Não foi possível cadastrar esse usuário.');
        }
    }

    function delete(int $idUser){

        Log::debug($idUser);

        try {
            DB::beginTransaction();

            $user = User::findOrFail($idUser);
            $user->delete();

            DB::commit();

            return redirect()->back()->with('success', 'Usuário foi excluído com sucesso.');

        } catch (Throwable $exception) {
            DB::rollBack();
            Log::error($exception);

            return redirect()->back()->with('error', 'Não foi possível excluír esse usuário.');
        }
    }

}
