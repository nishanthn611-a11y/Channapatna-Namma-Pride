import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, Scissors, Sparkles, Droplets, Palette, Package, ArrowRight, X, PlayCircle } from 'lucide-react';

export default function ProcessView({ t, lang, onNavigate }: { t: any, lang: string, onNavigate: (t: string) => void }) {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const steps = [
    {
      icon: <Leaf size={28} className="text-green-600" />,
      title: t.step1Title,
      desc: t.step1Desc,
      detail: t.step1Detail,
      bgColor: "bg-green-100",
      borderColor: "border-green-500",
      shadow: "shadow-[6px_6px_0px_0px_rgba(34,197,94,1)]",
      img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400&h=300"
    },
    {
      icon: <Scissors size={28} className="text-blue-600" />,
      title: t.step2Title,
      desc: t.step2Desc,
      detail: t.step2Detail,
      bgColor: "bg-blue-100",
      borderColor: "border-blue-500",
      shadow: "shadow-[6px_6px_0px_0px_rgba(59,130,246,1)]",
      img: "https://images.unsplash.com/photo-1517420879524-86d64ac2f339?auto=format&fit=crop&q=80&w=400&h=300"
    },
    {
      icon: <Droplets size={28} className="text-red-600" />,
      title: t.step3Title,
      desc: t.step3Desc,
      detail: t.step3Detail,
      bgColor: "bg-red-100",
      borderColor: "border-red-500",
      shadow: "shadow-[6px_6px_0px_0px_rgba(239,68,68,1)]",
      img: "https://images.unsplash.com/photo-1574515518428-1b20b29ce3ce?auto=format&fit=crop&q=80&w=400&h=300"
    },
    {
      icon: <Sparkles size={28} className="text-yellow-600" />,
      title: t.step4Title,
      desc: t.step4Desc,
      detail: t.step4Detail,
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-400",
      shadow: "shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]",
      img: "https://images.unsplash.com/photo-1533045620959-5d2ac2eb81bb?auto=format&fit=crop&q=80&w=400&h=300"
    },
    {
      icon: <Palette size={28} className="text-purple-600" />,
      title: t.step5Title,
      desc: t.step5Desc,
      detail: t.step5Detail,
      bgColor: "bg-purple-100",
      borderColor: "border-purple-500",
      shadow: "shadow-[6px_6px_0px_0px_rgba(168,85,247,1)]",
      img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400&h=300"
    },
    {
      icon: <Package size={28} className="text-pink-600" />,
      title: t.step6Title,
      desc: t.step6Desc,
      detail: t.step6Detail,
      bgColor: "bg-pink-100",
      borderColor: "border-pink-500",
      shadow: "shadow-[6px_6px_0px_0px_rgba(236,72,153,1)]",
      img: "https://images.unsplash.com/photo-1581007871115-f14bc016e0a4?auto=format&fit=crop&q=80&w=400&h=300"
    }
  ];

  return (
    <div className="flex flex-col h-full bg-orange-50 bg-[radial-gradient(#fdba74_1px,transparent_1px)] [background-size:16px_16px] p-6 overflow-x-hidden overflow-y-auto relative">
      
      <div className="mb-8 text-center mt-4">
        <h1 className="text-3xl font-black text-orange-900 border-b-4 border-orange-500 pb-2 inline-block mb-4">
          {t.processHeading}
        </h1>
        
        <div className="mt-6 mx-auto w-full max-w-2xl bg-white rounded-[2rem] border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)] overflow-hidden flex flex-col relative">
          <div className="bg-red-500 border-b-4 border-gray-900 p-3 flex items-center justify-center">
            <h3 className="font-black text-white text-lg flex items-center gap-2">
              <PlayCircle size={20} /> {t.watchProcess || "Watch Making Process"}
            </h3>
          </div>
          <div className="aspect-video w-full bg-gray-900">
            <iframe 
              className="w-full h-full" 
              src={lang === 'kn' ? "https://www.youtube.com/embed/XQ5dHQwskSw" : "https://www.youtube.com/embed/Bqkw1zfRZ_w"} 
              title="Channapatna Toys Making Process" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 pb-20">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.15 }}
            onClick={() => setSelectedStep(idx)}
            className={`flex flex-col p-5 rounded-3xl border-4 bg-white cursor-pointer hover:-translate-y-1 transition-transform ${step.borderColor} ${step.shadow}`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl border-4 shrink-0 ${step.borderColor} ${step.bgColor}`}>
                {step.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="text-gray-600 font-medium leading-tight mt-1 text-sm line-clamp-2">
                  {step.desc}
                </p>
              </div>
              <div className={`p-2 rounded-full border-2 ${step.borderColor} ${step.bgColor}`}>
                <ArrowRight size={16} className={`text-${step.borderColor.replace('border-', '')}`} />
              </div>
            </div>
          </motion.div>
        ))}
        
        <motion.button
          onClick={() => onNavigate('map')}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: steps.length * 0.15 }}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-emerald-500 text-white font-black py-4 px-6 rounded-2xl border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(17,24,39,1)] hover:bg-emerald-400 active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-all"
        >
          {t.meetArtisansBtn} <ArrowRight size={22} />
        </motion.button>
      </div>

      <AnimatePresence>
        {selectedStep !== null && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-50 bg-white"
          >
            <div className={`h-full w-full flex flex-col items-center p-6 pb-24 overflow-y-auto bg-gradient-to-br from-white to-${steps[selectedStep].borderColor.replace('border-', '100').replace('500', '100').replace('400', '100')}`}>
              <button 
                onClick={() => setSelectedStep(null)}
                className="absolute top-6 right-6 p-2 bg-white rounded-full border-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-gray-900 z-10 hover:bg-gray-100 transition-colors"
                style={{ borderColor: '#111827' }}
              >
                <X size={24} className="text-gray-900" />
              </button>

              <div className={`w-20 h-20 rounded-3xl border-4 flex items-center justify-center mb-6 mt-8 ${steps[selectedStep].borderColor} ${steps[selectedStep].bgColor} shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]`}>
                {steps[selectedStep].icon}
              </div>

              <h2 className="text-3xl font-black text-gray-900 text-center mb-6 px-4">
                {steps[selectedStep].title}
              </h2>

              {steps[selectedStep].img && (
                <div className={`w-full max-w-[320px] rounded-3xl border-4 border-gray-900 overflow-hidden mb-8 shadow-[8px_8px_0px_0px_rgba(17,24,39,1)]`}>
                  <img 
                    src={steps[selectedStep].img} 
                    alt={steps[selectedStep].title} 
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer" 
                  />
                </div>
              )}

              <div className={`bg-white rounded-3xl p-6 border-4 flex flex-col gap-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] ${steps[selectedStep].borderColor}`}>
                 <h4 className="font-bold text-gray-900 text-lg border-b-2 pb-2" style={{ borderBottomColor: "var(--tw-border-opacity)" }}>Quick Summary:</h4>
                 <p className="text-gray-700 font-medium text-lg leading-relaxed mix-blend-multiply">
                   {steps[selectedStep].desc}
                 </p>
                 
                 <h4 className="font-bold text-gray-900 text-lg border-b-2 pb-2 mt-2" style={{ borderBottomColor: "var(--tw-border-opacity)" }}>Detailed Process:</h4>
                 <p className="text-gray-700 font-medium text-lg leading-relaxed mix-blend-multiply pb-4">
                   {steps[selectedStep].detail}
                 </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
