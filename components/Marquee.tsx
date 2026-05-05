"use client";

export default function Marquee() {
  const phrases = [
    "Una familia",
    "Muchas sedes",
    "Sin filtros",
    "Sin religión",
    "Una comunidad real",
    "Fe en movimiento",
  ];
  const repeated = [...phrases, ...phrases, ...phrases];

  return (
    <section className="relative bg-[#0d0d0d] py-10 border-y border-white/5 overflow-hidden">
      <div className="marquee">
        <div className="marquee-track">
          {repeated.map((phrase, i) => (
            <div key={i} className="flex items-center gap-16 shrink-0">
              <span className="font-display italic text-3xl md:text-5xl text-white/90 whitespace-nowrap">
                {phrase}
              </span>
              <Asterisk />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Asterisk() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      className="text-white/40 shrink-0"
      fill="currentColor"
    >
      <path d="M14 2v24M5 5l18 18M2 14h24M5 23l18-18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
