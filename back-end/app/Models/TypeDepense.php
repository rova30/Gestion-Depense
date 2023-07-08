<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TypeDepense
 *
 * @property int $id
 * @property int $nom
 *
 * @property Collection|BudgetDepense[] $budgetdepenses
 * @property Collection|Depense[] $depenses
 *
 * @package App\Models
 */
class TypeDepense extends Model
{
	protected $table = 'typedepenses';
	public $timestamps = false;

	protected $casts = [
		'nom' => 'int'
	];

	protected $fillable = [
		'nom'
	];

	public function budgetdepenses()
	{
		return $this->hasMany(BudgetDepense::class);
	}

	public function depenses()
	{
		return $this->hasMany(Depense::class);
	}
}
