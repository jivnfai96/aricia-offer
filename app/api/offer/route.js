import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const dataFile = path.resolve(process.cwd(), 'data.json');

export async function GET() {
  try {
    const json = await fs.readFile(dataFile, 'utf-8');
    const data = JSON.parse(json);
    return NextResponse.json({ left: data.left });
  } catch (err) {
    return NextResponse.json({ error: 'Could not read data' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    if (typeof body.left !== 'number') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    const data = { left: body.left };
    await fs.writeFile(dataFile, JSON.stringify(data));
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Could not save data' }, { status: 500 });
  }
}
