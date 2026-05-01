import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, X, MapPin, Navigation, Star, ShieldCheck, Search, Heart, CreditCard, Smartphone, Banknote } from 'lucide-react';
import { catalogItems } from '../data';

interface CatalogViewProps {
  t: any;
  lang: string;
  user: any;
  onNavigate: (t: string) => void;
  wishlist: string[];
  setWishlist: React.Dispatch<React.SetStateAction<string[]>>;
  onPurchase: (item: any) => void;
  onRequireLogin: () => void;
}

export default function CatalogView({ t, lang, user, onNavigate, wishlist, setWishlist, onPurchase, onRequireLogin }: CatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'wishlist'>('all');
  const [confirmItem, setConfirmItem] = useState<any>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [notifyItem, setNotifyItem] = useState<any>(null);
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingPincode, setShippingPincode] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');

  // Use localized names directly from translation mapping based on English keys for simplicity, 
  // or use the pre-mapped array in data file.
  
  // Custom puzzle piece border radii to make the grid look interlocking
  const puzzleRadii = [
    "rounded-tl-[3rem] rounded-tr-[1rem] rounded-bl-[1rem] rounded-br-[3rem]",
    "rounded-tl-[1rem] rounded-tr-[3rem] rounded-bl-[3rem] rounded-br-[1rem]",
    "rounded-tl-[2rem] rounded-tr-[2rem] rounded-bl-[0.5rem] rounded-br-[3rem]",
    "rounded-tl-[3rem] rounded-tr-[0.5rem] rounded-bl-[2rem] rounded-br-[2rem]",
  ];

  const handleLocateStore = (item: any) => {
    if (user && user.name === 'Guest User') {
      setShowLoginPrompt(true);
    } else {
      setConfirmItem(item);
    }
  };

  const filteredItems = useMemo(() => {
    let items = catalogItems;
    if (activeTab === 'wishlist') {
      items = items.filter(item => wishlist.includes(item.en_name));
    }
    
    const query = searchQuery.toLowerCase();
    if (!query) return items;
    return items.filter(item => 
      item.en_name.toLowerCase().includes(query) || 
      item.kn_name.includes(query)
    );
  }, [searchQuery, activeTab, wishlist]);

  const toggleWishlist = (e: React.MouseEvent, enName: string) => {
    e.stopPropagation();
    setWishlist(prev => 
      prev.includes(enName) 
        ? prev.filter(name => name !== enName)
        : [...prev, enName]
    );
  };

  return (
    <div className="flex flex-col h-full bg-pink-50 p-6 overflow-y-auto overflow-x-hidden pb-24 relative">
      <div className="absolute inset-0 bg-[#fdf2f8] opacity-50 bg-[radial-gradient(#f472b6_2px,transparent_2px)] [background-size:24px_24px] pointer-events-none"></div>
      
      <div className="mb-6 flex flex-col gap-4 relative z-10 mt-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-pink-900 drop-shadow-sm border-b-4 border-pink-400 pb-2 inline-block self-start">{t.catalogHeading}</h1>
          <div className="flex bg-white rounded-xl border-4 border-gray-900 p-1 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)]">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${activeTab === 'all' ? 'bg-pink-500 text-white' : 'text-gray-600 hover:bg-pink-50'}`}
            >
              {lang === 'kn' ? 'ಎಲ್ಲಾ' : 'All'}
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-1.5 ${activeTab === 'wishlist' ? 'bg-pink-500 text-white' : 'text-gray-600 hover:bg-pink-50'}`}
            >
              <Heart size={16} className={activeTab === 'wishlist' ? "fill-white" : ""} />
              {lang === 'kn' ? 'ಹಾರೈಕೆ ಪಟ್ಟಿ' : 'Wishlist'}
              {wishlist.length > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{wishlist.length}</span>}
            </button>
          </div>
        </div>
        
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-pink-400" size={20} />
          </div>
          <input
            type="text"
            className="w-full bg-white border-4 border-pink-300 rounded-2xl pl-10 pr-4 py-3 text-lg font-bold text-gray-800 placeholder-pink-300 focus:outline-none focus:border-pink-500 shadow-[4px_4px_0px_0px_rgba(244,114,182,1)]"
            placeholder={lang === 'kn' ? "ಆಟಿಕೆಗಳನ್ನು ಹುಡುಕಿ..." : "Search toys..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 relative z-10">
        {filteredItems.length === 0 ? (
          <div className="col-span-2 text-center py-10 bg-white border-4 border-gray-900 rounded-2xl shadow-[6px_6px_0px_0px_rgba(17,24,39,1)]">
            <p className="font-black text-gray-500 text-lg">
              {lang === 'kn' ? "ಯಾವುದೇ ಆಟಿಕೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ" : "No toys found"}
            </p>
          </div>
        ) : (
          filteredItems.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
            className={`bg-white p-3 border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(17,24,39,1)] flex flex-col hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] transition-all ${puzzleRadii[idx % 4]}`}
            onClick={() => handleLocateStore(item)}
          >
             <div className={`${['bg-blue-100', 'bg-green-100', 'bg-yellow-100', 'bg-purple-100'][idx%4]} rounded-2xl border-4 border-gray-900 overflow-hidden mb-3 aspect-square w-full relative flex items-center justify-center p-2`}>
                <img src={item.img} alt={item.en_name} className="w-full h-full object-contain transition-transform duration-500 hover:scale-110" referrerPolicy="no-referrer" />
                <button 
                  onClick={(e) => toggleWishlist(e, item.en_name)}
                  className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full border-2 border-gray-900 shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] hover:bg-white transition-colors z-10"
                >
                  <Heart size={16} className={`${wishlist.includes(item.en_name) ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
                </button>
             </div>
            <div className="flex-1 flex flex-col justify-end pt-1">
              <h3 className="font-black text-gray-900 leading-tight mb-1 text-[15px]">
                {lang === 'kn' ? item.kn_name : item.en_name}
              </h3>
              <div className="flex items-center justify-between mb-3">
                <p className="text-pink-600 font-black text-sm bg-pink-100 px-2 py-0.5 border-2 border-pink-300 rounded-xl">{item.price}</p>
                {item.stock > 0 ? (
                  <span className="text-[10px] font-bold text-gray-500">{lang === 'kn' ? `ಸ್ಟಾಕ್: ${item.stock}` : `Stock: ${item.stock}`}</span>
                ) : (
                  <span className="text-[10px] font-bold text-red-500 uppercase">{lang === 'kn' ? 'ಸ್ಟಾಕ್ ಇಲ್ಲ' : 'Out of Stock'}</span>
                )}
              </div>
              
              {item.stock > 0 ? (
                <button 
                  onClick={(e) => { e.stopPropagation(); handleLocateStore(item); }}
                  className="w-full bg-gray-900 text-white font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-1.5 hover:bg-gray-800 active:translate-y-[2px] transition-all shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] active:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)]"
                >
                  <ShoppingBag size={16} />
                  {lang === 'kn' ? 'ಈಗ ಖರೀದಿಸಿ' : 'Buy Now'}
                </button>
              ) : (
                <button 
                  onClick={(e) => { e.stopPropagation(); setNotifyItem(item); }}
                  className="w-full bg-gray-200 text-gray-600 font-bold py-2.5 rounded-xl text-sm flex items-center justify-center gap-1.5 hover:bg-gray-300 active:translate-y-[2px] transition-all border-2 border-gray-400"
                >
                  {lang === 'kn' ? 'ನನಗೆ ತಿಳಿಸಿ' : 'Notify Me'}
                </button>
              )}
            </div>
          </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {confirmItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setConfirmItem(null)}
          >
             <div className="bg-white rounded-[2rem] border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] p-6 max-w-md w-full relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
               <div className="absolute top-4 right-4 cursor-pointer z-10" onClick={() => setConfirmItem(null)}>
                 <X size={20} className="text-gray-900 font-black" />
               </div>
               <h2 className="text-2xl font-black text-gray-900 mb-4 pr-6">{lang === 'kn' ? 'ಪಾವತಿ' : 'Payment'}</h2>
               
               <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border-2 border-gray-200 mb-6">
                 <img src={confirmItem.img} alt={confirmItem.en_name} className="w-16 h-16 rounded-xl object-cover border-2 border-gray-900 shrink-0" />
                 <div className="flex-1 min-w-0">
                   <h3 className="font-black text-gray-900 leading-tight truncate">
                     {lang === 'kn' ? confirmItem.kn_name : confirmItem.en_name}
                   </h3>
                   <div className="text-pink-600 font-black mt-1">{confirmItem.price}</div>
                 </div>
               </div>

               <h3 className="font-bold text-gray-900 mb-3">{lang === 'kn' ? 'ಶಿಪ್ಪಿಂಗ್ ವಿವರಗಳು' : 'Shipping Details'}</h3>
               <div className="flex flex-col gap-3 mb-6 animate-in fade-in">
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1">{lang === 'kn' ? 'ಪೂರ್ಣ ಹೆಸರು' : 'Full Name'}</label>
                   <input type="text" value={shippingName} onChange={e => setShippingName(e.target.value)} placeholder={lang === 'kn' ? 'ನಿಮ್ಮ ಹೆಸರು' : 'Your Name'} className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:border-gray-900 transition-colors placeholder-gray-400" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1">{lang === 'kn' ? 'ವಿಳಾಸ' : 'Address'}</label>
                   <input type="text" value={shippingAddress} onChange={e => setShippingAddress(e.target.value)} placeholder={lang === 'kn' ? 'ಮನೆ ಸಂಖ್ಯೆ, ರಸ್ತೆ, ಪ್ರದೇಶ' : 'House No, Street, Area'} className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:border-gray-900 transition-colors placeholder-gray-400" />
                 </div>
                 <div className="flex gap-3">
                   <div className="flex-1">
                     <label className="block text-sm font-bold text-gray-700 mb-1">{lang === 'kn' ? 'ಪಿನ್ ಕೋಡ್' : 'Pincode'}</label>
                     <input type="text" value={shippingPincode} onChange={e => setShippingPincode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))} placeholder="560001" maxLength={6} className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:border-gray-900 transition-colors placeholder-gray-400" />
                   </div>
                   <div className="flex-1">
                     <label className="block text-sm font-bold text-gray-700 mb-1">{lang === 'kn' ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ' : 'Phone Number'}</label>
                     <input type="tel" value={shippingPhone} onChange={e => setShippingPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))} placeholder="9876543210" maxLength={10} className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:border-gray-900 transition-colors placeholder-gray-400" />
                   </div>
                 </div>
               </div>

               <h3 className="font-bold text-gray-900 mb-3">{lang === 'kn' ? 'ಪಾವತಿ ವಿಧಾನ' : 'Payment Method'}</h3>
               <div className="flex flex-col gap-3 mb-6 animate-in fade-in">
                 <div 
                   onClick={() => setPaymentMethod('upi')}
                   className={`p-3 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition-colors ${paymentMethod === 'upi' ? 'border-gray-900 bg-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(17,24,39,1)]' : 'border-gray-200 hover:border-gray-900 bg-white text-gray-700'}`}
                 >
                   <div className={`p-2 rounded-lg ${paymentMethod === 'upi' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                     <Smartphone size={20} />
                   </div>
                   <span className="font-bold">{lang === 'kn' ? 'ಯುಪಿಐ (UPI)' : 'UPI'}</span>
                 </div>
                 
                 <div 
                   onClick={() => setPaymentMethod('card')}
                   className={`p-3 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition-colors ${paymentMethod === 'card' ? 'border-gray-900 bg-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(17,24,39,1)]' : 'border-gray-200 hover:border-gray-900 bg-white text-gray-700'}`}
                 >
                   <div className={`p-2 rounded-lg ${paymentMethod === 'card' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                     <CreditCard size={20} />
                   </div>
                   <span className="font-bold">{lang === 'kn' ? 'ಕ್ರೆಡಿಟ್ / ಡೆಬಿಟ್ ಕಾರ್ಡ್' : 'Credit / Debit Card'}</span>
                 </div>

                 <div 
                   onClick={() => setPaymentMethod('cod')}
                   className={`p-3 rounded-xl border-2 cursor-pointer flex items-center gap-3 transition-colors ${paymentMethod === 'cod' ? 'border-gray-900 bg-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(17,24,39,1)]' : 'border-gray-200 hover:border-gray-900 bg-white text-gray-700'}`}
                 >
                   <div className={`p-2 rounded-lg ${paymentMethod === 'cod' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'}`}>
                     <Banknote size={20} />
                   </div>
                   <span className="font-bold">{lang === 'kn' ? 'ತಲುಪಿಸಿದಾಗ ನಗದು' : 'Cash on Delivery'}</span>
                 </div>
               </div>

               {paymentMethod === 'upi' && (
                 <div className="mb-6 animate-in slide-in-from-top-2">
                   <label className="block text-sm font-bold text-gray-700 mb-2">{lang === 'kn' ? 'ಯುಪಿಐ ಐಡಿ' : 'UPI ID'}</label>
                   <input type="text" placeholder="example@upi" className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:border-gray-900 transition-colors placeholder-gray-400" />
                 </div>
               )}

               {paymentMethod === 'card' && (
                 <div className="mb-6 animate-in slide-in-from-top-2 flex flex-col gap-3">
                   <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2">{lang === 'kn' ? 'ಕಾರ್ಡ್ ಸಂಖ್ಯೆ' : 'Card Number'}</label>
                     <input type="text" placeholder="0000 0000 0000 0000" className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:border-gray-900 transition-colors placeholder-gray-400" />
                   </div>
                   <div className="flex gap-3">
                     <div className="flex-1">
                       <label className="block text-sm font-bold text-gray-700 mb-2">{lang === 'kn' ? 'ಮುಕ್ತಾಯ ದಿನಾಂಕ' : 'Expiry Date'}</label>
                       <input type="text" placeholder="MM/YY" className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:border-gray-900 transition-colors placeholder-gray-400" />
                     </div>
                     <div className="flex-1">
                       <label className="block text-sm font-bold text-gray-700 mb-2">CVV</label>
                       <input type="password" placeholder="123" maxLength={3} className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:border-gray-900 transition-colors placeholder-gray-400" />
                     </div>
                   </div>
                 </div>
               )}

               <div className="flex gap-3 mt-4">
                 <button onClick={() => setConfirmItem(null)} className="flex-1 py-3.5 bg-gray-100 text-gray-800 font-bold rounded-xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:bg-gray-200 active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-all">
                   {lang === 'kn' ? 'ರದ್ದುಮಾಡಿ' : 'Cancel'}
                 </button>
                 <button 
                   onClick={() => { 
                     onPurchase({ 
                       ...confirmItem, 
                       paymentMethod,
                       shippingDetails: {
                         name: shippingName || 'Guest',
                         address: shippingAddress || 'Not Provided',
                         pincode: shippingPincode || '000000',
                         phone: shippingPhone || '0000000000'
                       }
                     }); 
                     setConfirmItem(null); 
                     setPurchaseSuccess(true); 
                   }} 
                   className="flex-[2] py-3.5 bg-emerald-500 text-white font-bold rounded-xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:bg-emerald-400 active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-all flex items-center justify-center gap-2"
                 >
                   {paymentMethod === 'cod' ? (lang === 'kn' ? 'ಖಚಿತಪಡಿಸಿ' : 'Confirm Order') : (lang === 'kn' ? `${confirmItem.price} ಪಾವತಿಸಿ` : `Pay ${confirmItem.price}`)}
                 </button>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {purchaseSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setPurchaseSuccess(false)}
          >
             <div className="bg-white rounded-[2rem] border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] p-6 max-w-sm w-full relative flex flex-col items-center text-center" onClick={e => e.stopPropagation()}>
               <div className="w-16 h-16 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-4 border-4 border-emerald-500 shadow-[4px_4px_0px_0px_rgba(16,185,129,0.3)]">
                 <ShieldCheck size={32} />
               </div>
               <h2 className="text-2xl font-black text-gray-900 mb-2">{lang === 'kn' ? 'ಆದೇಶ ಖಚಿತವಾಗಿದೆ!' : 'Order Confirmed!'}</h2>
               <p className="text-gray-700 font-medium mb-6 text-[15px]">
                 {lang === 'kn' ? 'ನಿಮ್ಮ ಆದೇಶವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಇರಿಸಲಾಗಿದೆ. ಕುಶಲಕರ್ಮಿ ಆಟಿಕೆಗಳನ್ನು ಬೆಂಬಲಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು!' : 'Your order has been placed successfully. Thank you for supporting artisan toys!'}
               </p>
              <div className="flex gap-3 w-full">
                <button onClick={() => setPurchaseSuccess(false)} className="flex-1 py-3 bg-gray-100 text-gray-800 font-bold rounded-xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:bg-gray-200 active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-all">
                  {lang === 'kn' ? 'ಮುಂದುವರಿಸಿ' : 'Continue'}
                </button>
                <button onClick={() => { setPurchaseSuccess(false); onNavigate('orders'); }} className="flex-1 py-3 bg-gray-900 text-white font-bold rounded-xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:bg-gray-800 active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-all">
                  {lang === 'kn' ? 'ಆದೇಶಗಳು' : 'Orders'}
                </button>
              </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLoginPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setShowLoginPrompt(false)}
          >
             <div className="bg-white rounded-[2rem] border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] p-6 max-w-sm w-full relative flex flex-col items-center text-center" onClick={e => e.stopPropagation()}>
               <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setShowLoginPrompt(false)}>
                 <X size={20} className="text-gray-900 font-black" />
               </div>
               <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4 border-4 border-red-500 shadow-[4px_4px_0px_0px_rgba(239,68,68,0.3)]">
                 <ShieldCheck size={32} />
               </div>
               <h2 className="text-2xl font-black text-gray-900 mb-2">{lang === 'kn' ? 'ಲಾಗಿನ್ ಅಗತ್ಯವಿದೆ' : 'Login Required'}</h2>
               <p className="text-gray-700 font-medium mb-6 text-[15px]">
                 {lang === 'kn' ? 'ಆದೇಶವನ್ನು ಇರಿಸಲು ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಮಾಡಿ.' : 'Please sign in to place an order.'}
               </p>
               <div className="flex gap-3 w-full">
                 <button onClick={() => setShowLoginPrompt(false)} className="flex-1 py-3 bg-gray-100 text-gray-800 font-bold rounded-xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:bg-gray-200 active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-all">
                   {lang === 'kn' ? 'ರದ್ದುಮಾಡಿ' : 'Cancel'}
                 </button>
                 <button onClick={() => onRequireLogin()} className="flex-1 py-3 bg-pink-500 text-white font-bold rounded-xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:bg-pink-400 active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-all">
                   {lang === 'kn' ? 'ಲಾಗಿನ್' : 'Sign In'}
                 </button>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notifyItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setNotifyItem(null)}
          >
             <div className="bg-white rounded-[2rem] border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] p-6 max-w-sm w-full relative flex flex-col items-center text-center" onClick={e => e.stopPropagation()}>
               <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setNotifyItem(null)}>
                 <X size={20} className="text-gray-900 font-black" />
               </div>
               <h2 className="text-2xl font-black text-gray-900 mb-2">{lang === 'kn' ? 'ನನಗೆ ತಿಳಿಸಿ' : 'Notify Me'}</h2>
               <p className="text-gray-700 font-medium mb-6 text-[15px]">
                 {lang === 'kn' ? 'ಈ ವಸ್ತುವು ಸ್ಟಾಕ್‌ಗೆ ಬಂದಾಗ ನಾವು ನಿಮಗೆ ತಿಳಿಸುತ್ತೇವೆ: ' : 'We will inform you when this item is back in stock: '}
                 <span className="font-bold text-gray-900">{lang === 'kn' ? notifyItem.kn_name : notifyItem.en_name}</span>
               </p>
               <div className="w-full text-left mb-6">
                 <label className="block text-sm font-bold text-gray-700 mb-2">{lang === 'kn' ? 'ನಿಮ್ಮ ವಿಳಾಸ (ಇಮೇಲ್/ದೂರವಾಣಿ)' : 'Your contact info (Email/Phone)'}</label>
                 <input 
                   type="text" 
                   className="w-full border-4 border-gray-900 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:border-pink-500" 
                   placeholder={lang === 'kn' ? 'ಇಮೇಲ್ ಅಥವಾ ಮೊಬೈಲ್' : 'Email or Mobile Number'}
                   defaultValue={user && user.name !== 'Guest User' ? user.phone : ''}
                 />
               </div>
               <button onClick={() => { setNotifyItem(null); setNotifySuccess(true); }} className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:bg-gray-800 active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-all">
                 {lang === 'kn' ? 'ನೆನಪಿಸಿ' : 'Set Reminder'}
               </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notifySuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setNotifySuccess(false)}
          >
             <div className="bg-white rounded-[2rem] border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] p-6 max-w-sm w-full relative flex flex-col items-center text-center" onClick={e => e.stopPropagation()}>
               <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-4 border-4 border-blue-500 shadow-[4px_4px_0px_0px_rgba(59,130,246,0.3)]">
                 <ShieldCheck size={32} />
               </div>
               <h2 className="text-2xl font-black text-gray-900 mb-2">{lang === 'kn' ? 'ಜ್ಞಾಪನೆಯನ್ನು ಹೊಂದಿಸಲಾಗಿದೆ!' : 'Reminder Set!'}</h2>
               <p className="text-gray-700 font-medium mb-6 text-[15px]">
                 {lang === 'kn' ? 'ಸ್ಟಾಕ್ ಲಭ್ಯವಾದ ತಕ್ಷಣ ನಾವು ನಿಮಗೆ ತಿಳಿಸುತ್ತೇವೆ.' : 'We will notify you as soon as the stock is available.'}
               </p>
               <button onClick={() => setNotifySuccess(false)} className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:bg-gray-800 active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-all">
                 {lang === 'kn' ? 'ಸರಿ' : 'Okay'}
               </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
