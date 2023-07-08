<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class PartageDepense
 *
 * @property int $id
 * @property int $depense_id
 * @property int $membre_id
 * @property float $montant_part
 *
 * @property Depense $depense
 * @property Membre $membre
 *
 * @package App\Models
 */
class PartageDepense extends Model
{
	protected $table = 'partagedepenses';
	public $timestamps = false;

	protected $casts = [
		'depense_id' => 'int',
		'membre_id' => 'int',
		'montant_part' => 'float'
	];

	protected $fillable = [
		'depense_id',
		'membre_id',
		'montant_part'
	];

	public function depense()
	{
		return $this->belongsTo(Depense::class);
	}

	public function membre()
	{
		return $this->belongsTo(Membre::class);
	}
}
