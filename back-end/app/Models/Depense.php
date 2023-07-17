<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Depense
 *
 * @property int $id
 * @property int $famille_id
 * @property int $membre_id
 * @property int $typedepense_id
 * @property float $montant
 * @property string $libelle
 * @property Carbon $date_depense
 *
 * @property Famille $famille
 * @property Membre $membre
 * @property TypeDepense $typedepense
 * @property Collection|PartageDepense[] $partagedepenses
 *
 * @package App\Models
 */
class Depense extends Model
{
	protected $table = 'depenses';
	public $timestamps = false;

	protected $casts = [
		'famille_id' => 'int',
		'membre_id' => 'int',
		'typedepense_id' => 'int',
		'montant' => 'float',
		'date_depense' => 'datetime'
	];

	protected $fillable = [
		'famille_id',
		'membre_id',
		'typedepense_id',
		'montant',
        'libelle',
		'date_depense'
	];

	public function famille()
	{
		return $this->belongsTo(Famille::class);
	}

	public function membre()
	{
		return $this->belongsTo(Membre::class);
	}

	public function typedepense()
	{
		return $this->belongsTo(TypeDepense::class);
	}

	public function partagedepenses()
	{
		return $this->hasMany(PartageDepense::class);
	}
}
