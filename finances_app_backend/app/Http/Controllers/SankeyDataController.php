<?php

namespace App\Http\Controllers;

use App\Models\SankeyData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SankeyDataController extends Controller
{

    public function index()
    {
        return response()->json(
            SankeyData::where('user_id', Auth::id())
                ->select('id', 'from', 'to', 'amount', 'type', 'parent_id')
                ->get()
                ->map(fn($item) => [
                    'id' => $item->id,
                    'from' => $item->from,
                    'to' => $item->to,
                    'amount' => (float) $item->amount,
                    'type' => $item->type,
                    'parent_id' => $item->parent_id
                ])
        );
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'data' => 'required|array',
            'data.*.from' => 'required|string|max:255',
            'data.*.to' => 'required|string|max:255',
            'data.*.amount' => 'required|numeric|min:0',
            'data.*.type' => 'required|string|max:255',
        ]);
    
        $userId = Auth::id();
        $insertedData = [];
        $idMap = [];
    
        foreach ($validatedData['data'] as $entry) {
            $sankeyData = SankeyData::create([
                'from' => $entry['from'],
                'to' => $entry['to'],
                'amount' => $entry['amount'],
                'type' => $entry['type'],
                'parent_id' => null,
                'user_id' => $userId,
            ]);
    
            $idMap[$entry['to']] = $sankeyData->id;
            $insertedData[] = $sankeyData;
        }
    
        foreach ($insertedData as $data) {
            if ($data->from !== "budget" && isset($idMap[$data->from])) {
                $data->parent_id = $idMap[$data->from];
                $data->save();
            }
        }
    
        return response()->json(['message' => 'Data inserted successfully'], 201);
    }
    
    public function destroy()
    {
        $userId = Auth::id();

        SankeyData::where('user_id', $userId)->delete();

        return response()->json(['message' => 'All data deleted successfully']);
    }

    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'data' => 'required|array',
            'data.*.id' => 'required|integer',
            'data.*.from' => 'required|string|max:255',
            'data.*.to' => 'required|string|max:255',
            'data.*.amount' => 'required|numeric|min:0',
            'data.*.type' => 'required|string|max:255',
            'data.*.parent_id' => 'nullable|integer',
        ]);

        $userId = Auth::id();
        $insertedData = [];
        $idMap = [];

        $existingData = SankeyData::where('user_id', $userId)->get();

        $receivedIds = collect($validatedData['data'])->pluck('id')->toArray();

        foreach ($existingData as $data) {
            if (!in_array($data->id, $receivedIds)) {
                $data->delete();
            }
        }

        foreach ($validatedData['data'] as $entry) {
            $sankeyData = SankeyData::where('id', $entry['id'])->where('user_id', $userId)->first();

            if ($sankeyData) {
                $sankeyData->update([
                    'from' => $entry['from'],
                    'to' => $entry['to'],
                    'amount' => $entry['amount'],
                    'type' => $entry['type'],
                ]);
                $idMap[$entry['to']] = $sankeyData->id;
                $insertedData[] = $sankeyData;
            } else {
                $newSankeyData = SankeyData::create([
                    'from' => $entry['from'],
                    'to' => $entry['to'],
                    'amount' => $entry['amount'],
                    'type' => $entry['type'],
                    'parent_id' => null,
                    'user_id' => $userId,
                ]);
                $idMap[$entry['to']] = $newSankeyData->id;
                $insertedData[] = $newSankeyData;
            }
        }

        foreach ($insertedData as $data) {
            if ($data->from !== "budget" && isset($idMap[$data->from])) {
                $data->parent_id = $idMap[$data->from];
                $data->save();
            }
        }

        return response()->json(['message' => 'Data updated successfully'], 201);
    }
}
