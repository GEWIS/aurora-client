import { AnimatePresence, motion, TargetAndTransition } from 'framer-motion';
import { Order } from '../api';
import GlassCard from './GlassCard';

interface Props {
  orders: Order[];
}

export default function OrderList({ orders }: Props) {
  const animationInitial: TargetAndTransition = {
    scale: 0,
  };
  const animationIn: TargetAndTransition = {
    scale: 1,
    transition: { delay: 0.5, type: 'spring' },
  };
  const animationOut: TargetAndTransition = {
    opacity: 0,
    transition: { delay: 0.5 },
  };

  return (
    // bg-blue-500
    <div className="absolute top-0 right-0 z-50 m-[1.5vh] text-white" style={{ height: '85%', fontSize: '5.5vh' }}>
      <div>
        <AnimatePresence>
          {orders.length > 0 && (
            <motion.div initial={animationInitial} animate={animationIn} exit={animationOut}>
              <GlassCard className="top-0 right-0 mb-[1.5vh] px-[2vh] py-[1.5vh] text-center">Ready</GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
        <ul
          className="grid grid-flow-col-dense gap-[1.5vh]"
          style={{ gridTemplateRows: 'repeat(6, minmax(0, 1fr))' }}
          dir="rtl"
        >
          <AnimatePresence>
            {orders.map((order) => (
              <motion.li key={order.number} initial={animationInitial} animate={animationIn} exit={animationOut} layout>
                <GlassCard className="text-center p-[1.5vh] min-w-[2.3em]">{order.number}</GlassCard>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
