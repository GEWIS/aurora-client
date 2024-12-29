// import { useEffect } from 'react';
import { Order } from '../api';

interface Props {
  orders: Order[];
}

export default function OrderList({ orders }: Props) {
  return (
    // bg-blue-500
    <div className="absolute top-0 right-0 z-50 m-4 text-white" style={{ height: '85%', fontSize: '5.5vh' }}>
      {orders.length > 0 && (
        <div>
          <div className="top-0 right-0 mb-4 bg-opacity-80 bg-gray-400 p-4 rounded-lg text-right">Ready</div>
          <div
            className="grid grid-flow-col-dense gap-4"
            style={{ gridTemplateRows: 'repeat(6, minmax(0, 1fr))' }}
            dir="rtl"
          >
            {orders.map((order, index) => (
              <div key={index} className="bg-gray-400 p-4 bg-opacity-80 rounded-lg text-center animate-slide-in">
                {order.number}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
