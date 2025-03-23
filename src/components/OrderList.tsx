// import { useEffect } from 'react';
import { Order } from '../api';
import GlassCard from './GlassCard';

interface Props {
  orders: Order[];
}

export default function OrderList({ orders }: Props) {
  return (
    // bg-blue-500
    <div className="absolute top-0 right-0 z-50 m-4 text-white" style={{ height: '85%', fontSize: '5.5vh' }}>
      {orders.length > 0 && (
        <div>
          <GlassCard className="top-0 right-0 mb-4 px-6 py-4 text-center">Ready</GlassCard>
          <div
            className="grid grid-flow-col-dense gap-4"
            style={{ gridTemplateRows: 'repeat(6, minmax(0, 1fr))' }}
            dir="rtl"
          >
            {orders.map((order, index) => (
              <GlassCard key={index} className="text-center p-4">
                {order.number}
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
