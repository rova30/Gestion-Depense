<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Membre;
use Illuminate\Support\Facades\Auth;


class MembreController extends Controller
{
    public function createMembre(Request $request)
    {
        $request->validate([
            'famille' => 'required|exists:familles,id',
            'role' => 'required|exists:roles,id',
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'date_naissance' => 'required|date',
            'sexe' => 'required|exists:sexes,id',
            'login' => 'required|string|unique:membres,login',
            'confirmation_mdp' => 'required|string',
            'mdp' => 'required|string',
        ]);

        if($request->input('confirmation_mdp') == $request->input('mdp')) {
            $membre = new Membre();
            $membre->famille_id = $request->input('famille');
            $membre->role_id = $request->input('role');
            $membre->nom = $request->input('nom');
            $membre->prenom = $request->input('prenom');
            $membre->date_naissance = $request->input('date_naissance');
            $membre->sexe_id = $request->input('sexe');
            $membre->login = $request->input('login');
            $membre->mdp = $request->input('mdp');
            $membre->save();

            return response()->json(['message' => 'Membre créé avec succès', 'membre_id' => $membre->id], 201);
        }
        return response()->json(['message' => 'Les mots de passe ne correspondent pas.'], 422);
    }


    public function login(Request $request)
    {
        $request->validate([
            'login' => 'required|string',
            'mdp' => 'required|string',
        ]);

        $credentials = $request->only('login', 'mdp');

        if (Auth::guard('membre')->attempt($credentials)) {
            // Authentification réussie
            $membre = Auth::guard('membre')->user();
            $token = $membre->createToken('authToken')->plainTextToken;

            return response()->json(['message' => 'Connexion réussie', 'membre' => $membre, 'token' => $token], 200);
        }

        // Identifiants incorrects
        return response()->json(['message' => 'Identifiants incorrects'], 401);
    }
}
