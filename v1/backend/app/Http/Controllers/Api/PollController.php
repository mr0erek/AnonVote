<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Poll;
use Illuminate\Http\Request;

class PollController extends Controller
{
    public function index()
    {
        $polls = Poll::with('creator:id,display_name')
            ->where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'polls'   => $polls,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'vote_type'   => 'required|in:upvote,downvote,both',
            'expires_at'  => 'nullable|date|after:now',
        ]);

        $poll = Poll::create([
            'creator_id'  => auth()->id(),
            'title'       => $validated['title'],
            'description' => $validated['description'],
            'vote_type'   => $validated['vote_type'],
            'expires_at'  => $validated['expires_at'] ?? null,
        ]);

        $poll->load('creator:id,display_name');

        return response()->json([
            'success' => true,
            'message' => 'Poll created successfully',
            'poll'    => $poll,
        ], 201);
    }

    public function show($id)
    {
        $poll = Poll::with('creator:id,display_name')->findOrFail($id);

        return response()->json([
            'success' => true,
            'poll'    => $poll,
        ]);
    }

    public function destroy($id)
    {
        $poll = Poll::findOrFail($id);

        if ($poll->creator_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        $poll->delete();

        return response()->json([
            'success' => true,
            'message' => 'Poll deleted successfully',
        ]);
    }
}
