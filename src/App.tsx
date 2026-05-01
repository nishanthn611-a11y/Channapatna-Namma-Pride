import { useState, useEffect } from 'react';
import { QrCode, BookOpen, Map, Store, Globe, Package, MessageSquare, Wallet } from 'lucide-react';
import { translations, Language } from './translations';
import VerifyView from './components/VerifyView';
import ProcessView from './components/ProcessView';
import MapView from './components/MapView';
import CatalogView from './components/CatalogView';
import StoreLocatorView from './components/StoreLocatorView';
import LoginView from './components/LoginView';
import OrderTrackingView from './components/OrderTrackingView';
import FeedbackView from './components/FeedbackView';
import TransactionView from './components/TransactionView';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'verify' | 'process' | 'map' | 'catalog' | 'store-locator' | 'orders' | 'feedback' | 'transactions'>('verify');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [favoriteArtisans, setFavoriteArtisans] = useState<string[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setOrders(prevOrders => 
        prevOrders.map(order => {
          if (order.status === 'placed') return { ...order, status: 'processing' };
          if (order.status === 'processing') return { ...order, status: 'shipped' };
          if (order.status === 'shipped') return { ...order, status: 'delivered' };
          return order;
        })
      );
    }, 10000); // Progress every 10 seconds for demo

    return () => clearInterval(timer);
  }, []);

  const handlePurchase = (item: any) => {
    const newOrder = {
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      item: item,
      status: 'placed',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      trackingNumber: 'IN8473' + Math.floor(Math.random() * 10000),
      carrier: 'India Post',
      expectedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      shippingDetails: item.shippingDetails
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const handleCancelOrder = (id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'cancelled' } : o));
  };
  
  const t = translations[lang];

  return (
    <div className="min-h-screen app-container flex items-center justify-center p-4 sm:p-8">
      {/* Mobile Device Mockup Container */}
      <div className="w-full max-w-[400px] h-[850px] max-h-[90vh] bg-white rounded-[3rem] overflow-hidden shadow-2xl relative flex flex-col border-[12px] border-gray-900">
        
        {/* Top Header / Status Bar Area */}
        <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center z-50 rounded-b-3xl absolute top-0 w-full left-0 right-0 shadow-md">
          <div className="text-sm font-bold tracking-widest uppercase">{t.appTitle}</div>
          <button 
            onClick={() => setLang(lang === 'en' ? 'kn' : 'en')}
            className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-xs font-bold hover:bg-gray-700 transition"
          >
            <Globe size={14} /> {lang === 'en' ? 'ಕನ್ನಡ' : 'EN'}
          </button>
        </div>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto mt-[60px] pb-[80px] bg-gray-50 flex flex-col">
          {!isAuthenticated ? (
            <div className="flex-1 h-full"><LoginView t={t} onLogin={handleLogin} /></div>
          ) : (
            <>
              {activeTab === 'verify' && <VerifyView t={t} lang={lang} user={currentUser} onNavigate={setActiveTab} />}
              {activeTab === 'process' && <ProcessView t={t} lang={lang} onNavigate={setActiveTab} />}
              {activeTab === 'map' && <MapView t={t} lang={lang} onNavigate={setActiveTab} favoriteArtisans={favoriteArtisans} setFavoriteArtisans={setFavoriteArtisans} />}
              {activeTab === 'catalog' && <CatalogView t={t} lang={lang} user={currentUser} onNavigate={setActiveTab} wishlist={wishlist} setWishlist={setWishlist} onPurchase={handlePurchase} onRequireLogin={() => setIsAuthenticated(false)} />}
              {activeTab === 'store-locator' && <StoreLocatorView t={t} lang={lang} onNavigate={setActiveTab} />}
              {activeTab === 'orders' && <OrderTrackingView t={t} lang={lang} orders={orders} user={currentUser} onNavigate={setActiveTab} onReturnOrder={(id) => setOrders(prev => prev.map(o => o.id === id ? {...o, status: 'returned'} : o))} onCancelOrder={handleCancelOrder} />}
              {activeTab === 'feedback' && <FeedbackView t={t} lang={lang} user={currentUser} />}
              {activeTab === 'transactions' && <TransactionView t={t} lang={lang} orders={orders} user={currentUser} />}
            </>
          )}
        </div>

        {/* Bottom Navigation */}
        {isAuthenticated && (
          <div className="absolute bottom-0 w-full bg-white border-t-4 border-gray-900 z-50 rounded-b-[2rem] overflow-hidden">
            <div className="flex items-center px-1 py-3 overflow-x-auto scrollbar-hide gap-1 snap-x">
              <div className="snap-start min-w-[60px] flex-shrink-0 flex justify-center">
                <NavItem 
                  icon={<QrCode size={22} />} 
                  label={t.verifyTab} 
                  isActive={activeTab === 'verify'} 
                  onClick={() => setActiveTab('verify')} 
                />
              </div>
              <div className="snap-start min-w-[60px] flex-shrink-0 flex justify-center">
                <NavItem 
                  icon={<BookOpen size={22} />} 
                  label={t.processTab} 
                  isActive={activeTab === 'process'} 
                  onClick={() => setActiveTab('process')} 
                />
              </div>
              <div className="snap-start min-w-[60px] flex-shrink-0 flex justify-center">
                <NavItem 
                  icon={<Map size={22} />} 
                  label={t.mapTab} 
                  isActive={activeTab === 'map'} 
                  onClick={() => setActiveTab('map')} 
                />
              </div>
              <div className="snap-start min-w-[60px] flex-shrink-0 flex justify-center">
                <NavItem 
                  icon={<Store size={22} />} 
                  label={t.catalogTab} 
                  isActive={activeTab === 'catalog'} 
                  onClick={() => setActiveTab('catalog')} 
                />
              </div>
              <div className="snap-start min-w-[60px] flex-shrink-0 flex justify-center">
                <NavItem 
                  icon={<Package size={22} />} 
                  label={t.ordersTab} 
                  isActive={activeTab === 'orders'} 
                  onClick={() => setActiveTab('orders')} 
                />
              </div>
              <div className="snap-start min-w-[60px] flex-shrink-0 flex justify-center">
                <NavItem 
                  icon={<MessageSquare size={22} />} 
                  label={t.feedbackTab} 
                  isActive={activeTab === 'feedback'} 
                  onClick={() => setActiveTab('feedback')} 
                />
              </div>
              <div className="snap-start min-w-[60px] flex-shrink-0 flex justify-center pr-2">
                <NavItem 
                  icon={<Wallet size={22} />} 
                  label={t.transactionsTab} 
                  isActive={activeTab === 'transactions'} 
                  onClick={() => setActiveTab('transactions')} 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: any, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 flex-1 transition-transform ${isActive ? 'scale-110 text-red-500' : 'text-gray-400 hover:text-gray-600'}`}
    >
      <div className={`p-1.5 rounded-2xl ${isActive ? 'bg-red-100 border-2 border-red-500' : 'bg-transparent'}`}>
        {icon}
      </div>
      <span className={`text-[9px] text-center font-bold leading-tight ${isActive ? 'text-red-600' : ''}`}>{label}</span>
    </button>
  );
}
