import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Star, Send, CheckCircle2 } from 'lucide-react';

export default function FeedbackView({ t, lang, user }: { t: any, lang: string, user: any }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && feedback.trim() !== '') {
      setIsSubmitted(true);
      // In a real app, send data to the server
    }
  };

  return (
    <div className="flex flex-col h-full bg-orange-50 p-6 overflow-y-auto">
      <h1 className="text-3xl font-black text-orange-900 mb-6 drop-shadow-sm flex items-center gap-2">
        <MessageSquare size={32} />
        {lang === 'kn' ? 'ಪ್ರತಿಕ್ರಿಯೆ ಮತ್ತು ಸಂಪರ್ಕ' : 'Feedback & Contact'}
      </h1>

      <div className="bg-white rounded-[2rem] p-6 border-4 border-orange-900 shadow-[8px_8px_0px_0px_rgba(124,45,18,1)] relative z-10 flex flex-col items-center">
        {!isSubmitted ? (
          <form className="w-full flex flex-col items-center" onSubmit={handleSubmit}>
            <p className="text-gray-600 font-bold mb-6 text-center">
              {lang === 'kn' ? 'ನಿಮ್ಮ ಅನುಭವವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ.' : 'We value your opinion. Share your experience with us.'}
            </p>

            {/* Rating Stars */}
            <div className="flex gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    size={40}
                    className={`${
                      (hoveredRating || rating) >= star
                        ? 'fill-yellow-400 text-yellow-500 drop-shadow-sm'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Default Name/Email if logged in */}
            <div className="w-full max-w-md space-y-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">{lang === 'kn' ? 'ಹೆಸರು' : 'Name'}</label>
                <input
                  type="text"
                  readOnly={user && user.name !== 'Guest User'}
                  defaultValue={user && user.name !== 'Guest User' ? user.name : ''}
                  placeholder={lang === 'kn' ? 'ನಿಮ್ಮ ಹೆಸರು' : 'Your Name'}
                  required
                  className="w-full p-3 rounded-xl border-4 border-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-300 bg-gray-50"
                  style={{ opacity: user && user.name !== 'Guest User' ? 0.7 : 1 }}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">{lang === 'kn' ? 'ಪ್ರತಿಕ್ರಿಯೆ' : 'Your Feedback'}</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={lang === 'kn' ? 'ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...' : 'Write your feedback here...'}
                  required
                  rows={4}
                  className="w-full p-3 rounded-xl border-4 border-gray-900 focus:outline-none focus:ring-4 focus:ring-orange-300 bg-white resize-none"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={rating === 0 || feedback.trim() === ''}
              className={`flex items-center gap-2 py-3 px-8 text-white font-black text-lg rounded-2xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(17,24,39,1)] transition-all ${
                rating === 0 || feedback.trim() === ''
                  ? 'bg-gray-400 cursor-not-allowed opacity-70'
                  : 'bg-orange-500 hover:bg-orange-400 active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)]'
              }`}
            >
              <Send size={20} />
              {lang === 'kn' ? 'ಸಲ್ಲಿಸಿ' : 'Submit Feedback'}
            </button>
          </form>
        ) : (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-10"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 border-4 border-green-500 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.3)]">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">
              {lang === 'kn' ? 'ಧನ್ಯವಾದಗಳು!' : 'Thank You!'}
            </h2>
            <p className="text-gray-600 font-medium text-center">
              {lang === 'kn' ? 'ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ.' : 'Your feedback has been submitted successfully.'}
            </p>
            <button 
              onClick={() => {
                setIsSubmitted(false);
                setRating(0);
                setFeedback('');
              }}
              className="mt-8 text-orange-600 font-bold hover:underline"
            >
              {lang === 'kn' ? 'ಮತ್ತೊಂದು ಪ್ರತಿಕ್ರಿಯೆ ಸಲ್ಲಿಸಿ' : 'Submit another response'}
            </button>
          </motion.div>
        )}
      </div>
      
      <div className="mt-8 bg-blue-50 rounded-[2rem] p-6 border-4 border-blue-900 shadow-[8px_8px_0px_0px_rgba(30,58,138,1)] relative z-10 flex flex-col items-center">
         <h2 className="text-xl font-black text-blue-900 mb-4">{lang === 'kn' ? 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ' : 'Contact Us'}</h2>
         <p className="font-bold text-gray-700 mb-2">Email: info@channapatnatoys.com</p>
         <p className="font-bold text-gray-700">Phone/WhatsApp: +91 80000 00000</p>
      </div>
      
    </div>
  );
}
