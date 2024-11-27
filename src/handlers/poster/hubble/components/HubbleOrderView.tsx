import { useEffect } from 'react';

interface Props {
  orders: string[];
}

export default function HubbleOrderView({ orders }: Props) {
  useEffect(() => {
    //   Do something when the orders change
  }, [orders]);

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
                {order}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
