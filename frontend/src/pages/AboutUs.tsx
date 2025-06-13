const team = [
  {
    name: "David Rajlič",
    role: "Vodja projekta · Backend & Frontend razvijalec",
    description:
      "David vodi razvojno ekipo, skrbi za strukturo projekta in implementacijo funkcionalnosti tako na strežniški kot uporabniški strani.",
    gender: "male",
  },
  {
    name: "Neža Urbas",
    role: "Backend razvijalka",
    description:
      "Neža razvija API-je, modele in poskrbi, da podatki tečejo brezhibno med strežnikom in aplikacijo.",
    gender: "female",
  },
  {
    name: "Florijan Tušak",
    role: "Mobilni razvijalec",
    description:
      "Florijan se ukvarja z razvojem mobilne aplikacije, predvsem z zalednim delom ter implementacijo osnovnih uporabniških komponent.",
    gender: "male",
  },
  {
    name: "Matjaž Vaupotič",
    role: "Mobilni razvijalec",
    description:
      "Matjaž sodeluje pri razvoju mobilne aplikacije in zagotavlja dobro uporabniško izkušnjo.",
    gender: "male",
  },
  {
    name: "Tatjana Panova, Rebeka Nikolova in Ana Klincharova",
    role: "UI oblikovalke",
    description:
      "Tatjana, Rebeka in Ana so poskrbele za oblikovanje uporabniškega vmesnika, izbiro barv, estetiko ter vizualno usklajenost aplikacije.",
    gender: "female",
    customImage: "/images/youth.png",
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#fff5e1] py-10 px-4">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-[#c45a39]">O nas</h1>
        <p className="mt-2 text-[#5c3c2e]">Spoznaj našo ekipo</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {team.map((member, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition flex items-start gap-4"
          >
            <img
              src={
                member.customImage
                  ? member.customImage
                  : member.gender === "female"
                  ? "/images/customer-service.png"
                  : "/images/operator.png"
              }
              alt="Team member avatar"
              className="w-16 h-16 object-contain"
            />
            <div>
              <h2 className="text-xl font-semibold text-[#c45a39]">
                {member.name}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{member.role}</p>
              <p className="text-gray-800 text-sm">{member.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
