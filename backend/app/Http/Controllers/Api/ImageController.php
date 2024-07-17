<?php

namespace App\Http\Controllers\Api;

use App\Models\Image;
use Illuminate\Http\Request;
use App\Http\Requests\ImageRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'store', 'update']]);
    }

    public function index()
    {
        try {
            return response()->json([
                'status' => 'success',
                'images' => Image::orderBy('id', 'desc')->get(),
            ]);
        } catch (\Exception $e) {
            return response()->json($e);
        }
    }

    public function store(ImageRequest $request)
    {
        $validatedData = $request->validated();

        if ($request->hasFile('image')) {
            $fileNameWithExt = $request->file('image')->getClientOriginalName();
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('image')->getClientOriginalExtension();
            $fileNameToStore = $fileName . '_' . time() . '.' . $extension;
            $path = $request->file('image')->storeAs('public/images', $fileNameToStore);
            $validatedData['image'] = $fileNameToStore;
        }

        $image = Image::create($validatedData);

        return response()->json([
            'status' => 'success',
            'message' => 'L\'image enregistrée avec succès.',
            'image' => $image,
        ]);
    }

    public function update(ImageRequest $request, Image $image)
    {
        $validatedData = $request->validated();

        if ($request->hasFile('image')) {
            $oldImagePath = $image->image; // Chemin de l'ancienne image
            $fileNameWithExt = $request->file('image')->getClientOriginalName();
            $fileName = pathinfo($fileNameWithExt, PATHINFO_FILENAME);
            $extension = $request->file('image')->getClientOriginalExtension();
            $fileNameToStore = $fileName . '_' . time() . '.' . $extension;
            $path = $request->file('image')->storeAs('public/images', $fileNameToStore);
            $validatedData['image'] = $fileNameToStore;

            // Suppression de l'ancienne image si elle existe
            if ($oldImagePath && Storage::disk('public')->exists('images/' . $oldImagePath)) {
                Storage::disk('public')->delete('images/' . $oldImagePath);
            }
        }

        $image->update($validatedData);

        return response()->json([
            'status' => 'success',
            'message' => 'L\'image a bien été mise à jour.',
            'image' => $image,
        ]);
    }
}
