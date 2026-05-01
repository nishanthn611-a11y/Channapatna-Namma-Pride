import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Truck, CheckCircle2, Clock, ShoppingBag, X, RefreshCw, User, MapPin, Phone } from 'lucide-react';

interface Order {
  id: string;
  item: any;
  status: 'placed' | 'processing' | 'shipped' | 'delivered' | 'returned' | 'cancelled';
  date: string;
  trackingNumber?: string;
  carrier?: string;
  expectedDelivery?: string;
  shippingDetails?: {
    name: string;
    address: string;
    pincode: string;
    phone: string;
  };
}

interface OrderTrackingViewProps {
  t: any;
  lang: string;
  orders: Order[];
  user: any;
  onNavigate: (t: string) => void;
  onReturnOrder: (id: string) => void;
  onCancelOrder: (id: string) => void;
}

export default function OrderTrackingView({ t, lang, orders, user, onNavigate, onReturnOrder, onCancelOrder }: OrderTrackingViewProps) {
  const [returnOrderInfo, setReturnOrderInfo] = useState<{id: string, item: any} | null>(null);
  const [cancelOrderInfo, setCancelOrderInfo] = useState<{id: string, item: any} | null>(null);
  
  const getStatusIndex = (status: Order['status']) => {
    switch (status) {
      case 'placed': return 0;
      case 'processing': return 1;
      case 'shipped': return 2;
      case 'delivered': return 3;
      case 'returned': return -1;
      case 'cancelled': return -2;
      default: return 0;
    }
  };

  const steps = [
    { key: 'placed', icon: <ShoppingBag size={18} />, en: 'Placed', kn: 'ಆದೇಶಿಸಲಾಗಿದೆ' },
    { key: 'processing', icon: <Clock size={18} />, en: 'Processing', kn: 'ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ' },
    { key: 'shipped', icon: <Truck size={18} />, en: 'Shipped', kn: 'ರವಾನಿಸಲಾಗಿದೆ' },
    { key: 'delivered', icon: <CheckCircle2 size={18} />, en: 'Delivered', kn: 'ತಲುಪಿಸಲಾಗಿದೆ' },
  ];

  return (
    <div className="flex flex-col h-full bg-emerald-50 p-6 overflow-y-auto relative">
      <h1 className="text-3xl font-black text-emerald-900 mb-6 drop-shadow-sm">{lang === 'kn' ? 'ನನ್ನ ಆದೇಶಗಳು' : 'My Orders'}</h1>
      
      {user && user.name !== 'Guest User' && (
        <div className="bg-white rounded-[2rem] p-5 border-4 border-emerald-900 shadow-[6px_6px_0px_0px_rgba(6,78,59,1)] mb-6">
          <h2 className="text-xl font-black text-emerald-900 mb-4">{lang === 'kn' ? 'ಗ್ರಾಹಕರ ವಿವರಗಳು' : 'Customer Details'}</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-xl text-emerald-700">
                <User size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-500">{lang === 'kn' ? 'ಹೆಸರು' : 'Name'}</div>
                <div className="font-bold text-gray-900">{user.name}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-xl text-emerald-700">
                <MapPin size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-500">{lang === 'kn' ? 'ವಿಳಾಸ' : 'Address'}</div>
                <div className="font-bold text-gray-900 text-sm">{user.address}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-xl text-emerald-700">
                <Phone size={18} />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-500">{lang === 'kn' ? 'ದೂರವಾಣಿ' : 'Phone'}</div>
                <div className="font-bold text-gray-900">{user.phone}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-4 border-4 border-emerald-900 shadow-[6px_6px_0px_0px_rgba(6,78,59,1)]">
            <Package size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-xl font-black text-gray-900 mb-2">{lang === 'kn' ? 'ಯಾವುದೇ ಆದೇಶಗಳಿಲ್ಲ' : 'No Orders Yet'}</h2>
          <p className="text-gray-600 font-medium mb-6">{lang === 'kn' ? 'ನೀವು ಇನ್ನೂ ಯಾವುದೇ ಆಟಿಕೆಗಳನ್ನು ಖರೀದಿಸಿಲ್ಲ.' : 'You haven\'t purchased any toys yet.'}</p>
          <button 
            onClick={() => onNavigate('catalog')}
            className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold border-4 border-emerald-900 shadow-[4px_4px_0px_0px_rgba(6,78,59,1)] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(6,78,59,1)] transition-all"
          >
            <ShoppingBag size={20} />
            {lang === 'kn' ? 'ಶಾಪಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ' : 'Start Shopping'}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order, idx) => {
            const currentStep = getStatusIndex(order.status);
            
            return (
              <motion.div 
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[2rem] p-5 border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(17,24,39,1)]"
              >
                <div className="flex items-center gap-4 mb-6 sticky top-0 bg-white z-20 py-2">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl border-2 border-gray-900 overflow-hidden shrink-0 flex items-center justify-center p-2">
                    <img src={order.item.img} alt={order.item.en_name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-emerald-600 mb-1">
                      {lang === 'kn' ? 'ಆದೇಶ' : 'Order'} #{order.id}
                    </div>
                    <h3 className="font-black text-gray-900 text-lg leading-tight mb-1">
                      {lang === 'kn' ? order.item.kn_name : order.item.en_name}
                    </h3>
                    <div className="text-sm font-bold text-gray-500">{order.date}</div>
                  </div>
                </div>

                {order.status === 'returned' ? (
                  <div className="bg-red-50 p-4 rounded-xl border-2 border-red-200 text-center text-red-700 font-bold flex items-center justify-center gap-2">
                    <RefreshCw size={18} />
                    {lang === 'kn' ? 'ಉತ್ಪನ್ನವನ್ನು ಹಿಂತಿರುಗಿಸಲಾಗಿದೆ' : 'Product Returned'}
                  </div>
                ) : order.status === 'cancelled' ? (
                  <div className="bg-gray-100 p-4 rounded-xl border-2 border-gray-300 text-center text-gray-700 font-bold flex items-center justify-center gap-2">
                    <X size={18} />
                    {lang === 'kn' ? 'ಆದೇಶ ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ' : 'Order Cancelled'}
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute top-4 left-4 right-4 h-1 bg-gray-200 rounded-full z-0"></div>
                    <div 
                      className="absolute top-4 left-4 h-1 bg-emerald-500 rounded-full z-0 transition-all duration-500"
                      style={{ width: `calc(${(currentStep / (steps.length - 1)) * 100}% - 2rem)` }}
                    ></div>
                    
                    <div className="flex justify-between relative z-10 w-full mb-6">
                      {steps.map((step, stepIdx) => {
                        const isCompleted = stepIdx <= currentStep;
                        const isCurrent = stepIdx === currentStep;
                        
                        return (
                          <div key={step.key} className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 transition-colors ${isCompleted ? 'bg-emerald-500 border-emerald-900 text-white shadow-[2px_2px_0px_0px_rgba(6,78,59,1)]' : 'bg-gray-100 border-gray-300 text-gray-400'}`}>
                              {step.icon}
                            </div>
                            <span className={`text-[10px] font-bold ${isCurrent ? 'text-emerald-700' : isCompleted ? 'text-gray-800' : 'text-gray-400'}`}>
                              {lang === 'kn' ? step.kn : step.en}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    
                    { (order.trackingNumber || order.carrier || order.expectedDelivery) && (
                      <div className="bg-emerald-50 p-3 rounded-xl border-2 border-emerald-200 mb-4 text-sm mt-4">
                        {order.carrier && (
                          <div className="flex justify-between mb-1">
                            <span className="font-bold text-gray-600">{lang === 'kn' ? 'ವಿತರಕರು:' : 'Carrier:'}</span>
                            <span className="font-black text-gray-900">{order.carrier}</span>
                          </div>
                        )}
                        {order.trackingNumber && (
                          <div className="flex justify-between mb-1">
                            <span className="font-bold text-gray-600">{lang === 'kn' ? 'ಟ್ರ್ಯಾಕಿಂಗ್ ಸಂಖ್ಯೆ:' : 'Tracking No:'}</span>
                            <span className="font-black text-gray-900">{order.trackingNumber}</span>
                          </div>
                        )}
                        {order.expectedDelivery && (
                          <div className="flex justify-between">
                            <span className="font-bold text-gray-600">{lang === 'kn' ? 'ನಿರೀಕ್ಷಿತ ವಿತರಣೆ:' : 'Expected Delivery:'}</span>
                            <span className="font-black text-emerald-700">{order.expectedDelivery}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {order.shippingDetails && (
                      <div className="bg-gray-50 p-3 rounded-xl border-2 border-gray-200 mt-4 text-sm animate-in fade-in">
                        <div className="font-bold text-gray-700 mb-1">{lang === 'kn' ? 'ಶಿಪ್ಪಿಂಗ್ ವಿಳಾಸ' : 'Shipping Address'}</div>
                        <div className="text-gray-900 font-medium">
                          {order.shippingDetails.name}<br/>
                          {order.shippingDetails.address}<br/>
                          PIN: {order.shippingDetails.pincode}<br/>
                          Phone: {order.shippingDetails.phone}
                        </div>
                      </div>
                    )}
                    
                    {order.status === 'delivered' && (
                      <div className="pt-2 flex justify-center">
                        <button 
                          onClick={() => setReturnOrderInfo({id: order.id, item: order.item})}
                          className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-xl font-bold border-2 border-red-700 hover:bg-red-200 transition-colors text-sm"
                        >
                          <RefreshCw size={16} />
                          {lang === 'kn' ? 'ತಪ್ಪು ಉತ್ಪನ್ನ - ಹಿಂದಿರುಗಿಸಿ' : 'Wrong Product - Return'}
                        </button>
                      </div>
                    )}

                    {currentStep < 2 && (
                      <div className="pt-2 flex justify-center mt-2">
                        <button 
                          onClick={() => setCancelOrderInfo({id: order.id, item: order.item})}
                          className="flex items-center gap-2 bg-gray-100 text-gray-600 px-4 py-2 rounded-xl font-bold border-2 border-gray-300 hover:bg-gray-200 transition-colors text-sm"
                        >
                          <X size={16} />
                          {lang === 'kn' ? 'ಆದೇಶ ರದ್ದುಗೊಳಿಸಿ' : 'Cancel Order'}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {returnOrderInfo && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2rem] p-6 border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] w-full max-w-sm"
            >
              <h3 className="text-xl font-black text-gray-900 mb-2">
                {lang === 'kn' ? 'ವಸ್ತು ಹಿಂದಿರುಗಿಸಿ' : 'Return Item'}
              </h3>
              <p className="text-gray-600 font-medium mb-6 text-sm">
                {lang === 'kn' ? 'ತಪ್ಪು ಉತ್ಪನ್ನವನ್ನು ಕಳುಹಿಸಲಾಗಿದೆಯೇ? ನೀವು ಅದನ್ನು ಹಿಂದಿರುಗಿಸಬಹುದು.' : 'Did you receive the wrong product? You can return it for a replacement or refund.'}
              </p>
              
              <div className="flex items-center gap-3 mb-6 p-3 bg-gray-100 rounded-xl border-2 border-gray-300">
                <img src={returnOrderInfo.item.img} alt={returnOrderInfo.item.en_name} className="w-12 h-12 object-contain" />
                <div className="flex-1">
                  <div className="text-xs font-bold text-emerald-600">{lang === 'kn' ? 'ಆದೇಶ' : 'Order'} #{returnOrderInfo.id}</div>
                  <div className="font-bold text-gray-900 text-sm leading-tight">
                    {lang === 'kn' ? returnOrderInfo.item.kn_name : returnOrderInfo.item.en_name}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setReturnOrderInfo(null)}
                  className="flex-1 py-3 bg-gray-100 text-gray-800 font-bold rounded-xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:bg-gray-200 active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-all"
                >
                  {lang === 'kn' ? 'ರದ್ದುಮಾಡಿ' : 'Cancel'}
                </button>
                <button 
                  onClick={() => {
                    onReturnOrder(returnOrderInfo.id);
                    setReturnOrderInfo(null);
                  }}
                  className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:bg-red-400 active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-all"
                >
                  {lang === 'kn' ? 'ಹಿಂದಿರುಗಿಸಿ' : 'Confirm Return'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {cancelOrderInfo && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[2rem] p-6 border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] w-full max-w-sm"
            >
              <h3 className="text-xl font-black text-gray-900 mb-2">
                {lang === 'kn' ? 'ಆದೇಶ ರದ್ದುಗೊಳಿಸಿ' : 'Cancel Order'}
              </h3>
              <p className="text-gray-600 font-medium mb-6 text-sm">
                {lang === 'kn' ? 'ನೀವು ಖಚಿತವಾಗಿ ಈ ಆದೇಶವನ್ನು ರದ್ದುಗೊಳಿಸಲು ಬಯಸುತ್ತೀರಾ? ಈ ಕ್ರಮವನ್ನು ಬದಲಾಯಿಸಲಾಗುವುದಿಲ್ಲ.' : 'Are you sure you want to cancel this order? This action cannot be undone.'}
              </p>
              
              <div className="flex items-center gap-3 mb-6 p-3 bg-gray-100 rounded-xl border-2 border-gray-300">
                <img src={cancelOrderInfo.item.img} alt={cancelOrderInfo.item.en_name} className="w-12 h-12 object-contain" />
                <div className="flex-1">
                  <div className="text-xs font-bold text-emerald-600">{lang === 'kn' ? 'ಆದೇಶ' : 'Order'} #{cancelOrderInfo.id}</div>
                  <div className="font-bold text-gray-900 text-sm leading-tight">
                    {lang === 'kn' ? cancelOrderInfo.item.kn_name : cancelOrderInfo.item.en_name}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setCancelOrderInfo(null)}
                  className="flex-1 py-3 bg-gray-100 text-gray-800 font-bold rounded-xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:bg-gray-200 active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-all"
                >
                  {lang === 'kn' ? 'ಹಿಂದಕ್ಕೆ' : 'Back'}
                </button>
                <button 
                  onClick={() => {
                    onCancelOrder(cancelOrderInfo.id);
                    setCancelOrderInfo(null);
                  }}
                  className="flex-1 py-3 bg-gray-900 text-white font-bold rounded-xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:bg-gray-800 active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-all"
                >
                  {lang === 'kn' ? 'ಖಚಿತಪಡಿಸಿ' : 'Confirm'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
