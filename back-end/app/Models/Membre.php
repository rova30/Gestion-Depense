<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Membre
 *
 * @property int $id
 * @property int $famille_id
 * @property int $role_id
 * @property string $nom
 * @property string $prenom
 * @property Carbon $date_naissance
 * @property int $sexe_id
 * @property string $login
 * @property string $mdp
 *
 * @property Famille $famille
 * @property Role $role
 * @property Collection|Depense[] $depenses
 * @property Collection|PartageDepense[] $partagedepenses
 * @property Collection|Revenu[] $revenus
 *
 * @package App\Models
 */
class Membre extends Model
{
	protected $table = 'membres';
	public $timestamps = false;

	protected $casts = [
		'famille_id' => 'int',
		'role_id' => 'int',
		'date_naissance' => 'datetime',
        'sexe_id' => 'int',
    ];

	protected $fillable = [
		'famille_id',
		'role_id',
		'nom',
		'prenom',
		'date_naissance',
        'sexe_id',
        'login',
		'mdp'
	];

	public function famille()
	{
		return $this->belongsTo(Famille::class);
	}

	public function role()
	{
		return $this->belongsTo(Role::class);
	}

    public function sexe()
    {
        return $this->belongsTo(Sexe::class);
    }


    public function depenses()
	{
		return $this->hasMany(Depense::class);
	}

	public function partagedepenses()
	{
		return $this->hasMany(PartageDepense::class);
	}

	public function revenus()
	{
		return $this->hasMany(Revenu::class);
	}
}
