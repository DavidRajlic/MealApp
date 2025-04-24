export function Welcome() {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-10 py-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-[#B08968]">RatePlate</h1>
        <nav className="flex gap-4 text-sm">
          <a
            href="#"
            className="bg-[#f5ebe0] text-gray-800 px-4 py-2 rounded border border-[#d6ccc2] hover:bg-[#e3d5ca] transition mx-1"
          >
            Landing page
          </a>
          <a
            href="#"
            className="bg-[#f5ebe0] text-gray-800 px-4 py-2 rounded border border-[#d6ccc2] hover:bg-[#e3d5ca] transition mx-1"
          >
            About
          </a>
          <a
            href="#"
            className="bg-[#f5ebe0] text-gray-800 px-4 py-2 rounded border border-[#d6ccc2] hover:bg-[#e3d5ca] transition mx-1"
          >
            Article
          </a>
        </nav>

        <button className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800">Button</button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center gap-10 p-10 bg-white">
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src="/images/logo.png"
            alt="RatePlate Logo"
            className="scale-65"
          />
        </div>
        <div className="w-full md:w-2/3 space-y-6 text-center md:text-left">
          <p className="text-gray-800">
            Odkrij lokale s študentskimi boni v svoji bližini – z ocenami, slikami,
            pregledno mapo in preverjenimi mnenji drugih študentov.
          </p>
          <button className="bg-[#B08968] hover:bg-[#a0785e] text-white px-6 py-2 rounded text-sm">
            IŠČI
          </button>
        </div>
      </section>

      {/* Image */}
      <section className="p-10">
        <img
          src="/images/slika_pod_logo.png"
          alt="Plates Image"
          className="w-full rounded-lg shadow"
        />
      </section>

      {/* Najbolj obiskani */}
      <section className="p-10 bg-white">
        <h3 className="text-xl font-semibold text-[#B08968] mb-10">Najbolj obiskani</h3>
        <div className="flex justify-between items-start gap-10 max-w-5xl mx-auto">
          {/* Cantante */}
          <div className="flex flex-col items-center w-1/3 text-center">
            <div className="h-36 flex items-center justify-center">
              <img src="/images/cantante.png" alt="Cantante" className="max-h-24 object-contain scale-35" />
            </div>
            <p className="font-bold mb-1 mt-4">CANTANTE CAFÉ</p>
            <p className="text-sm text-gray-600">
              Prva kubanska restavracija v Mariboru, z dolgoletno tradicijo.
            </p>
          </div>

          {/* Big Panda */}
          <div className="flex flex-col items-center w-1/3 text-center">
            <div className="h-36 flex items-center justify-center">
              <img src="/images/bigpanda.png" alt="Big Panda" className="max-h-24 object-contain" />
            </div>
            <p className="font-bold mb-1 mt-4">BIG PANDA</p>
            <p className="text-sm text-gray-600">
              Big Panda – kjer se tradicija kitajskih okusov sreča z željami naših gostov.
            </p>
          </div>

          {/* Ancora */}
          <div className="flex flex-col items-center w-1/3 text-center">
            <div className="h-36 flex items-center justify-center">
              <img src="/images/ancora.png" alt="Ancora" className="max-h-24 object-contain scale-35" />
            </div>
            <p className="font-bold mb-1 mt-4">ANCORA</p>
            <p className="text-sm text-gray-600">
              Pripravljamo več kot 50 vrst različnih pizz iz krušne peči.
            </p>
          </div>
        </div>
      </section>


      {/* Kaj ponujamo */}
      <section className="bg-gray-100 py-16 px-10">
        <div className="max-w-6xl mx-auto flex flex-row items-start justify-between gap-12">

          {/* LEFT SIDE: TEXT ONLY */}
          <div className="w-1/2 space-y-6">
            <h3 className="text-2xl font-bold text-[#B08968]">Kaj ponujamo?</h3>

            <div className="space-y-6 text-gray-700 text-base">
              <div>
                <p className="font-semibold">🥇 <strong>Top ocenjeni lokali</strong></p>
                <p>Poglej, kateri lokali imajo najboljše ocene glede hrane, ambienta in hitrosti postrežbe.</p>
              </div>
              <div>
                <p className="font-semibold">📍 <strong>V bližini</strong></p>
                <p>Razišči lokale, ki so trenutno najbližje tvoji lokaciji – hitro in enostavno.</p>
              </div>
              <div>
                <p className="font-semibold">🥰 <strong>Zaupanja vredni uporabniki</strong></p>
                <p>Top mnenja ljudi, ki so z boni že doktorirali.</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: IMAGE ONLY */}
          <div className="w-1/2">
            <img
              src="/images/slika_so_jadenje.png"
              alt="Food Info"
              className="w-full rounded shadow-md scale-65"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
