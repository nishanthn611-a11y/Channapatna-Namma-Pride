import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, PlayCircle, Star, ShieldCheck } from 'lucide-react';
import { mockToys, artisanDetails } from '../data';

export default function VerifyView({ t, lang, user, onNavigate }: { t: any, lang: string, user: any, onNavigate: (t: string) => void }) {
  const [code, setCode] = useState('');
  const [result, setResult] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleVerify = () => {
    if (code.length !== 6) return;
    const toy = mockToys.find((t) => t.id === code);
    if (toy) {
      const artisan = artisanDetails.find((a) => a.id === toy.artisanId);
      setResult({ toy, artisan });
    } else {
      setResult(null);
    }
    setHasSearched(true);
  };

  return (
    <div className="flex flex-col h-full bg-blue-50">
      <div className="bg-blue-500 rounded-b-[2rem] p-6 pb-8 shadow-xl relative overflow-hidden z-10">
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-yellow-400 rounded-full opacity-20"></div>
        <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 bg-red-400 rounded-full opacity-20"></div>
        
        {user && user.name !== 'Guest User' && (
          <p className="text-yellow-300 font-bold mb-1 relative z-10 text-sm uppercase tracking-wider">{lang === 'kn' ? `ಸುಸ್ವಾಗತ, ${user.name}!` : `Welcome back, ${user.name.split(' ')[0]}!`}</p>
        )}
        <h1 className="text-3xl font-black text-white mb-2 relative z-10">{t.verifyTitle}</h1>
        <p className="text-blue-100 font-medium mb-6 relative z-10">{t.verifySubtitle}</p>
        
        <div className="flex flex-row gap-2 relative z-10">
          <input
            type="text"
            maxLength={6}
            value={code}
            onChange={(e) => {
              setCode(e.target.value.replace(/\D/g, ''));
              setHasSearched(false);
            }}
            placeholder={t.verifyPlaceholder}
            className="flex-1 w-full min-w-0 bg-white border-4 border-blue-900 rounded-2xl px-3 py-3 text-xl font-bold tracking-widest text-center shadow-[4px_4px_0px_0px_rgba(30,58,138,1)] focus:outline-none focus:shadow-[2px_2px_0px_0px_rgba(30,58,138,1)] focus:translate-y-[2px] transition-all placeholder:text-gray-300 placeholder:tracking-normal"
          />
          <button
            onClick={handleVerify}
            className="shrink-0 bg-yellow-400 text-blue-900 text-lg font-black px-4 py-3 border-4 border-blue-900 rounded-2xl shadow-[4px_4px_0px_0px_rgba(30,58,138,1)] hover:bg-yellow-300 active:shadow-[2px_2px_0px_0px_rgba(30,58,138,1)] active:translate-y-[2px] transition-all whitespace-nowrap"
          >
            {t.verifyButton}
          </button>
        </div>
        <p className="text-xs text-center text-blue-100 mt-4 opacity-80">{t.tryMock}</p>
      </div>

      <div className="flex-1 p-6 pb-24 overflow-y-auto">
        <AnimatePresence mode="wait">
          {!hasSearched ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full text-gray-400"
            >
              <ShieldCheck size={64} className="mb-4 text-gray-300" />
              <p className="text-center font-medium max-w-[200px]">Enter the unique ID to discover the story of your toy.</p>
            </motion.div>
          ) : result ? (
            <motion.div
              key="success"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex flex-col gap-6"
            >
              <div className="bg-white border-4 border-green-500 rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(34,197,94,1)]">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="text-green-500 fill-green-100" size={32} />
                  <h2 className="text-2xl font-black text-green-700">{t.authenticTitle}</h2>
                </div>
                
                <img src={result.toy.image} alt="Toy" className="w-full h-48 object-cover rounded-2xl border-4 border-gray-900 mb-4" referrerPolicy="no-referrer" />
                
                <div className="bg-yellow-100 rounded-2xl p-4 border-2 border-yellow-400 flex items-center gap-4">
                  <img src={result.artisan.photo} alt={result.artisan.name} className="w-16 h-16 rounded-full border-2 border-gray-900 object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <p className="text-sm text-yellow-800 font-bold uppercase tracking-wider">{t.madeBy}</p>
                    <p className="text-xl font-black text-gray-900">{lang === 'kn' ? result.artisan.kn_name : result.artisan.name}</p>
                    <div className="flex text-yellow-500 mt-1">
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                      <Star size={14} fill="currentColor" />
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-gray-600 font-medium leading-relaxed">
                  {result.artisan.bio}
                </p>

                <button onClick={() => onNavigate('process')} className="mt-6 w-full flex items-center justify-center gap-2 bg-red-500 text-white font-bold py-3 px-4 rounded-xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] hover:bg-red-400 active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-all">
                  <PlayCircle size={20} />
                  {t.watchProcess}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="error"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white border-4 border-red-500 rounded-3xl p-6 shadow-[8px_8px_0px_0px_rgba(239,68,68,1)] text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <XCircle className="text-red-500" size={40} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">{t.invalidTitle}</h2>
              <p className="text-gray-600 font-medium">{t.invalidDesc}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
