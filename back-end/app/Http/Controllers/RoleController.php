<?php

namespace App\Http\Controllers;

use App\Models\Role;

class RoleController extends Controller
{
    public function getAllRole()
    {
        $roles = Role::all();

        return response()->json(['roles' => $roles], 200);
    }
}
