export default function About() {
    return (
      <div className="bg-white text-gray-800 font-sans px-6 md:px-20 py-10 space-y-20">
        {/* Section: Intro */}
        <section className="flex flex-col md:flex-row items-center gap-10">
          {/* Text */}
          <div className="md:w-1/2 space-y-4">
            <img src="/images/logo.png" alt="RatePlate Logo" className="h-12" />
            <h1 className="text-4xl font-bold text-[#B08968]">O nas</h1>
            <p>
              RatePlate je spletna stran, ki smo jo kot študenti ustvarili, da bi si med seboj delili
              iskrene ocene in izkušnje o študentskih restavracijah. Tukaj lahko najdeš mnenja
              sošolcev, ki so že preizkusili različne kraje, in tako lažje izbereš, kam boš prišel
              na ugoden in okusen obrok.
            </p>
            <p>
              Naš cilj je preprosto pomagati vsakomur, ki išče cenovno dostopne možnosti prehrane,
              saj vemo, kako pomembno je pri študentskem življenju pametno trošiti denar.
            </p>
          </div>
  
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src="/images/family_eating.png" // Adjust to your actual image path
              alt="Skupina ljudi pri obroku"
              className="w-full rounded-xl shadow-md"
            />
          </div>
        </section>
  
        {/* Section: Form */}
        <section>
          <h2 className="text-2xl font-bold mb-2 text-[#B08968] flex items-center gap-2">
            <span>Dodaj svoje mnenje</span>
            <img src="/images/star_icon.png" alt="Star Icon" className="h-6" />
          </h2>
  
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm mb-1">First name</label>
              <input
                type="text"
                placeholder="Jane"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Last name</label>
              <input
                type="text"
                placeholder="Smitherton"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Email address</label>
              <input
                type="email"
                placeholder="email@yourdomain.com"
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Deli svoje izkušnje z nami</label>
              <textarea
                placeholder="Enter your experience"
                rows={4}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-[#B08968] text-white px-6 py-2 rounded hover:bg-[#936f4e] transition"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
  
       {/* Section: Icons */}
       <section className="flex justify-center mt-10">
          <img
             src="/images/eating-group.png"
             className="max-w-xs md:max-w-md w-full rounded-lg shadow"
            />
        </section>
      </div>
    );
  }
  