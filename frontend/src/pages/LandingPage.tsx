import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen flex flex-col">
      
      {/* Header */}
      {/*

        <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">MealApp</h1>
          <nav className="space-x-6 text-gray-600 hidden md:flex">
            <a href="#how" className="hover:text-indigo-600 transition">Kako deluje</a>
            <a href="#feedback" className="hover:text-indigo-600 transition">Podaj mnenje</a>
          </nav>
        </div>
      </header>
      */
      }
      

      {/* Hero */}
      <section className="container mx-auto px-6 py-20 text-center flex-grow">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Najdi in oceni lokale, ki ponujajo študentske bone
        </h2>
        <p className="text-lg md:text-xl max-w-xl mx-auto mb-10 text-gray-600">
          Pomagaj sošolcem z iskrenimi mnenji in odkrij najboljše ponudbe za študentske bone v mestu Maribor.
        </p>
        <a
          href="#feedback"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Podaj mnenje zdaj
        </a>
      </section>

      {/* How it works */}
      <section
        id="how"
        className="bg-white py-16"
      >
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h3 className="text-3xl font-semibold mb-8 text-indigo-600">Kako deluje</h3>
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
        className="bg-indigo-600 py-16 text-white text-center"
      >
        <h3 className="text-3xl font-semibold mb-6">Si že obiskal kak lokal? Podaj svoje mnenje!</h3>
        <a
          href="/submit-feedback"
          className="inline-block bg-white text-indigo-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
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
