"use client";

import Image from "next/image";

export default function ChinaContrast() {
  return (
    <section className="relative h-[80vh] w-full flex items-center justify-start overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 ">
        <Image
          src="/contrast-bg.png"
          alt="China Contrast: Old vs New"
          fill
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent z-10" />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2">
        <div className="max-w-2xl text-white">
          <span className="text-primary-scarlet-400 font-bold tracking-widest uppercase mb-4 block">
            Страна контрастов
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Где древние храмы отражаются в небоскребах
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed font-light">
            Китай — это путешествие во времени. Утром вы можете медитировать в
            тумане на вершине священной горы, а вечером — пить коктейль в баре
            на 100-м этаже с видом на неоновый мегаполис. Это симфония тишины и
            скорости, традиций и технологий.
          </p>
          <div className="flex gap-12 border-t border-gray-800 pt-8">
            <div>
              <p className="text-3xl font-bold text-white mb-1">5000+</p>
              <p className="text-gray-400 text-sm">лет истории</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white mb-1">2050</p>
              <p className="text-gray-400 text-sm">год уже наступил там</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
