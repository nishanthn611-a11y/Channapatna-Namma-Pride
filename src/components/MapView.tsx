import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Navigation, Info, Clock, Wrench, Users, Map as MapIcon, ChevronRight, ShoppingBag, Heart, Star, ArrowDownWideNarrow } from 'lucide-react';
import { artisanDetails } from '../data';

interface MapViewProps {
  t: any;
  lang: string;
  onNavigate: (t: string) => void;
  favoriteArtisans: string[];
  setFavoriteArtisans: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function MapView({ t, lang, onNavigate, favoriteArtisans, setFavoriteArtisans }: MapViewProps) {
  const [selectedArtisan, setSelectedArtisan] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filterTab, setFilterTab] = useState<'all' | 'favorites'>('all');
  const [sortOrder, setSortOrder] = useState<'default' | 'ratingDesc'>('default');
  const [userRatings, setUserRatings] = useState<Record<string, number>>({});
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  let filteredArtisans = filterTab === 'favorites' 
    ? artisanDetails.filter(a => favoriteArtisans.includes(a.id)) 
    : artisanDetails;

  if (sortOrder === 'ratingDesc') {
    filteredArtisans = [...filteredArtisans].sort((a, b) => b.rating - a.rating);
  }

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavoriteArtisans(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full bg-emerald-50 overflow-hidden relative">
      
      <div className="bg-emerald-500 p-6 pb-8 shadow-md z-10 rounded-b-[2rem] border-b-4 border-gray-900 relative shrink-0">
        <h1 className="text-3xl font-black text-white leading-tight">{t.mapHeading}</h1>
        <p className="text-emerald-100 font-medium mt-1">{t.mapSubtitle}</p>
        
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex gap-2 bg-emerald-600/50 p-1 rounded-2xl border-2 border-emerald-400">
            <button 
              onClick={() => setViewMode('list')}
              className={`flex-1 py-1.5 px-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all ${viewMode === 'list' ? 'bg-white text-emerald-900 shadow-[2px_2px_0px_0px_rgba(6,78,59,1)] border-2 border-emerald-900' : 'text-emerald-100 hover:text-white'}`}
            >
              <Users size={18} /> Artisans
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`flex-1 py-1.5 px-3 rounded-xl font-bold flex justify-center items-center gap-2 transition-all ${viewMode === 'map' ? 'bg-white text-emerald-900 shadow-[2px_2px_0px_0px_rgba(6,78,59,1)] border-2 border-emerald-900' : 'text-emerald-100 hover:text-white'}`}
            >
              <MapIcon size={18} /> Map
            </button>
          </div>
          
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2 bg-emerald-600/50 p-1 rounded-2xl border-2 border-emerald-400">
              <button 
                onClick={() => setFilterTab('all')}
                className={`px-3 py-1 rounded-xl font-bold flex items-center gap-1.5 transition-all text-xs ${filterTab === 'all' ? 'bg-white text-emerald-900 shadow-[2px_2px_0px_0px_rgba(6,78,59,1)] border-2 border-emerald-900' : 'text-emerald-100 hover:text-white'}`}
              >
                {lang === 'kn' ? 'ಎಲ್ಲಾ' : 'All'}
              </button>
              <button 
                onClick={() => setFilterTab('favorites')}
                className={`px-3 py-1 rounded-xl font-bold flex items-center gap-1.5 transition-all text-xs ${filterTab === 'favorites' ? 'bg-white text-emerald-900 shadow-[2px_2px_0px_0px_rgba(6,78,59,1)] border-2 border-emerald-900' : 'text-emerald-100 hover:text-white'}`}
              >
                <Heart size={14} className={filterTab === 'favorites' ? "fill-emerald-900" : ""} />
                {lang === 'kn' ? 'ಮೆಚ್ಚಿನವುಗಳು' : 'Favorites'}
                {favoriteArtisans.length > 0 && <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">{favoriteArtisans.length}</span>}
              </button>
            </div>

            <button
              onClick={() => setSortOrder(prev => prev === 'default' ? 'ratingDesc' : 'default')}
              className={`p-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all text-xs border-2 ${sortOrder === 'ratingDesc' ? 'bg-yellow-400 text-gray-900 border-gray-900 shadow-[2px_2px_0px_0px_rgba(17,24,39,1)]' : 'bg-emerald-600/50 text-emerald-100 border-emerald-400 hover:text-white'}`}
              title={lang === 'kn' ? 'ರೇಟಿಂಗ್ ಪ್ರಕಾರ ವಿಂಗಡಿಸಿ' : 'Sort by Rating'}
            >
              <Star size={16} className={sortOrder === 'ratingDesc' ? "fill-gray-900" : ""} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 relative overflow-y-auto overflow-x-hidden bg-[#f8fafc] z-0">
        <AnimatePresence mode="wait">
          {viewMode === 'list' && (
            <motion.div 
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-4 pb-24 grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {filteredArtisans.length === 0 ? (
                <div className="col-span-full text-center py-10 bg-white border-4 border-gray-900 rounded-2xl shadow-[6px_6px_0px_0px_rgba(17,24,39,1)]">
                  <p className="font-black text-gray-500 text-lg">
                    {lang === 'kn' ? 'ಯಾವುದೇ ಕುಶಲಕರ್ಮಿಗಳು ಕಂಡುಬಂದಿಲ್ಲ' : 'No artisans found'}
                  </p>
                </div>
              ) : (
                filteredArtisans.map((artisan, idx) => (
                <motion.div
                  key={artisan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelectedArtisan(artisan)}
                  className={`relative flex flex-col bg-white rounded-[2rem] border-4 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] cursor-pointer hover:-translate-y-1 transition-transform overflow-hidden ${artisan.theme.border}`}
                >
                  <button
                    onClick={(e) => toggleFavorite(e, artisan.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full border-2 border-gray-900 shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] hover:scale-110 transition-transform z-10"
                  >
                    <Heart size={18} className={favoriteArtisans.includes(artisan.id) ? "fill-red-500 text-red-500" : "text-gray-400"} />
                  </button>
                  <div className={`w-full h-48 border-b-4 border-gray-900 ${artisan.theme.bg}`}>
                    <img src={artisan.photo} alt={artisan.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-3 gap-2">
                      <h3 className={`text-2xl font-black ${artisan.theme.text} leading-tight line-clamp-1`}>
                        {lang === 'kn' ? artisan.kn_name : artisan.name}
                      </h3>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <div className={`px-2 py-0.5 rounded-full border-2 ${artisan.theme.border} bg-white flex items-center gap-1 text-xs font-black tracking-wider ${artisan.theme.text}`}>
                          <Star size={12} className={artisan.theme.text.replace('text-', 'fill-')} /> {artisan.rating}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div className="w-6 h-6 rounded-md bg-gray-900 flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
                          <Wrench size={12} className="text-white" />
                        </div>
                        <span className="text-gray-900 font-black text-xs uppercase tracking-wide truncate">{artisan.specialization}</span>
                      </div>
                      <div className={`px-2 py-0.5 rounded-full border-2 border-gray-200 bg-gray-50 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-gray-700 shrink-0`}>
                          <Clock size={12} /> {artisan.experience}
                        </div>
                    </div>
                    
                    <div className={`bg-gray-50 flex-1 p-3 rounded-xl border-2 border-gray-200 mb-4`}>
                      <p className="text-gray-600 font-bold text-sm line-clamp-3 italic leading-relaxed">
                        "{artisan.bio}"
                      </p>
                    </div>
                    
                    <div className="mt-auto w-full flex items-center justify-center">
                       <div className={`w-full py-2.5 rounded-xl border-2 border-gray-900 flex items-center justify-center gap-2 cursor-pointer font-bold text-sm ${artisan.theme.bg} ${artisan.theme.text} shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] hover:brightness-95 transition-all`}>
                         {lang === 'kn' ? 'ಪ್ರೊಫೈಲ್ ವೀಕ್ಷಿಸಿ' : 'View Profile'} <ChevronRight size={16} />
                       </div>
                    </div>
                  </div>
                </motion.div>
                ))
              )}
            </motion.div>
          )}

          {viewMode === 'map' && (
            <motion.div 
              key="map"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 bg-[#e0f2fe]"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
              {/* Mock Map Roads SVG */}
              <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
                 <path d="M0,100 C150,150 200,50 400,200 C450,250 300,400 400,500" stroke="#000" strokeWidth="8" fill="none" strokeDasharray="10,10" />
                 <path d="M100,0 C150,200 50,300 200,400 C250,500 200,600 300,800" stroke="#000" strokeWidth="8" fill="none" />
              </svg>

              {artisanDetails.map((artisan, idx) => (
                <motion.div
                  key={idx}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                  style={{ top: artisan.coordinates.top, left: artisan.coordinates.left }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.1, type: "spring" }}
                  onClick={() => setSelectedArtisan(artisan)}
                >
                  <div className="relative group">
                    <div className={`w-12 h-12 ${artisan.theme.bg} rounded-full border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] flex items-center justify-center transform transition-transform group-hover:scale-110 ${selectedArtisan?.id === artisan.id ? 'scale-125 bg-yellow-400' : ''}`}>
                      <MapPin className={selectedArtisan?.id === artisan.id ? 'text-gray-900' : artisan.theme.text} size={24} />
                    </div>
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      {lang === 'kn' ? artisan.kn_name : artisan.name}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedArtisan && (
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-0 z-50 bg-white"
            >
               <div className={`h-full w-full flex flex-col pt-12 p-6 pb-24 overflow-y-auto bg-gradient-to-br from-white to-${selectedArtisan.theme.bg.replace('bg-', '')}`}>
                 <button 
                   onClick={() => setSelectedArtisan(null)}
                   className="absolute top-4 right-4 p-2 bg-white rounded-full border-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-gray-900 z-30 hover:bg-gray-100 transition-colors"
                 >
                   <MapPin size={24} className="text-gray-900" style={{ transform: "rotate(45deg)" }} />
                 </button>
                 <button
                   onClick={(e) => toggleFavorite(e, selectedArtisan.id)}
                   className="absolute top-4 right-20 p-2.5 bg-white rounded-full border-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-gray-900 z-30 hover:scale-105 transition-transform"
                 >
                   <Heart size={20} className={favoriteArtisans.includes(selectedArtisan.id) ? "fill-red-500 text-red-500" : "text-gray-400"} />
                 </button>
                 
                 <div className="flex flex-col items-center mb-6">
                   <div className={`w-32 h-32 rounded-[2rem] border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] overflow-hidden mb-4 ${selectedArtisan.theme.bg}`}>
                     <img src={selectedArtisan.photo} alt={selectedArtisan.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                   </div>
                   
                   <div className="text-[12px] uppercase font-black text-red-500 tracking-widest mb-2 flex items-center gap-1 bg-red-100 px-3 py-1 rounded-full border-2 border-red-200">
                     <Info size={14} className="shrink-0"/> {t.mapPinLabel}
                   </div>
                   
                   <h3 className={`text-4xl font-black text-gray-900 leading-none mb-2 text-center`}>
                     {lang === 'kn' ? selectedArtisan.kn_name : selectedArtisan.name}
                   </h3>
                   <div className="flex items-center gap-2 mb-4 justify-center">
                     <span className="text-lg font-bold text-gray-600 text-center">
                       {selectedArtisan.workshop}
                     </span>
                     <span className={`px-2 py-0.5 rounded-full border-2 ${selectedArtisan.theme.border} bg-white/80 flex items-center gap-1 text-xs font-black tracking-wider ${selectedArtisan.theme.text}`}>
                       <Star size={14} className={selectedArtisan.theme.text.replace('text-', 'fill-')} /> {selectedArtisan.rating}
                     </span>
                   </div>
                   
                   <div className="flex flex-wrap justify-center gap-3">
                     <div className={`flex items-center gap-2 ${selectedArtisan.theme.bg} ${selectedArtisan.theme.text} px-4 py-2 rounded-2xl border-2 ${selectedArtisan.theme.border} font-bold text-sm`}>
                       <Wrench size={16} />
                       {selectedArtisan.specialization}
                     </div>
                     <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-2xl border-2 border-emerald-300 font-bold text-sm">
                       <Clock size={16} />
                       {selectedArtisan.experience}
                     </div>
                   </div>
                 </div>
                 
                 <div className="bg-white rounded-3xl p-6 border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(17,24,39,1)] flex flex-col gap-4 mb-6">
                   <h4 className="font-bold text-gray-900 text-xl border-b-2 border-gray-100 pb-2">The Artisan's Story</h4>
                   <p className="text-gray-700 font-medium text-lg leading-relaxed">
                     {selectedArtisan.bio}
                   </p>
                 </div>

                 <div className="bg-white rounded-3xl p-6 border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(17,24,39,1)] flex flex-col items-center mb-6">
                   <h4 className="text-xl font-black text-gray-900 mb-3">{lang === 'kn' ? 'ಕುಶಲಕರ್ಮಿಯನ್ನು ರೇಟ್ ಮಾಡಿ' : 'Rate this Artisan'}</h4>
                   <div 
                     className="flex items-center gap-2 mb-2"
                     onMouseLeave={() => setHoveredRating(0)}
                   >
                     {[1, 2, 3, 4, 5].map(star => (
                       <button
                         key={star}
                         onMouseEnter={() => setHoveredRating(star)}
                         onClick={() => setUserRatings(prev => ({ ...prev, [selectedArtisan.id]: star }))}
                         className="p-1 transition-transform hover:scale-110 active:scale-95"
                       >
                         <Star 
                           size={32} 
                           className={`${(hoveredRating || userRatings[selectedArtisan.id] || 0) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                         />
                       </button>
                     ))}
                   </div>
                   {userRatings[selectedArtisan.id] ? (
                     <p className="text-sm font-bold text-emerald-600">
                       {lang === 'kn' ? 'ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಗೆ ಧನ್ಯವಾದಗಳು!' : 'Thank you for your rating!'}
                     </p>
                   ) : (
                     <p className="text-sm font-medium text-gray-500">
                       {lang === 'kn' ? 'ನಿಮ್ಮ ಅನುಭವವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ' : 'Share your experience'}
                     </p>
                   )}
                 </div>
                 
                 <div className="mt-auto flex flex-col gap-3">
                   <button className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 font-black px-6 py-4 rounded-2xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] text-sm active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-all">
                     <Navigation size={20} /> Get Directions to Workshop
                   </button>
                   <button 
                     onClick={() => onNavigate('catalog')}
                     className="w-full flex items-center justify-center gap-2 bg-pink-500 text-white font-black px-6 py-4 rounded-2xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] text-sm active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-all hover:bg-pink-400"
                   >
                     <ShoppingBag size={20} /> {t.browseCatalogBtn}
                   </button>
                 </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
