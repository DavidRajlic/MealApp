import React from 'react';
import { FaMapMarkerAlt, FaPen, FaStar, FaFacebookF, FaInstagram } from 'react-icons/fa';

// Cast react-icons so className works correctly with Tailwind
const MapIcon = FaMapMarkerAlt as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const PenIcon = FaPen as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const StarIcon = FaStar as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const FacebookIcon = FaFacebookF as unknown as React.FC<React.SVGProps<SVGSVGElement>>;
const InstagramIcon = FaInstagram as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

const LandingPage: React.FC = () => {
  return (
    <div className="bg-[#FFF8F2] text-gray-800 font-sans min-h-screen flex flex-col">

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#FFF1E6] to-[#FFF8F2] px-6 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#B14F00]">
          Najdi in oceni lokale, ki ponujajo študentske bone
        </h2>
        <p className="text-lg md:text-xl max-w-xl mx-auto mb-10 text-gray-700">
          Pomagaj sošolcem z iskrenimi mnenji in odkrij najboljše ponudbe za študentske bone v mestu Maribor.
        </p>
        <a
          href="#feedback"
          className="inline-block bg-[#B14F00] text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 hover:bg-[#8d3d00] transition duration-300"
        >
          Podaj mnenje zdaj
        </a>
      </section>

      {/* How it works */}
      <section id="how" className="bg-white py-16">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h3 className="text-3xl font-semibold mb-8 text-[#B14F00]">Kako deluje</h3>
          <div className="grid md:grid-cols-3 gap-10 text-gray-700">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <MapIcon className="text-pink-500 text-4xl mb-4 mx-auto" />
              <h4 className="font-bold mb-2">Poišči lokale</h4>
              <p>Preglej lokale, ki ponujajo študentske bone v tvoji bližini.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <PenIcon className="text-orange-500 text-4xl mb-4 mx-auto" />
              <h4 className="font-bold mb-2">Podaj mnenje</h4>
              <p>Objavi svoje izkušnje in oceni kvaliteto ponudbe.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <StarIcon className="text-yellow-400 text-4xl mb-4 mx-auto" />
              <h4 className="font-bold mb-2">Pomagaj drugim</h4>
              <p>Pomagaj sošolcem najti najboljše ponudbe z realnimi ocenami.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#FFF8F2] py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-center text-[#B14F00] mb-12">
            Pohvale in mnenja
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Luka', role: 'Študent', image: '/images/luka.png', message: 'Zelo sem zadovoljen, vse je bilo super' },
              { name: 'Marija', role: 'Študentka', image: '/images/marija.png', message: 'Odlična izkušnja, priporočam!' },
              { name: 'Alena', role: 'Študentka', image: '/images/alena.png', message: 'Profesionalni in prijazni' },
              { name: 'Miha', role: 'Študent', image: '/images/miha.png', message: 'Porcija je bila ful majhna, pa še mrzla' },
              { name: 'Ana', role: 'Študentka', image: '/images/ana.png', message: 'Preliv je bil čuden, kot da je pokvarjen.' },
              { name: 'Rebeka', role: 'Študentka', image: '/images/rebeka.png', message: 'Enostavno… nikoli več.' },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white border border-[#D5C3B0] rounded-xl shadow-sm p-6 transition hover:shadow-lg"
              >
                <p className="italic text-gray-700 mb-6 text-lg">“{t.message}”</p>
                <div className="flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full border-2 border-[#B14F00]"
                  />
                  <div>
                    <p className="font-semibold text-[#B14F00]">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback call to action */}
      <section id="feedback" className="bg-[#B14F00] py-16 text-white text-center">
        <h3 className="text-3xl font-semibold mb-6">Si že obiskal kak lokal? Podaj svoje mnenje!</h3>
        <a
          href="/submit-feedback"
          className="inline-block bg-white text-[#B14F00] font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Podaj mnenje
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-[#E9DED3] py-6 text-center text-gray-700 text-sm flex flex-col items-center gap-2">
        <p>&copy; 2025 MealApp. Vse pravice pridržane.</p>
        <div className="flex gap-4 text-lg">
          <a href="#"><FacebookIcon /></a>
          <a href="#"><InstagramIcon /></a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
