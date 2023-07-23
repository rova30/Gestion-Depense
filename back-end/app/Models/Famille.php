<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Famille
 *
 * @property int $id
 * @property string $nom
 * @property string $responsable
 *
 * @property Collection|BudgetDepense[] $budgetdepenses
 * @property Collection|Membre[] $membres
 * @property Collection|Depense[] $depenses
 * @property Collection|Revenu[] $revenus
 *
 * @package App\Models
 */
class Famille extends Model
{
	protected $table = 'familles';
	public $timestamps = false;

	protected $fillable = [
		'nom',
        'responsable'
	];

	public function budgetdepenses()
	{
		return $this->hasMany(BudgetDepense::class);
	}

	public function membres()
	{
		return $this->hasMany(Membre::class);
	}

	public function depenses()
	{
		return $this->hasMany(Depense::class);
	}

	public function revenus()
	{
		return $this->hasMany(Revenu::class);
	}
}
