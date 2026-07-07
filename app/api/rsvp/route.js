import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, attending } = await request.json();

    if (!name || !attending) {
      return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
    }

    // Se conecta usando tu llave secreta
    const sql = neon(process.env.DATABASE_URL);

    // Ejecuta la inserción en SQL puro
    await sql`
      INSERT INTO rsvps (name, attending, created_at)
      VALUES (${name}, ${attending}, NOW());
    `;

    return NextResponse.json({ message: 'Confirmación guardada' }, { status: 200 });
  } catch (error) {
    console.error('Error guardando RSVP:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}