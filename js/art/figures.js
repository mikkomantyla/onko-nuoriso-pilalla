import { INK, ol } from "./kit.js";

// Pictures shown inside question cards; keys are deliberately neutral so the source does not name the answer.
export const figures = {
  bird: () => `
    <svg viewBox="12 40 280 248" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="320" height="300" fill="#5e7a3a"/>
      <circle cx="60" cy="60" r="90" fill="#6f8c45" opacity="0.7"/>
      <circle cx="280" cy="250" r="110" fill="#4f6a30" opacity="0.7"/>

      <!-- lichen-covered post -->
      <path d="M128 205 L196 198 L204 300 H122Z" fill="#9b8f80" ${ol(6)}/>
      <path d="M128 205 Q160 192 196 198" fill="none" ${ol(6)}/>
      ${[[142, 230, 12], [176, 220, 9], [160, 258, 14], [186, 270, 10], [138, 282, 9]]
        .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#f0a52c" stroke="${INK}" stroke-width="3"/>`)
        .join("")}

      <g class="fig-bird" style="transform-box:fill-box;transform-origin:50% 100%">
        <!-- legs -->
        <path d="M150 178 L146 204 M170 178 L172 204" fill="none" stroke="#6f8fb0" stroke-width="7" stroke-linecap="round"/>
        <path d="M150 178 L146 204 M170 178 L172 204" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
        <!-- tail -->
        <path d="M100 138 L30 100 L42 86 L112 124Z" fill="#3b7fd6" ${ol(6)}/>
        <!-- yellow belly -->
        <ellipse cx="158" cy="148" rx="72" ry="46" fill="#f7d84a" ${ol(6)}/>
        <!-- olive back -->
        <path d="M92 140 Q118 98 196 104 Q178 128 98 152Z" fill="#9bbf5a" ${ol(5)}/>
        <!-- blue wing with a white bar -->
        <path d="M96 132 Q142 106 186 124 Q156 162 102 152Z" fill="#3b7fd6" ${ol(5)}/>
        <path d="M118 134 Q146 122 170 128" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
        <!-- head: white face, blue cap, dark eye-stripe and collar -->
        <circle cx="216" cy="118" r="42" fill="#fff" ${ol(6)}/>
        <path d="M176 114 Q186 72 232 76 Q258 86 257 108 Q216 94 178 120Z" fill="#2f7fd8" ${ol(5)}/>
        <path d="M254 125 L186 114" fill="none" stroke="#1d2b5c" stroke-width="7" stroke-linecap="round"/>
        <path d="M181 126 Q194 160 238 158" fill="none" stroke="#1d2b5c" stroke-width="9" stroke-linecap="round"/>
        <path d="M240 148 Q250 160 240 168 Q230 160 240 148Z" fill="#1d2b5c"/>
        <circle cx="216" cy="118" r="42" fill="none" ${ol(6)}/>
        <circle cx="236" cy="121" r="6.5" fill="${INK}"/>
        <circle cx="238" cy="119" r="2" fill="#fff"/>
        <!-- beak -->
        <path d="M255 120 L272 128 L255 134Z" fill="#3a3a3a" ${ol(3)}/>
      </g>
    </svg>`,
};
