import { useState } from "react";
import { Info } from "lucide-react";
import { organInfo, type Organ } from "../data/medications";
export function AnatomyViewer({
  target = "Lungs",
  compact = false,
}: {
  target?: Organ;
  compact?: boolean;
}) {
  const [selected, setSelected] = useState<Organ | null>(null);
  const organ = (name: Organ, shape: React.ReactNode) => (
    <g
      className={`organ ${target === name ? "active" : ""} ${selected === name ? "inspected" : ""}`}
      tabIndex={0}
      role="button"
      aria-label={`Explore ${name}`}
      aria-pressed={selected === name}
      onClick={() => setSelected(name)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setSelected(name);
        }
      }}
    >
      <title>{name}</title>
      {shape}
    </g>
  );
  return (
    <div className={`anatomy ${compact ? "compact" : ""}`}>
      <div className="anatomy-top">
        <span className="eyebrow">THE HUMAN BODY</span>
        <span className="live-dot">Interactive view</span>
      </div>
      <div className="body-stage">
        <div className="body-orbit orbit-one" />
        <div className="body-orbit orbit-two" />
        <svg
          viewBox="0 0 360 510"
          role="group"
          aria-label="Simplified front-facing human anatomy"
        >
          <defs>
            <linearGradient id="body" x2="1" y2="1">
              <stop stopColor="#eff7f7" />
              <stop offset="1" stopColor="#d9e9ea" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>
          <path
            d="M180 19 C151 19 145 42 149 64 Q150 84 164 91 L163 110 C150 116 126 117 116 133 C102 156 96 196 85 227 L62 293 Q58 307 68 312 Q79 316 85 301 L117 236 L126 205 L124 273 Q122 299 132 315 L135 383 L141 471 Q139 482 126 489 Q122 499 145 499 L160 496 L169 390 L180 325 L191 390 L200 496 L215 499 Q238 499 234 489 Q221 482 219 471 L225 383 L228 315 Q238 299 236 273 L234 205 L243 236 L275 301 Q281 316 292 312 Q302 307 298 293 L275 227 C264 196 258 156 244 133 C234 117 210 116 197 110 L196 91 Q210 84 211 64 C215 42 209 19 180 19Z"
            fill="url(#body)"
            stroke="#bed4d6"
            strokeWidth="1.5"
          />
          <path
            d="M180 115V284 M142 310L180 320L218 310"
            stroke="#c5dadd"
            strokeDasharray="4 5"
            fill="none"
          />
          {organ(
            "Brain",
            <path d="M157 52 Q151 39 163 35 Q168 25 180 33 Q193 25 198 39 Q209 44 201 57 Q201 69 188 69 L180 64 Q164 74 158 62Z" />,
          )}
          <path
            d="M180 99V158 M180 142L156 159 M180 142L204 159"
            stroke="#a5bdbf"
            strokeWidth="5"
            fill="none"
          />
          {organ(
            "Lungs",
            <>
              <path d="M170 144 C158 132 139 151 135 169 C125 192 130 213 143 216 L170 204Z" />
              <path d="M190 144 C202 132 221 151 225 169 C235 192 230 213 217 216 L190 204Z" />
              <path
                d="M159 160L148 184 M201 160L213 184"
                stroke="white"
                strokeWidth="2"
                fill="none"
                opacity=".65"
              />
            </>,
          )}
          {organ(
            "Heart",
            <path d="M179 177 C163 163 157 180 166 193 L182 209 Q201 193 198 181 Q193 168 179 177Z" />,
          )}
          {organ(
            "Liver",
            <path d="M130 228 Q159 211 199 224 L205 237 Q178 242 163 255 Q142 260 131 246Z" />,
          )}
          {organ(
            "Stomach",
            <path d="M203 225 Q205 239 218 235 Q235 235 232 254 Q228 275 207 270 Q192 268 191 255 Q198 251 204 251 Q214 250 209 241 L199 229Z" />,
          )}
          {organ(
            "Kidneys",
            <>
              <path d="M151 268 Q137 261 138 282 Q140 299 152 291 Q158 287 151 281 Q146 277 151 268Z" />
              <path d="M209 268 Q223 261 222 282 Q220 299 208 291 Q202 287 209 281 Q214 277 209 268Z" />
            </>,
          )}
          <g className="svg-label">
            <path d="M224 176H267" />
            <text x="272" y="180">
              Lungs
            </text>
            <path d="M145 235H94" />
            <text x="47" y="239">
              Liver
            </text>
            <path d="M228 253H264" />
            <text x="268" y="257">
              Stomach
            </text>
          </g>
        </svg>
        <div className="target-tag">
          <span className="target-dot" />
          {target}
          <span>Selected organ</span>
        </div>
      </div>
      <div className="anatomy-caption">
        <Info size={15} />
        {selected ? (
          <span>
            <strong>{selected}.</strong> {organInfo[selected]}
          </span>
        ) : (
          <span>Click or focus an organ to discover more.</span>
        )}
      </div>
      <span className="schematic">
        Simplified educational illustration · not to scale
      </span>
    </div>
  );
}
