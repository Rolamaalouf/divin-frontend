// components/LegacySection.js
export default function LegacySection() {
    return (
      <section
        className="mt-10 ml-10 bg-cover bg-no-repeat bg-center py-16 px-6 text-center text-slate-800"
        style={{ backgroundImage: "url('/mansion.png')" }}
      >
        <div className="max-w-7xl mx-auto  bg-opacity-80 rounded-lg p-8 shadow-lg">
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
  