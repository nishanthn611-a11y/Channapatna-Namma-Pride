import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Info, Store, Compass, ArrowLeft, Star, Phone, X } from 'lucide-react';

const storeLocations = [
  {
    id: 1,
    name: "Channapatna Craft Park",
    kn_name: "ಚನ್ನಪಟ್ಟಣ ಕ್ರಾಫ್ಟ್ ಪಾರ್ಕ್",
    distance: "2.5 km",
    address: "Mysore Road, Channapatna, Karnataka 562160",
    phone: "+91 80 1234 5678",
    rating: 4.8,
    status: "Open Now",
    x: 40,
    y: 30
  },
  {
    id: 2,
    name: "Heritage Toys Showroom",
    kn_name: "ಹೆರಿಟೇಜ್ ಟಾಯ್ಸ್ ಶೋರೂಮ್",
    distance: "4.1 km",
    address: "BM Road, Channapatna, Karnataka 562160",
    phone: "+91 80 8765 4321",
    rating: 4.6,
    status: "Open Now",
    x: 65,
    y: 55
  },
  {
    id: 3,
    name: "Artisan Direct Center",
    kn_name: "ಕುಶಲಕರ್ಮಿಗಳ ನೇರ ಕೇಂದ್ರ",
    distance: "5.8 km",
    address: "Crafts Village, Channapatna, Karnataka 562160",
    phone: "+91 80 2468 1357",
    rating: 4.9,
    status: "Closed (Opens 10 AM)",
    x: 20,
    y: 70
  }
];

export default function StoreLocatorView({ t, lang, onNavigate }: { t: any, lang: string, onNavigate: (t: string) => void }) {
  const [selectedStore, setSelectedStore] = useState<any>(null);

  return (
    <div className="flex flex-col h-full bg-blue-50 relative">
      {/* Map Header */}
      <div className="absolute top-4 left-4 right-4 z-10 flex gap-2">
        <button 
          onClick={() => onNavigate('catalog')}
          className="bg-white p-3 rounded-2xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-all flex items-center justify-center shrink-0"
        >
          <ArrowLeft size={24} className="text-gray-900" />
        </button>
        <div className="bg-white px-4 py-3 rounded-2xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] flex-1 flex items-center gap-2">
          <Store size={20} className="text-blue-500" />
          <span className="font-black text-gray-900">Nearby Stores</span>
        </div>
      </div>

      {/* Simulated Map Area */}
      <div className="flex-1 bg-[#e0f2fe] relative overflow-hidden bg-[radial-gradient(#bae6fd_2px,transparent_2px)] [background-size:24px_24px]">
        {/* Decorative Map Elements */}
        <div className="absolute top-20 right-10 flex flex-col items-center opacity-30 text-blue-900">
          <Compass size={64} />
        </div>
        
        {/* Map Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
          <path d="M 0 100 Q 150 150 200 300 T 400 400" fill="none" stroke="#0ea5e9" strokeWidth="8" strokeDasharray="12 12" />
          <path d="M 100 0 Q 150 250 300 100" fill="none" stroke="#0ea5e9" strokeWidth="6" />
        </svg>

        {/* Store Pins */}
        {storeLocations.map((store) => (
          <motion.div
            key={store.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            style={{ left: `${store.x}%`, top: `${store.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
            onClick={() => setSelectedStore(store)}
          >
            <div className={`relative ${selectedStore?.id === store.id ? 'z-30' : 'z-20'}`}>
              <div className={`
                w-12 h-12 rounded-full border-4 border-gray-900 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] transition-transform duration-300
                ${selectedStore?.id === store.id ? 'bg-red-500 scale-125' : 'bg-white group-hover:scale-110'}
              `}>
                <Store size={24} className={selectedStore?.id === store.id ? 'text-white' : 'text-emerald-600'} />
              </div>
              
              {!selectedStore && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-2 py-1 rounded-lg border-2 border-gray-900 shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] whitespace-nowrap text-xs font-bold text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity">
                  {lang === 'kn' ? store.kn_name : store.name}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Store Details Panel */}
      <AnimatePresence>
        {selectedStore ? (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-[20px] left-4 right-4 z-40"
          >
            <div className="bg-white rounded-[2rem] p-6 border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] relative flex flex-col">
              <button 
                onClick={() => setSelectedStore(null)}
                className="absolute top-[-15px] right-[-15px] bg-red-500 text-white rounded-full p-2 border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] z-10 active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-all"
              >
                <X size={20} className="font-black" />
              </button>
              
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-black text-xl text-gray-900 leading-tight">
                  {lang === 'kn' ? selectedStore.kn_name : selectedStore.name}
                </h3>
                <span className="bg-yellow-100 text-yellow-800 font-bold px-2 py-1 rounded-lg text-sm border-2 border-yellow-300 flex items-center gap-1 shrink-0">
                  <Star size={14} className="fill-yellow-500 min-w-max" /> {selectedStore.rating}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white ${selectedStore.status.includes('Closed') ? 'bg-red-500' : 'bg-emerald-500'}`}>
                  {selectedStore.status}
                </span>
                <span className="text-sm font-black text-gray-500 flex items-center gap-1">
                  <MapPin size={14} /> {selectedStore.distance}
                </span>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-xl border-2 border-gray-200 mb-4 text-sm font-bold text-gray-600">
                <p className="mb-2">{selectedStore.address}</p>
                <p className="flex items-center gap-2 text-gray-800">
                  <Phone size={14} /> {selectedStore.phone}
                </p>
              </div>

              <button className="w-full bg-emerald-500 text-white font-black py-4 rounded-xl text-lg flex items-center justify-center gap-2 hover:bg-emerald-400 border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-all">
                <Navigation size={20} />
                Get Directions
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 bg-white px-6 py-3 border-4 border-gray-900 rounded-2xl shadow-[4px_4px_0px_0px_rgba(17,24,39,1)]"
          >
            <p className="font-black text-gray-900 text-sm">Tap a store for details</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
