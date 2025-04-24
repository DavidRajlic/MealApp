import { Link } from "react-router-dom";

export function Welcome() {
  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center p-6 shadow-sm bg-white">
        <h1 className="text-3xl font-bold" style={{ color: "#B08968" }}>RatePlate</h1>
        <nav className="flex space-x-6 text-sm">
          <a href="#" className="hover:text-red-600">Landing page</a>
          <Link to="/about" className="hover:text-red-600">O nas</Link>
          <a href="#" className="hover:text-red-600">Articles</a>
        </nav>
        <button className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800">Login</button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col gap-8 p-10">
        {/* Top Row: Logo + Text */}
        <div className="flex flex-col md:flex-row items-start gap-10">
          <div className="md:w-1/3 flex justify-center md:justify-start">
            <img
              src="/images/logo.png"
              alt="RatePlate Logo"
              className="h-32 w-auto"
            />
          </div>

          <div className="md:w-2/3 space-y-4">
            <p>
              Odkrij lokale s študentskimi boni v svoji bližini – z ocenami, slikami,
              pregledno mapo in priporočili resničnih drugih študentov.
            </p>
            <button className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition text-sm">
              IŠČI
            </button>
          </div>
        </div>

        {/* Underneath: Plates Image */}
        <div>
          <img
            src="/images/slika_pod_logo.png"
            alt="Plates Image"
            className="w-full rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Most Visited */}
      <section className="p-10 bg-white">
        <h3 className="text-xl font-semibold text-red-600 mb-6">Najbolj obiskani</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <img src="/images/cantante.png" alt="Cantante" className="mx-auto h-16" />
            <p className="font-bold mt-2">CANTANTE CAFE</p>
            <p className="text-sm">
              Prva kubanska restavracija v Mariboru, z dolgoletno tradicijo.
            </p>
          </div>
          <div>
            <img src="/images/bigpanda.png" alt="Big Panda" className="mx-auto h-16" />
            <p className="font-bold mt-2">BIG PANDA</p>
            <p className="text-sm">
              Big Panda – kjer se tradicija kitajskih okusov sreča z željami naših gostov.
            </p>
          </div>
          <div>
            <img src="/images/ancora.png" alt="Ancora" className="mx-auto h-16" />
            <p className="font-bold mt-2">ANCORA</p>
            <p className="text-sm">
              Pripravljamo več kot 50 vrst različnih pizz iz krušne peči.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-gray-100 p-10">
        <h3 className="text-xl font-semibold text-red-600 mb-6">Kaj ponujamo?</h3>
        <ul className="space-y-4 list-disc pl-6">
          <li>
            <strong>Top ocenjeni lokali:</strong> Poglej, kateri lokali imajo najboljše ocene
            drugih študentov.
          </li>
          <li>
            <strong>V bližini:</strong> Prikaži samo tiste, ki so ti res blizu.
          </li>
          <li>
            <strong>Zaupaj vrednotenju uporabnikov:</strong> Tvoja mnenja štejejo!
          </li>
        </ul>
        <div className="mt-6">
          <img
            src="/images/slika_so_jadenje.png"
            alt="Food Information"
            className="rounded shadow-md"
          />
        </div>
      </section>
    </div>
  );
}
