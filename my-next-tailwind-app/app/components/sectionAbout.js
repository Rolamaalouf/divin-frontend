export default function LegacySection() {
  return (
    <section className="relative mt-10 mb-10 py-20 px-5 text-center text-white overflow-hidden">
      {/* Background image with reduced opacity */}
      <div
        className="absolute inset-0 z-0 bg-contain bg-center opacity-50"
        style={{
          backgroundImage: "url('/mansion.png')",
        }}
      />

      {/* Optional subtle overlay for better contrast */}
      <div className="absolute inset-0 z-10 " />

      {/* Foreground content - clean and without a background box */}
      <div className="relative z-20 max-w-5xl mx-auto">
        <h2 className="text-5xl text-[#031B28] font-bold mb-6">Legacy and Vision</h2>
        <p className="text-lg leading-relaxed text-[#031B28]/90">
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
