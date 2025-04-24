export default function About() {
    return (
      <div className="bg-white text-gray-800 font-sans px-6 md:px-24 py-16 space-y-20">
        
        {/* Intro Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Text */}
          <div className="space-y-6">
          <img
            src="/images/logo.png"
            className="h-10 w-auto max-w-[120px] object-contain"
        />
            <h1 className="text-5xl font-bold text-[#B08968]">O nas</h1>
            <p className="text-lg leading-relaxed">
              RatePlate je spletna stran, ki smo jo kot študenti ustvarili, da bi si med seboj delili
              iskrene ocene in izkušnje o študentskih restavracijah. Tukaj lahko najdeš mnenja
              sošolcev, ki so že preizkusili različne kraje, in tako lažje izbereš, kam boš prišel na
              ugoden in okusen obrok.
            </p>
            <p className="text-lg leading-relaxed">
              Naš cilj je preprosto pomagati vsakomur, ki išče cenovno dostopne možnosti prehrane, saj
              vemo, kako pomembno je pri študentskem življenju pametno trošiti denar.
            </p>
          </div>
  
          {/* Image */}
          <div className="flex justify-center">
            <img
              src="/images/family_eating.png"
              className="w-[280px] md:w-[320px] rounded-xl shadow-md"
            />
          </div>
        </section>
  
        {/* Form Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-[#B08968]">Dodaj svoje mnenje</h2>
            <img src="/images/star_icon.png" className="h-6" />
          </div>
  
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">First name</label>
              <input
                type="text"
                placeholder="Jane"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B08968]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last name</label>
              <input
                type="text"
                placeholder="Smitherton"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B08968]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Email address</label>
              <input
                type="email"
                placeholder="email@domain.com"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B08968]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Deli svoje izkušnje z nami</label>
              <textarea
                rows={4}
                placeholder="Enter your experience"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B08968]"
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-[#B08968] text-white px-6 py-2 rounded hover:bg-[#9c7456] transition"
              >
                Submit
              </button>
            </div>
          </form>
        </section>
  
        {/* Decorative Image at Bottom */}
        <section className="flex justify-center pt-10">
          <img
            src="/images/eating-group.png"
            className="w-[200px] md:w-[240px] rounded-lg shadow"
          />
        </section>
      </div>
    );
  }
  