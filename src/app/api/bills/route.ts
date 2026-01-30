import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/src/lib/firebase/requireUser';
import { adminDb } from '@/src/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function GET(req: NextRequest) {
  try {
    await requireUser(req);

    const snapshot = await adminDb.collection('bills').get();

    const bills = snapshot.docs.map(doc => ({
      id: doc.id, // Firestore auto-generated ID
      ...doc.data(),
      date: doc.data().date?.toDate().toISOString()
    }));

    return NextResponse.json({ bills });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireUser(request);

    const body: { name: string } = await request.json();

    if (!body.name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const docRef = await adminDb.collection('bills').add({
      name: body.name,
      slug: body.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-'),
      enabled: true,
      date: FieldValue.serverTimestamp()
    });

    return NextResponse.json(
      {
        success: true,
        id: docRef.id,
        message: 'Bill created successfully'
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating bill:', error);

    const status = error.message === 'Missing token' || error.message === 'Forbidden' ? 401 : 500;

    return NextResponse.json({ error: error.message ?? 'Failed to create bill' }, { status });
  }
}
