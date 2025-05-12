export default function LegacySection() {
  return (
    <section className="relative mt-10 mb-10 py-5 px-5 text-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/mansion.png')",
        }}
      />

      {/* Blur edges overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Top blur */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/90 to-transparent blur-md" />
        {/* Bottom blur */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/80 to-transparent blur-md" />
        {/* Left blur */}
        <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-white/100 to-transparent blur-md" />
        {/* Right blur */}
        <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-white/80 to-transparent blur-md" />
      </div>

      {/* Foreground content */}
      <div className="relative z-20 max-w-6xl mx-auto rounded-lg p-5 shadow-lg backdrop-blur-sm">
        <h2 className="text-5xl font-bold mb-6">Legacy and vision</h2>
        <p className="text-lg leading-relaxed">
        Started in 2018, Divin Winery is the culmination of years of unwavering dedication, hard work,
          and an unrelenting passion for both winemaking and Lebanon. It represents the vision of a man
          who refused to give up on his country, determined to craft another Lebanese wine success story.
          Nestled in the fertile Bekaa Valley—a region steeped in history and renowned for its viticulture—
          Divin Winery combines traditional methods with modern innovations to produce exceptional wines
          that resonate with global audiences.
          <br /><br />
          With vineyards cultivated at an altitude of 1150 meters in calcareous soil ideal for grape production,
          we focus on quality over quantity. The winery situated in the heart of Beirut boasts state-of-the-art
          machinery imported from Italy, ensuring precision and excellence in every bottle. Producing red, rosé
          and white varieties, including Merlot, Syrah, Cabernet Sauvignon, Muscat, Verdejo, and Chardonnay.
        </p>
      </div>
    </section>
  );
}
