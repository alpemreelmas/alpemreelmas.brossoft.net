import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export const runtime = 'edge'

export async function GET(request, response) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  console.log("secret",process.env.NEXT_REVALIDATE_SECRET)
  console.log("param",secret)
  if (secret !== process.env.NEXT_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid token' },{status: 401})
  }

  const path = request.nextUrl.searchParams.get('path') || '/'
  revalidatePath(path)
  return NextResponse.json({ revalidated: true, now: Date.now() })
}
