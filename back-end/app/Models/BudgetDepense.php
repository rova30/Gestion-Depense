<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BudgetDepense
 *
 * @property int $id
 * @property int $typedepense_id
 * @property int $famille_id
 * @property float $montant
 * @property Carbon $mois
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
		'montant' => 'float',
        'date_naissance' => 'date',
    ];

	protected $fillable = [
		'typedepense_id',
		'famille_id',
		'montant',
        'mois'
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
