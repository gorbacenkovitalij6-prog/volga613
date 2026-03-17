import { motion } from 'framer-motion';
import Image from 'next/image';

const avatars = [
  '/avatars/1.jpg',
  '/avatars/2.jpg',
  '/avatars/3.jpg',
  '/avatars/4.jpg',
  '/avatars/5.jpg',
  '/avatars/6.jpg',
];

export default function SatisfiedClients() {
  return (
    <section className="bg-[#0f1115] py-10 md:py-16 border-y border-white/[0.05]">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          {/* Текстовая часть */}
          <div className="w-full lg:w-1/2">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-black mb-4 tracking-tight"
            >
              <span className="text-white">КЛИЕНТЫ, КОТОРЫЕ</span>
              <br />
              <span className="text-blue-500">УЖЕ ПОЛУЧИЛИ АВТО</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-zinc-400 text-sm md:text-base font-medium"
            >
              Более 1 000 человек уже доверили нам растаможку и доставку своих авто.
            </motion.p>
          </div>

          {/* Блок с аватарками */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2 flex justify-start lg:justify-end"
          >
            <div className="flex items-center">
              {avatars.map((src, index) => (
                <div 
                  key={index} 
                  className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-[#0f1115] bg-zinc-800 shrink-0 overflow-hidden transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:z-50 shadow-lg hover:shadow-xl cursor-pointer ${index !== 0 ? '-ml-5 md:-ml-6' : ''}`}
                >
                  {/* Заглушка, так как реальных фоток может не быть - fallback */}
                  <Image 
                    src={src} 
                    alt={`Клиент ${index + 1}`} 
                    fill 
                    unoptimized
                    className="object-cover"
                    onError={(e) => {
                      // Простой fallback если фото нет (серая заливка)
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  {/* Запасной вариант если картинка не загрузится */}
                  <div className="absolute inset-0 bg-zinc-700 -z-10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-zinc-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                </div>
              ))}
              
              {/* Счетчик +1000 */}
              <div 
                className="relative flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-[#0f1115] bg-blue-500 shrink-0 -ml-5 md:-ml-6 shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:z-50 hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] cursor-pointer"
              >
                <span className="text-white font-bold text-sm md:text-lg leading-none">1000+</span>
                <span className="text-white/80 text-[9px] md:text-[11px] font-medium leading-tight mt-0.5">ЧЕЛ</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
