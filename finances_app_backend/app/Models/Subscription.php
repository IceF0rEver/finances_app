<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'amount', 'recurrence', 'execution_date', 'icon', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
