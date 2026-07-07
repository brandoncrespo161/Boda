import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { password } = await request.json();

    // Verificamos si la contraseña coincide con la de tu archivo .env.local
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    // Si es correcta, traemos los datos de Neon
    const sql = neon(process.env.DATABASE_URL);
    const rsvps = await sql`SELECT * FROM rsvps ORDER BY created_at DESC`;

    return NextResponse.json({ rsvps }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}