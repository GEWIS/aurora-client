import { Socket } from 'socket.io-client';
import { useCallback, useEffect, useState } from 'react';
import { getAllOrders, Order } from '../api';
import OrderList from '../components/OrderList';

interface ShowOrdersEvent {
  orders: Order[];
}

interface Props {
  socket: Socket;
}

export default function OrdersOverlay({ socket }: Props) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getAllOrders()
      .then((ordersRes) => {
        if (!ordersRes.data) return;
        setOrders(ordersRes.data);
      })
      .catch((err) => {
        console.error(err);
      });

    socket.on('orders', (newOrderSet) => {
      setOrders((newOrderSet as ShowOrdersEvent[])[0].orders);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [socket]);

  const pruneAndGetShortestTime = useCallback(() => {
    let shortestTimeTillEnd = 360 * 1000;

    for (let i = 0; i < orders.length; i++) {
      const timeTillOrderEnd = new Date(orders[i].startTime).getTime() + orders[i].timeoutSeconds * 1000 - Date.now();

      if (timeTillOrderEnd < 0) {
        setOrders(orders.toSpliced(i, 1));
        i--;
        return -1;
      }

      if (timeTillOrderEnd < shortestTimeTillEnd) {
        shortestTimeTillEnd = timeTillOrderEnd;
      }
    }

    return shortestTimeTillEnd;
  }, [orders]);

  useEffect(() => {
    const shortestTimeTillEnd = pruneAndGetShortestTime();

    if (shortestTimeTillEnd == -1) {
      return;
    }

    const timeout = setTimeout(pruneAndGetShortestTime, shortestTimeTillEnd + 10);
    return () => {
      clearTimeout(timeout);
    };
  }, [orders, pruneAndGetShortestTime]);

  return <OrderList orders={orders} />;
}
