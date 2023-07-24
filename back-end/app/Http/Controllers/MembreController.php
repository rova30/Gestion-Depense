<?php

namespace App\Http\Controllers;

use App\Models\Token;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Membre;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;


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

        $membre = Membre::where('login',$request->input('login'))
                            ->where('mdp',$request->input('mdp'))
                            ->first();

        if ($membre) {
            $token = $membre->tokens()->where('date_expiration', '>=', Carbon::now()->format('Y-m-d'))->first();
            if (!$token) {
                $token = new Token();
                $token->token = Str::random(40);
                $token->date_expiration = Carbon::now()->addDay();
                $membre->tokens()->save($token);
            }

            return response()->json(['message' => 'Connexion réussie', 'membre' => $membre, 'token' => $token->token], 200);
        }
        // Identifiants incorrects
        return response()->json(['message' => 'Identifiants incorrects'], 401);
    }

    public function getMembreByToken($token){
        $token = Token::where('token',$token)
                        ->where('date_expiration','>=', Carbon::now()->format('Y-m-d'))
                        ->first();
        if(!$token){
            return response()->json(['message' => 'Veuillez vous connecter'], 403);
        }
        $membre = Membre::find($token->membre_id);
        return response()->json(['message' => 'Membre récupéré', 'membre' => $membre], 200);
    }

    public function getAllMembreByFamilleId($famille_id){
        $membres = DB::select("SELECT * FROM v_membre WHERE famille_id = ? ORDER BY role_id", [$famille_id]);
        return response()->json(['message' => 'Membres récupérés', 'membres' => $membres], 200);
    }

    public function getProfilDuMois($membre_id,$famille_id){
        $profil = DB::select("SELECT * FROM v_profil_par_mois WHERE membre_id = ? AND famille_id = ? AND mois = EXTRACT('MONTH' FROM NOW())",[$membre_id,$famille_id]);
        return response()->json(['message' => 'Profil récupéré', 'profil' => $profil[0]], 200);
    }

    public function updateProfilPic(Request $request){
        $membre = Membre::find($request->membre_id);
        $membre->photo = $request->image; // Met à jour la photo avec l'image reçue en base64
        $membre->save();
        return response()->json(['message' => 'Photo de profil modifié'], 200);
    }
}
