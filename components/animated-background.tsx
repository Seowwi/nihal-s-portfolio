const KumoCloud1 = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 500 200" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    {/* Cloud Puff */}
    <path d="M 160 100 C 130 100, 120 70, 140 50 C 150 20, 200 10, 220 30 C 240 10, 290 20, 280 60 C 310 60, 310 100, 280 100" />
    {/* Inner Swirl */}
    <path d="M 170 70 C 170 45, 250 45, 250 70 C 250 95, 200 95, 200 80 C 200 65, 230 65, 225 60" />

    {/* Left trailing lines */}
    <path d="M 150 100 L 60 100 A 20 20 0 0 0 40 120 A 20 20 0 0 0 60 140 L 420 140" />
    <path d="M 160 115 L 60 115 A 5 5 0 0 0 55 120 A 5 5 0 0 0 60 125 L 400 125" />

    {/* Right trailing lines */}
    <path d="M 280 60 L 440 60 A 20 20 0 0 1 460 80 A 20 20 0 0 1 440 100 L 280 100" />
    <path d="M 280 75 L 440 75 A 5 5 0 0 1 445 80 A 5 5 0 0 1 440 85 L 280 85" />
  </svg>
)

const KumoCloud2 = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 600 250" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    {/* Right puff */}
    <path d="M 400 120 C 430 120, 440 90, 420 70 C 410 40, 360 30, 340 50 C 320 30, 270 40, 280 80 C 250 80, 250 120, 280 120" />
    <path d="M 390 90 C 390 65, 310 65, 310 90 C 310 115, 360 115, 360 100 C 360 85, 330 85, 335 80" />

    {/* Right trailing */}
    <path d="M 410 120 L 520 120 A 20 20 0 0 1 540 140 A 20 20 0 0 1 520 160 L 100 160" />
    <path d="M 400 135 L 520 135 A 5 5 0 0 1 525 140 A 5 5 0 0 1 520 145 L 120 145" />

    {/* Left trailing */}
    <path d="M 280 80 L 100 80 A 20 20 0 0 0 80 100 A 20 20 0 0 0 100 120 L 280 120" />
    <path d="M 280 95 L 100 95 A 5 5 0 0 0 95 100 A 5 5 0 0 0 100 105 L 280 105" />
  </svg>
)

export default function AnimatedBackground() {
  return (
    <div className="animated-background js-only" aria-hidden="true">
      {/* Washi Paper Texture */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply'
        }}
      ></div>

      {/* Traditional Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h20v2H22v20h-2V22H0v-2h20v-.5zM36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%238c2a2a' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }}
      ></div>

      {/* Decorative Japanese stylized Mist (Kumo) */}
      <div className="absolute top-[2%] -left-[5%] w-[45vw] min-w-[450px] text-[#c5a059]/[0.15] dark:text-[#d4af37]/[0.15] select-none pointer-events-none">
        <KumoCloud1 />
      </div>

      <div className="absolute top-[28%] -right-[5%] w-[55vw] min-w-[550px] text-[#c5a059]/[0.15] dark:text-[#d4af37]/[0.15] select-none pointer-events-none">
        <KumoCloud2 />
      </div>

      <div className="absolute bottom-[5%] -left-[10%] w-[65vw] min-w-[650px] text-[#c5a059]/[0.15] dark:text-[#d4af37]/[0.15] select-none pointer-events-none">
        <KumoCloud1 />
      </div>

      {/* Sumi-e Ink Washes */}
      <div className="absolute top-[10%] -left-[10%] w-[500px] h-[500px] bg-[#8c2a2a]/[0.08] dark:bg-[#8c2a2a]/[0.15] rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten"></div>
      <div className="absolute top-[40%] -right-[10%] w-[600px] h-[600px] bg-[#3b2a1a]/[0.08] dark:bg-[#3b2a1a]/[0.15] rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-lighten"></div>
      <div className="absolute -bottom-[10%] left-[20%] w-[800px] h-[400px] bg-[#8c2a2a]/[0.06] dark:bg-[#ffffff]/[0.06] rounded-[100%] blur-[120px] mix-blend-multiply dark:mix-blend-lighten"></div>

      {/* Decorative large Kanji watermarks */}
      <div className="absolute top-[15%] right-[5%] text-[30vh] md:text-[40vh] font-serif font-black text-[#8c2a2a]/[0.06] dark:text-white/[0.06] select-none pointer-events-none leading-none">
        和
      </div>
      <div className="absolute bottom-[20%] left-[5%] text-[30vh] md:text-[50vh] font-serif font-black text-[#3b2a1a]/[0.06] dark:text-white/[0.06] select-none pointer-events-none leading-none">
        雅
      </div>
    </div>
  )
}
