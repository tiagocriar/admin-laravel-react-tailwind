<?php

use App\Services\PermissionService;

if (!function_exists('get_user_permissions')) {
    function get_user_permissions($idUser) {
        return PermissionService::getUserPermissions($idUser);
    }
}
