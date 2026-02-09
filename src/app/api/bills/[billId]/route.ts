import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/src/lib/firebase/requireUser';
import { adminDb } from '@/src/lib/firebase/admin';
import { TTypeBill } from '@/src/store/store.types';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ billId: string }> }) {
  try {
    await requireUser(req);

    const { billId } = await params;

    const billRef = adminDb.collection('bills').doc(billId);
    const billDoc = await billRef.get();
    if (!billDoc.exists) {
      return NextResponse.json({ error: 'Bill not found' }, { status: 404 });
    }

    await billRef.delete();

    return NextResponse.json({
      id: billId,
      success: true,
      message: 'Bill deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting bill:', error);

    const status = error.message === 'Missing token' || error.message === 'Forbidden' ? 401 : 500;

    return NextResponse.json({ error: error.message ?? 'Failed to delete bill' }, { status });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ billId: string }> }) {
  try {
    await requireUser(request);

    const { billId } = await params;
    const body: { name: string; type: TTypeBill } = await request.json();

    const billRef = adminDb.collection('bills').doc(billId);
    const billDoc = await billRef.get();

    if (!billDoc.exists) {
      return NextResponse.json({ error: 'Bill not found' }, { status: 404 });
    }

    if (!body.name || !body.type) {
      return NextResponse.json({ error: 'Name and type are required' }, { status: 400 });
    }

    await billRef.update({
      name: body.name,
      slug: body.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-'),
      type: body.type
    });

    return NextResponse.json(
      {
        success: true,
        id: billId,
        message: 'Bill updated successfully'
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error updating bill:', error);

    const status = error.message === 'Missing token' || error.message === 'Forbidden' ? 401 : 500;

    return NextResponse.json({ error: error.message ?? 'Failed to update bill' }, { status });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ billId: string }> }) {
  try {
    const { billId } = await params;
    const { enabled } = await request.json();

    const billRef = adminDb.collection('bills').doc(billId);
    const billDoc = await billRef.get();

    if (!billDoc.exists) {
      return NextResponse.json({ error: 'Bill not found' }, { status: 404 });
    }

    if (typeof enabled !== 'boolean') {
      return NextResponse.json({ error: 'Field "enabled" is required and must be a boolean' }, { status: 400 });
    }

    await billRef.update({ enabled });

    return NextResponse.json(
      {
        success: true,
        id: billId,
        message: `Bill ${enabled ? 'enabled' : 'disabled'} successfully`
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error updating bill:', error);

    const status = error.message === 'Missing token' || error.message === 'Forbidden' ? 401 : 500;

    return NextResponse.json({ error: error.message ?? 'Failed to update bill' }, { status });
  }
}
