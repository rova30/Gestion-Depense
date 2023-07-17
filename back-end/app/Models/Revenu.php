<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Revenu
 *
 * @property int $id
 * @property int $famille_id
 * @property int $membre_id
 * @property int $typerevenu_id
 * @property float $montant
 * @property string $libelle
 * @property Carbon $date_revenu
 *
 * @property Famille $famille
 * @property Membre $membre
 * @property TypeRevenu $typerevenu
 *
 * @package App\Models
 */
class Revenu extends Model
{
	protected $table = 'revenus';
	public $timestamps = false;

	protected $casts = [
		'famille_id' => 'int',
		'membre_id' => 'int',
		'typerevenu_id' => 'int',
		'montant' => 'float',
		'date_revenu' => 'datetime'
	];

	protected $fillable = [
		'famille_id',
		'membre_id',
		'typerevenu_id',
		'montant',
        'libelle',
		'date_revenu'
	];

	public function famille()
	{
		return $this->belongsTo(Famille::class);
	}

	public function membre()
	{
		return $this->belongsTo(Membre::class);
	}

	public function typerevenu()
	{
		return $this->belongsTo(TypeRevenu::class);
	}
}
