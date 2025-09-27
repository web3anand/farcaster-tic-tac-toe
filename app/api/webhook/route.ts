import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Handle different webhook events from Farcaster
    switch (body.type) {
      case 'user_joined':
        console.log('User joined:', body.user)
        break
      case 'user_left':
        console.log('User left:', body.user)
        break
      case 'game_started':
        console.log('Game started:', body.gameId)
        break
      case 'game_finished':
        console.log('Game finished:', body.gameId, body.winner)
        break
      default:
        console.log('Unknown webhook event:', body.type)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Invalid webhook' }, { status: 400 })
  }
}
