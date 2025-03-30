<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subscription;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(
            Subscription::where('user_id', Auth::id())
                ->select('id', 'name', 'amount', 'recurrence', 'execution_date', 'icon')
                ->get()
                ->map(fn($item) => [
                    'id' => $item->id,
                    'name' => $item->name,
                    'amount' => (float) $item->amount,
                    'recurrence' => $item->recurrence,
                    'execution_date' => $item->execution_date,
                    'icon' => $item->icon
                ])
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'recurrence' => 'required|string|in:monthly,annually',
            'execution_date' => 'required|date_format:Y-m-d\TH:i:s.v\Z',
            'icon' => 'required|string|max:255'
        ]);
    
        $userId = Auth::id();

        $subscription = new Subscription();
        $subscription->name = $validatedData['name'];
        $subscription->amount = $validatedData['amount'];
        $subscription->recurrence = $validatedData['recurrence'];
        $subscription->execution_date = $validatedData['execution_date'];
        $subscription->icon = $validatedData['icon'];
        $subscription->user_id = $userId;
    
        $subscription->save();
        return response()->json(['message' => 'Data inserted successfully'], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'recurrence' => 'required|string|in:monthly,annually',
            'execution_date' => 'required|date_format:Y-m-d\TH:i:s.v\Z',
            'icon' => 'required|string|max:255'
        ]);
        
        $subscription = Subscription::find($id);
        
        if (!$subscription) {
            return response()->json(['message' => 'Subscription not found'], 404);
        }
    
        $subscription->name = $validatedData['name'];
        $subscription->amount = $validatedData['amount'];
        $subscription->recurrence = $validatedData['recurrence'];
        $subscription->execution_date = $validatedData['execution_date'];
        $subscription->icon = $validatedData['icon'];
        
        $subscription->save();
    
        return response()->json(['message' => 'Subscription updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $subscription = Subscription::find($id);
        if (!$subscription) {
            return response()->json(['message' => 'Subscription not found'], 404);
        }

        $subscription->delete();
        return response()->json(['message' => 'Subscription deleted successfully'], 200);
    }
}
