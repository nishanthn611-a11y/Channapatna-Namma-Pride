import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, Key, User, Hash, RefreshCw, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function LoginView({ t, onLogin }: { t: any, onLogin: (user: any) => void }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [resetPasswordError, setResetPasswordError] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (/\d/.test(password)) {
      setPasswordError(t.passwordNoDigits || 'Password cannot contain digits.');
      return;
    }
    if (userId.length === 6 && password && !passwordError) {
      onLogin({
        id: userId,
        name: 'Arjun Sharma',
        phone: '+91 98765 43210',
        address: '124, Heritage Street, Bengaluru, Karnataka 560001'
      });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (/\d/.test(val)) {
      setPasswordError(t.passwordNoDigits || 'Password cannot contain digits.');
    } else {
      setPasswordError('');
    }
  };
  
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNewPassword(val);
    if (/\d/.test(val)) {
      setResetPasswordError(t.passwordNoDigits || 'Password cannot contain digits.');
    } else {
      setResetPasswordError('');
    }
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (/\d/.test(newPassword)) {
      setResetPasswordError(t.passwordNoDigits || 'Password cannot contain digits.');
      return;
    }
    if (userId.length === 6 && newPassword && !resetPasswordError) {
      setResetSuccess(true);
      setTimeout(() => {
        setIsForgotPassword(false);
        setResetSuccess(false);
        setPassword('');
        setNewPassword('');
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-purple-50 p-6 relative overflow-x-hidden overflow-y-auto justify-center pb-20">
      
      {/* Decorative blobs */}
      <div className="absolute top-10 left-[-20px] w-32 h-32 bg-yellow-400 rounded-full opacity-30 blur-2xl z-0"></div>
      <div className="absolute bottom-20 right-[-30px] w-40 h-40 bg-pink-400 rounded-full opacity-30 blur-2xl z-0"></div>
      
      <AnimatePresence mode="wait">
        {!isForgotPassword ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-3xl p-8 border-4 border-purple-900 shadow-[8px_8px_0px_0px_rgba(88,28,135,1)] relative z-10 w-full mb-8 pt-10 mt-8"
          >
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-purple-100 p-4 border-4 border-purple-900 rounded-full shadow-[4px_4px_0px_0px_rgba(88,28,135,1)] text-purple-900">
              <User size={32} />
            </div>
            
            <h2 className="text-3xl font-black text-purple-900 mb-2 mt-4 text-center">
              {t.loginTitle}
            </h2>
            <p className="text-gray-500 font-medium text-center mb-8 leading-tight">
              {t.loginSubtitle}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-purple-400">
                  <Hash size={20} />
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={userId}
                  onChange={(e) => setUserId(e.target.value.replace(/\D/g, ''))}
                  placeholder={t.idPlaceholder}
                  className="w-full bg-purple-50 border-4 border-purple-200 focus:border-purple-900 rounded-2xl pl-12 pr-4 py-3 font-bold text-purple-900 placeholder:text-purple-300 placeholder:font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(88,28,135,1)] transition-all"
                  required
                />
              </div>

              <div className="relative">
                 <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-purple-400">
                  <Key size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder={t.passwordPlaceholder}
                  className="w-full bg-purple-50 border-4 border-purple-200 focus:border-purple-900 rounded-2xl pl-12 pr-4 py-3 font-bold text-purple-900 placeholder:text-purple-300 placeholder:font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(88,28,135,1)] transition-all"
                  required
                />
              </div>
              {passwordError && (
                <p className="text-red-500 font-bold text-sm mt-[-10px] ml-2">{passwordError}</p>
              )}
              
              <div className="text-right">
                <button type="button" className="font-bold text-purple-500 hover:text-purple-700 text-sm" onClick={() => setIsForgotPassword(true)}>
                  {t.forgotPass}
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 text-purple-900 font-black text-lg py-4 rounded-2xl border-4 border-purple-900 shadow-[4px_4px_0px_0px_rgba(88,28,135,1)] hover:bg-yellow-300 active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(88,28,135,1)] transition-all flex justify-center items-center gap-2 mt-2"
              >
                <LogIn size={24} />
                {t.loginBtn}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="forgot"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white rounded-3xl p-8 border-4 border-purple-900 shadow-[8px_8px_0px_0px_rgba(88,28,135,1)] relative z-10 w-full mb-8 pt-10 mt-8"
          >
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-yellow-100 p-4 border-4 border-purple-900 rounded-full shadow-[4px_4px_0px_0px_rgba(88,28,135,1)] text-purple-900">
              <RefreshCw size={32} />
            </div>
            
            <h2 className="text-3xl font-black text-purple-900 mb-2 mt-4 text-center">
              {t.resetTitle}
            </h2>
            <p className="text-gray-500 font-medium text-center mb-8 leading-tight">
              {t.resetSubtitle}
            </p>

            {resetSuccess ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-green-100 border-2 border-green-500 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 mb-4"
              >
                <CheckCircle2 className="text-green-600" size={32} />
                <p className="text-green-800 font-bold text-center">{t.resetSuccess}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleReset} className="flex flex-col gap-5">
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-purple-400">
                    <Hash size={20} />
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    value={userId}
                    onChange={(e) => setUserId(e.target.value.replace(/\D/g, ''))}
                    placeholder={t.idPlaceholder}
                    className="w-full bg-purple-50 border-4 border-purple-200 focus:border-purple-900 rounded-2xl pl-12 pr-4 py-3 font-bold text-purple-900 placeholder:text-purple-300 placeholder:font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(88,28,135,1)] transition-all"
                    required
                  />
                </div>

                <div className="relative">
                   <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-purple-400">
                    <Key size={20} />
                  </div>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    placeholder={t.newPasswordPlaceholder}
                    className="w-full bg-purple-50 border-4 border-purple-200 focus:border-purple-900 rounded-2xl pl-12 pr-4 py-3 font-bold text-purple-900 placeholder:text-purple-300 placeholder:font-medium focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(88,28,135,1)] transition-all"
                    required
                  />
                </div>
                {resetPasswordError && (
                  <p className="text-red-500 font-bold text-sm mt-[-10px] ml-2">{resetPasswordError}</p>
                )}
                
                <button
                  type="submit"
                  className="w-full bg-purple-900 text-white font-black text-lg py-4 rounded-2xl border-4 border-purple-900 shadow-[4px_4px_0px_0px_rgba(88,28,135,1)] hover:bg-purple-800 active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(88,28,135,1)] transition-all flex justify-center items-center gap-2 mt-2"
                >
                  <RefreshCw size={24} />
                  {t.resetBtn}
                </button>
              </form>
            )}

            <div className="text-center mt-6">
              <button 
                type="button" 
                className="font-bold text-gray-500 hover:text-purple-900 text-sm flex items-center justify-center gap-1 mx-auto" 
                onClick={() => setIsForgotPassword(false)}
              >
                <ArrowLeft size={16} /> {t.backToLogin}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isForgotPassword && (
        <div className="text-center relative z-10 rounded-b-[2rem]">
          <button 
            onClick={() => onLogin({ name: 'Guest User', phone: 'N/A', address: 'N/A' })} 
            className="font-bold text-gray-500 hover:text-purple-900 transition-colors uppercase tracking-wider text-xs border-b-2 border-transparent hover:border-purple-900 mb-8"
          >
            {t.skipLogin}
          </button>
        </div>
      )}
    </div>
  );
}
