<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class BudgetDepense
 *
 * @property int $id
 * @property int $typedepense_id
 * @property int $famille_id
 * @property float $montant
 *
 * @property TypeDepense $typedepense
 * @property Famille $famille
 *
 * @package App\Models
 */
class BudgetDepense extends Model
{
	protected $table = 'budgetdepenses';
	public $timestamps = false;

	protected $casts = [
		'typedepense_id' => 'int',
		'famille_id' => 'int',
		'montant' => 'float'
	];

	protected $fillable = [
		'typedepense_id',
		'famille_id',
		'montant'
	];

	public function typedepense()
	{
		return $this->belongsTo(TypeDepense::class);
	}

	public function famille()
	{
		return $this->belongsTo(Famille::class);
	}
}
