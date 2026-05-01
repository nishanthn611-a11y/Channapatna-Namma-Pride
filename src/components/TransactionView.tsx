import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, ArrowDownRight, ArrowUpRight, Clock, CheckCircle2, CreditCard, Banknote, Smartphone } from 'lucide-react';

export default function TransactionView({ t, lang, orders, user }: { t: any, lang: string, orders: any[], user: any }) {
  // Use orders as transactions for demonstration 
  
  const transactions = orders.map(order => ({
    id: `TXN-${order.id}`,
    date: order.date,
    amount: order.item.price,
    type: 'purchase',
    status: order.status === 'cancelled' || order.status === 'returned' ? 'failed' : 'success',
    item: lang === 'kn' ? order.item.kn_name : order.item.en_name,
    paymentMethod: order.item.paymentMethod || 'cod'
  }));

  const totalSpent = transactions
    .filter(t => t.status === 'success')
    .reduce((sum, t) => {
      // Parse amount which is like "₹450"
      const num = parseInt(t.amount.replace(/[^0-9]/g, ''));
      return sum + (isNaN(num) ? 0 : num);
    }, 0);

  return (
    <div className="flex flex-col h-full bg-violet-50 p-6 overflow-y-auto">
      <h1 className="text-3xl font-black text-violet-900 mb-6 drop-shadow-sm flex items-center gap-2">
        <Wallet size={32} />
        {lang === 'kn' ? 'ವಹಿವಾಟುಗಳು' : 'Transactions'}
      </h1>

      <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-[2rem] p-6 text-white border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] mb-8">
        <p className="font-bold text-violet-200 mb-1">{lang === 'kn' ? 'ಒಟ್ಟು ಖರ್ಚು' : 'Total Spent'}</p>
        <div className="text-4xl font-black tracking-tight flex items-baseline gap-1">
          <span className="text-2xl">₹</span>
          {totalSpent.toLocaleString('en-IN')}
        </div>
        <div className="mt-4 flex gap-2 flex-wrap">
           <div className="bg-white/20 px-3 py-1 text-sm font-bold rounded-xl border-2 border-white/30 backdrop-blur-sm">
             {transactions.filter(t => t.status === 'success').length} {lang === 'kn' ? 'ಯಶಸ್ವಿ' : 'Successful'}
           </div>
           <div className="bg-white/20 px-3 py-1 text-sm font-bold rounded-xl border-2 border-white/30 backdrop-blur-sm">
             {transactions.filter(t => t.status === 'failed').length} {lang === 'kn' ? 'ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ/ಮರಳಿಸಲಾಗಿದೆ' : 'Cancelled/Returned'}
           </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-black text-gray-900 mb-2">{lang === 'kn' ? 'ಇತ್ತೀಚಿನ ವಹಿವಾಟುಗಳು' : 'Recent Transactions'}</h2>
        
        {transactions.length === 0 ? (
          <div className="bg-white p-8 rounded-[2rem] border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] text-center text-gray-500 font-bold">
            {lang === 'kn' ? 'ಯಾವುದೇ ವಹಿವಾಟುಗಳಿಲ್ಲ.' : 'No transactions found.'}
          </div>
        ) : (
          <AnimatePresence>
            {transactions.map((txn, idx) => (
              <motion.div
                key={txn.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl p-4 border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl border-2 border-gray-900 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] shrink-0
                    ${txn.status === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-500'}
                  `}>
                    {txn.paymentMethod === 'card' ? <CreditCard size={24} /> : txn.paymentMethod === 'upi' ? <Smartphone size={24} /> : <Banknote size={24} />}
                  </div>
                  <div>
                    <div className="font-black text-gray-900 leading-tight">
                      {txn.item}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                        <Clock size={10} /> {txn.date}
                      </span>
                      <span className="text-xs font-bold text-gray-400">
                        {txn.id}
                      </span>
                    </div>
                    <div className="text-[10px] font-bold text-gray-500 mt-1 uppercase">
                      {txn.paymentMethod === 'card' ? 'CARD' : txn.paymentMethod === 'upi' ? 'UPI' : 'CASH'}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-black text-lg ${txn.status === 'success' ? 'text-gray-900' : 'text-gray-400 line-through'}`}>
                    -{txn.amount}
                  </div>
                  {txn.status === 'success' ? (
                     <div className="text-[10px] font-bold text-emerald-600 uppercase flex items-center gap-1 justify-end mt-1">
                       <CheckCircle2 size={10} /> {lang === 'kn' ? 'ಯಶಸ್ವಿ' : 'SUCCESS'}
                     </div>
                  ) : (
                     <div className="text-[10px] font-bold text-red-500 uppercase flex items-center gap-1 justify-end mt-1">
                       {lang === 'kn' ? 'ವಿಫಲವಾಗಿದೆ' : 'FAILED'}
                     </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
      
    </div>
  );
}
