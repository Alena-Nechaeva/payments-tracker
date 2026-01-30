import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/src/lib/firebase/requireUser';
import { adminDb } from '@/src/lib/firebase/admin';
import { FieldValue } from 'firebase-admin/firestore';

type TPayments = {
  bill: {
    id: string;
    name: string;
    slug: string;
  };
  amount: number;
};

export async function GET(req: NextRequest) {
  try {
    await requireUser(req);

    const year = new Date().getFullYear().toString();
    const snapshot = await adminDb.collection('payments').doc(year).collection('months').get();

    const payments = snapshot.docs.map(doc => ({
      month: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ year, payments });
  } catch (error: any) {
    console.error('Error fetching payments:', error);

    const status = error.message === 'Missing token' || error.message === 'Forbidden' ? 401 : 500;

    return NextResponse.json({ error: error.message ?? 'Failed to fetch payments' }, { status });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireUser(request);

    const body: { month: string; payments: TPayments[] } = await request.json();

    if (!body.month) {
      return NextResponse.json({ error: 'Month is required' }, { status: 400 });
    }

    if (!body.payments || !body.payments.length) {
      return NextResponse.json({ error: 'Payments information is required' }, { status: 400 });
    }

    const year = new Date().getFullYear().toString();
    const monthId = body.month.toLowerCase();
    const monthDocRef = await adminDb.collection('payments').doc(year).collection('months').doc(monthId);

    await monthDocRef.set(
      {
        updatedAt: FieldValue.serverTimestamp(),
        payments: body.payments
      },
      { merge: true }
    );
    return NextResponse.json({ success: true, month: monthId, message: 'Month payments saved' }, { status: 201 });
  } catch (error: any) {
    console.error('Error saving payments:', error);

    const status = error.message === 'Missing token' || error.message === 'Forbidden' ? 401 : 500;

    return NextResponse.json({ error: error.message ?? 'Failed to save payments' }, { status });
  }
}
