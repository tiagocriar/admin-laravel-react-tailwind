<?php

namespace App\Services;

use App\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class PermissionService{

    public function savePermission(Array $permissions, User $user)
    {
        $userPermissions = Permission::where('idUser', $user->id);
        $userPermissions->delete();

        foreach ($permissions as $permission => $value) {
            if($value){
                $storePermission = new Permission();
                $storePermission->idUser = $user->id;
                $storePermission->permission = $permission;
                $storePermission->save();
            }
        }
    }

    public static function getUserPermissions($idUser)
    {
        $user = User::find($idUser);

        if(!isset($user->id)) return [];

        $permissions = Permission::where('idUser', $user->id)->get();
        $permissions = $permissions->pluck('permission')->toArray();

        return $permissions;
    }
}
