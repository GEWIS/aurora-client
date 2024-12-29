import { Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Order } from '../api';
import OrderList from '../components/OrderList';

interface Props {
  socket: Socket;
}

export default function OrdersOverlay({ socket }: Props) {
  const [orders, setOrders] = useState<Order[]>([
    {
      number: -420,
      startTime: new Date().toISOString(),
      timeoutSeconds: 3600,
    },
    {
      number: -69,
      startTime: new Date().toISOString(),
      timeoutSeconds: 3600,
    },
  ]);

  useEffect(() => {
    socket.on('orders', (newOrderSet) => {
      setOrders(newOrderSet[0].orders);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [socket]);

  return <OrderList orders={orders} />;
}
