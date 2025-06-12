import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-[#fff5e1] text-gray-800 font-sans min-h-screen flex flex-col">
    
      <section className="container mx-auto px-6 py-20 text-center flex-grow">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Najdi in oceni lokale, ki ponujajo študentske bone
        </h2>
        <p className="text-lg md:text-xl max-w-xl mx-auto mb-10 text-gray-600">
          Pomagaj sošolcem z iskrenimi mnenji in odkrij najboljše ponudbe za študentske bone v mestu Maribor.
        </p>
        <a
          href="#feedback"
          className="inline-block bg-[#c45a39] text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Podaj mnenje zdaj
        </a>
      </section>
      <section
        id="how"
        className="bg-white py-16"
      >
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h3 className="text-3xl font-semibold mb-8 text-[#c45a39]">Kako deluje</h3>
          <div className="grid md:grid-cols-3 gap-10 text-gray-700">
            <div>
              <div className="text-5xl mb-4">📍</div>
              <h4 className="font-bold mb-2">Poišči lokale</h4>
              <p>Preglej lokale, ki ponujajo študentske bone v tvoji bližini.</p>
            </div>
            <div>
              <div className="text-5xl mb-4">📝</div>
              <h4 className="font-bold mb-2">Podaj mnenje</h4>
              <p>Objavi svoje izkušnje in oceni kvaliteto ponudbe.</p>
            </div>
            <div>
              <div className="text-5xl mb-4">⭐</div>
              <h4 className="font-bold mb-2">Pomagaj drugim</h4>
              <p>Pomagaj sošolcem najti najboljše ponudbe z realnimi ocenami.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback call to action */}
      <section
        id="feedback"
        className="bg-[#fffaf0] py-16 text-white text-center"
      >
        <h3 className="text-3xl text-[#c45a39] font-semibold mb-6">Si že obiskal kak lokal? Podaj svoje mnenje!</h3>
        <a
          href="/login"
          className="inline-block bg-[#c45a39] text-white font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Podaj mnenje
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 py-6 text-center text-gray-600 text-sm">
        &copy; 2025 MealApp. Vse pravice pridržane.
      </footer>
    </div>
  );
};

export default LandingPage;
