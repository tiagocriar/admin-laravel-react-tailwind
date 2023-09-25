<?php

namespace App\Services;

use App\Http\Requests\UserFormRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserService{

    public function saveUser(UserFormRequest $request)
    {
        $currentUser = User::find($request->idUser);
        $isUpdate = isset($currentUser->id);
        $changePassword = $request->changePassword;

        $storeUser = $isUpdate ? $currentUser : new User();
        $storeUser->name = $request->name;
        $storeUser->email = $request->email;
        $storeUser->role = $request->role;
        if($changePassword) $storeUser->password = Hash::make($request->password);
        $storeUser->save();

        return $storeUser;
    }
}
