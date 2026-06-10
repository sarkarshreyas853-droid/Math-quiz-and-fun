import { useState, useEffect } from "react";

const WORLDS = [
  {
    id: 1, name: "Candy Kingdom", emoji: "🍭", grade: "Class 1",
    bg: "from-pink-400 to-rose-500", accent: "#f43f5e",
    description: "Help the candy witch count her sweets!",
    questions: [
      { q: "2 + 3 = ?", a: 5, choices: [4, 5, 6, 7], emoji: "🍬" },
      { q: "5 - 2 = ?", a: 3, choices: [2, 3, 4, 5], emoji: "🍫" },
      { q: "1 + 4 = ?", a: 5, choices: [3, 4, 5, 6], emoji: "🧁" },
      { q: "6 - 3 = ?", a: 3, choices: [1, 2, 3, 4], emoji: "🍰" },
      { q: "3 + 3 = ?", a: 6, choices: [5, 6, 7, 8], emoji: "🍭" },
    ]
  },
  {
    id: 2, name: "Dino Jungle", emoji: "🦕", grade: "Class 2",
    bg: "from-green-400 to-emerald-600", accent: "#10b981",
    description: "Count dino eggs with your prehistoric pals!",
    questions: [
      { q: "4 + 7 = ?", a: 11, choices: [9, 10, 11, 12], emoji: "🥚" },
      { q: "15 - 6 = ?", a: 9, choices: [7, 8, 9, 10], emoji: "🦴" },
      { q: "3 × 4 = ?", a: 12, choices: [10, 11, 12, 13], emoji: "🌿" },
      { q: "18 ÷ 3 = ?", a: 6, choices: [4, 5, 6, 7], emoji: "🦕" },
      { q: "9 + 8 = ?", a: 17, choices: [15, 16, 17, 18], emoji: "🦖" },
    ]
  },
  {
    id: 3, name: "Ocean Deep", emoji: "🐠", grade: "Class 3",
    bg: "from-blue-400 to-cyan-600", accent: "#0ea5e9",
    description: "Dive deep and solve fishy math puzzles!",
    questions: [
      { q: "6 × 7 = ?", a: 42, choices: [36, 42, 48, 54], emoji: "🐟" },
      { q: "56 ÷ 8 = ?", a: 7, choices: [5, 6, 7, 8], emoji: "🦀" },
      { q: "45 + 37 = ?", a: 82, choices: [72, 82, 92, 74], emoji: "🐙" },
      { q: "100 - 43 = ?", a: 57, choices: [47, 53, 57, 63], emoji: "🐬" },
      { q: "9 × 8 = ?", a: 72, choices: [63, 72, 81, 54], emoji: "🐠" },
    ]
  },
  {
    id: 4, name: "Space Station", emoji: "🚀", grade: "Class 4",
    bg: "from-violet-500 to-purple-700", accent: "#8b5cf6",
    description: "Navigate the galaxy with math superpowers!",
    questions: [
      { q: "234 + 178 = ?", a: 412, choices: [312, 412, 402, 422], emoji: "⭐" },
      { q: "500 - 237 = ?", a: 263, choices: [253, 263, 273, 283], emoji: "🌙" },
      { q: "12 × 15 = ?", a: 180, choices: [160, 170, 180, 190], emoji: "🚀" },
      { q: "144 ÷ 12 = ?", a: 12, choices: [10, 11, 12, 13], emoji: "🪐" },
      { q: "25² = ?", a: 625, choices: [525, 600, 625, 650], emoji: "🌟" },
    ]
  },
  {
    id: 5, name: "Dragon Castle", emoji: "🐉", grade: "Class 5",
    bg: "from-orange-400 to-red-600", accent: "#f97316",
    description: "Defeat the dragon with fraction & decimal magic!",
    questions: [
      { q: "1/2 + 1/4 = ?", a: "3/4", choices: ["1/2", "3/4", "1", "2/3"], emoji: "🔥" },
      { q: "0.5 × 6 = ?", a: 3, choices: [2, 2.5, 3, 3.5], emoji: "⚔️" },
      { q: "25% of 80 = ?", a: 20, choices: [15, 20, 25, 30], emoji: "🛡️" },
      { q: "2³ = ?", a: 8, choices: [6, 8, 9, 12], emoji: "🐉" },
      { q: "√64 = ?", a: 8, choices: [6, 7, 8, 9], emoji: "🏰" },
    ]
  }
];

const FONT_URL = "https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&family=Fredoka+One&display=swap";

function Confetti({ active }) {
  if (!active) return null;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 50 }}>
      {Array.from({ length: 28 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${(i * 37) % 100}%`, top: "-10%",
          fontSize: "1.4rem",
          animation: `bounce ${0.9 + (i % 5) * 0.3}s infinite`,
          animationDelay: `${(i % 6) * 0.1}s`,
          transform: `rotate(${i * 47}deg)`
        }}>
          {["⭐","🎉","✨","🌟","💫","🎊"][i % 6]}
        </div>
      ))}
    </div>
  );
}

function Stars({ count, max = 3 }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} style={{ fontSize: "1rem", filter: i < count ? "none" : "grayscale(1) opacity(0.25)" }}>⭐</span>
      ))}
    </div>
  );
}

function ProgressBar({ pct, color }) {
  return (
    <div style={{ width: "100%", background: "rgba(255,255,255,0.3)", borderRadius: 99, height: 10, overflow: "hidden" }}>
      <div style={{ height: "100%", borderRadius: 99, width: `${pct}%`, backgroundColor: color, transition: "width 0.5s" }} />
    </div>
  );
}

function ParentDashboard({ children, onBack }) {
  const [pinInput, setPinInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const PIN = "1234";

  function tryPin() {
    if (pinInput === PIN) { setUnlocked(true); setPinError(false); }
    else { setPinError(true); setPinInput(""); }
  }

  const totalStars = children.reduce((sum, c) => sum + Object.values(c.worldScores || {}).reduce((s, v) => s + v, 0), 0);
  const totalWorlds = children.reduce((sum, c) => sum + Object.keys(c.worldScores || {}).filter(k => (c.worldScores[k] || 0) >= 1).length, 0);

  const s = {
    page: { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)", fontFamily: "'Nunito', sans-serif" },
    card: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 32, width: "100%", maxWidth: 360, textAlign: "center" },
    title: { fontFamily: "'Fredoka One', cursive", fontSize: 24, color: "#fff", marginBottom: 4 },
    sub: { color: "#94a3b8", fontSize: 14, marginBottom: 24 },
    input: { width: "100%", borderRadius: 16, padding: "12px 16px", textAlign: "center", fontSize: 22, fontWeight: 900, outline: "none", marginBottom: 12, letterSpacing: 8, boxSizing: "border-box", border: "none" },
    btn: { width: "100%", padding: "12px 0", borderRadius: 16, fontWeight: 900, color: "#fff", fontSize: 18, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #3b82f6, #6366f1)" },
    back: { marginTop: 12, width: "100%", padding: "8px 0", borderRadius: 16, color: "#94a3b8", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", background: "transparent" },
  };

  if (!unlocked) {
    return (
      <div style={s.page}>
        <style>{`@import url('${FONT_URL}');`}</style>
        <div style={s.card}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
          <div style={s.title}>Parent Dashboard</div>
          <div style={s.sub}>Enter PIN to view your child's progress</div>
          <input type="password" maxLength={4} style={{ ...s.input, background: pinError ? "#fef2f2" : "#fff", color: pinError ? "#dc2626" : "#1e1b4b" }}
            placeholder="• • • •" value={pinInput}
            onChange={e => { setPinInput(e.target.value); setPinError(false); }}
            onKeyDown={e => e.key === "Enter" && tryPin()} />
          {pinError && <div style={{ color: "#f87171", fontSize: 13, marginBottom: 8 }}>Incorrect PIN. Try again.</div>}
          <div style={{ color: "#64748b", fontSize: 12, marginBottom: 16 }}>Demo PIN: 1234</div>
          <button style={s.btn} onClick={tryPin}>Unlock 🔓</button>
          <button style={s.back} onClick={onBack}>← Back to Game</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: 16, background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)", fontFamily: "'Nunito', sans-serif" }}>
      <style>{`@import url('${FONT_URL}');`}</style>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, paddingTop: 8 }}>
          <button onClick={onBack} style={{ color: "#94a3b8", fontWeight: 700, fontSize: 13, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 12, padding: "6px 12px", cursor: "pointer" }}>← Back</button>
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: "#fff" }}>📊 Parent Dashboard</div>
          <div style={{ width: 60 }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
          {[{ label: "Kids", value: children.length, emoji: "👧" }, { label: "Worlds Done", value: totalWorlds, emoji: "🌍" }, { label: "Total Stars", value: totalStars, emoji: "⭐" }].map(c => (
            <div key={c.label} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 24 }}>{c.emoji}</div>
              <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 24, color: "#fff" }}>{c.value}</div>
              <div style={{ color: "#94a3b8", fontSize: 12 }}>{c.label}</div>
            </div>
          ))}
        </div>

        {children.length === 0 ? (
          <div style={{ textAlign: "center", color: "#94a3b8", marginTop: 64 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎮</div>
            <div style={{ fontWeight: 700 }}>No players yet!</div>
            <div style={{ fontSize: 14 }}>Kids need to start a game first.</div>
          </div>
        ) : children.map((child, ci) => {
          const scores = child.worldScores || {};
          const childStars = Object.values(scores).reduce((s, v) => s + v, 0);
          const maxStars = WORLDS.length * 3;
          const pct = Math.round((childStars / maxStars) * 100);
          return (
            <div key={ci} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 20, marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", color: "#fff", fontWeight: 900 }}>
                  {child.name ? child.name[0].toUpperCase() : "?"}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 18, color: "#fff" }}>{child.name || "Unknown"}</div>
                  <div style={{ color: "#94a3b8", fontSize: 13 }}>{childStars} / {maxStars} stars earned</div>
                </div>
                <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 22, color: "#facc15" }}>{childStars}⭐</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#94a3b8", fontSize: 12, marginBottom: 4 }}>
                  <span>Overall Progress</span><span>{pct}%</span>
                </div>
                <ProgressBar pct={pct} color="#3b82f6" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {WORLDS.map((w, wi) => {
                  const wStars = scores[wi] || 0;
                  const attempted = wStars > 0;
                  const unlocked = wi === 0 || (scores[wi - 1] || 0) >= 1;
                  return (
                    <div key={wi} style={{ display: "flex", alignItems: "center", gap: 12, borderRadius: 12, padding: 10, background: attempted ? "rgba(255,255,255,0.1)" : "transparent", opacity: attempted || unlocked ? 1 : 0.4 }}>
                      <span style={{ fontSize: 20 }}>{w.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{w.name}</div>
                        <div style={{ color: "#94a3b8", fontSize: 12 }}>{w.grade}</div>
                      </div>
                      {attempted ? <Stars count={wStars} max={3} /> : <span style={{ fontSize: 12, color: "#64748b" }}>{unlocked ? "Not started" : "🔒 Locked"}</span>}
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 16, borderRadius: 16, padding: 12, fontSize: 14, background: "linear-gradient(135deg,rgba(29,78,216,0.2),rgba(124,58,237,0.2))", border: "1px solid rgba(59,130,246,0.3)" }}>
                💡 <span style={{ color: "#cbd5e1" }}>
                  {childStars === 0 ? `Encourage ${child.name || "them"} to start their first world!`
                    : childStars < 6 ? `${child.name || "They"}'re just getting started — great effort! 🌱`
                    : childStars < 12 ? `${child.name || "They"}'re making solid progress! 🚀`
                    : `Excellent! ${child.name || "They"}'re a Math Quest champion! 🏆`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [appMode, setAppMode] = useState("game");
  const [allChildren, setAllChildren] = useState([]);
  const [screen, setScreen] = useState("home");
  const [selectedWorld, setSelectedWorld] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [chosen, setChosen] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [worldScores, setWorldScores] = useState({});
  const [playerName, setPlayerName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [shake, setShake] = useState(false);

  const world = selectedWorld !== null ? WORLDS[selectedWorld] : null;
  const question = world ? world.questions[qIndex] : null;

  useEffect(() => {
    if (!playerName) return;
    setAllChildren(prev => {
      const idx = prev.findIndex(c => c.name === playerName);
      if (idx === -1) return [...prev, { name: playerName, worldScores }];
      const updated = [...prev];
      updated[idx] = { ...updated[idx], worldScores };
      return updated;
    });
  }, [worldScores, playerName]);

  function handleSetName(name) {
    setPlayerName(name);
    const existing = allChildren.find(c => c.name === name);
    if (existing) setWorldScores(existing.worldScores || {});
    else setWorldScores({});
  }

  function startGame(worldIndex) {
    setSelectedWorld(worldIndex); setQIndex(0); setScore(0);
    setLives(3); setChosen(null); setFeedback(null); setScreen("game");
  }

  function handleAnswer(choice) {
    if (chosen !== null) return;
    setChosen(choice);
    const correct = String(choice) === String(question.a);
    setFeedback(correct ? "correct" : "wrong");
    if (correct) { setScore(s => s + 1); setShowConfetti(true); setTimeout(() => setShowConfetti(false), 1400); }
    else { setLives(l => l - 1); setShake(true); setTimeout(() => setShake(false), 500); }
    setTimeout(() => {
      const nextQ = qIndex + 1;
      const remLives = correct ? lives : lives - 1;
      if (nextQ >= world.questions.length || remLives <= 0) {
        const finalScore = correct ? score + 1 : score;
        const stars = finalScore >= 5 ? 3 : finalScore >= 3 ? 2 : finalScore >= 1 ? 1 : 0;
        setWorldScores(ws => ({ ...ws, [selectedWorld]: Math.max(ws[selectedWorld] || 0, stars) }));
        setScore(finalScore);
        setScreen("worldComplete");
      } else { setQIndex(nextQ); setChosen(null); setFeedback(null); }
    }, 1200);
  }

  const baseStyle = { minHeight: "100vh", fontFamily: "'Nunito', sans-serif" };

  if (appMode === "parent") return <ParentDashboard children={allChildren} onBack={() => setAppMode("game")} />;

  if (screen === "home") {
    return (
      <div style={{ ...baseStyle, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 16, background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)" }}>
        <style>{`@import url('${FONT_URL}'); @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-15px)} }`}</style>
        <Confetti active={showConfetti} />
        <button onClick={() => setAppMode("parent")} style={{ position: "fixed", top: 16, right: 16, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 16, padding: "8px 14px", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", zIndex: 10 }}>👨‍👩‍👧 Parent</button>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 72, animation: "bounce 1.5s infinite" }}>🧮</div>
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 48, color: "#fff", textShadow: "0 4px 20px rgba(139,92,246,0.8)" }}>Math Quest</div>
          <div style={{ color: "#c4b5fd", fontSize: 18, fontWeight: 700 }}>Adventure for Classes 1–5 ✨</div>
        </div>
        {!playerName ? (
          <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 24, padding: 24, width: "100%", maxWidth: 360, textAlign: "center", border: "1px solid rgba(255,255,255,0.2)" }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginBottom: 16 }}>What's your name, adventurer? 🧙</div>
            <input style={{ width: "100%", borderRadius: 16, padding: "12px 16px", textAlign: "center", color: "#312e81", fontWeight: 700, fontSize: 18, outline: "none", marginBottom: 16, boxSizing: "border-box", border: "none" }}
              placeholder="Enter your name..." value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && nameInput.trim() && handleSetName(nameInput.trim())} />
            <button onClick={() => nameInput.trim() && handleSetName(nameInput.trim())}
              style={{ width: "100%", padding: "12px 0", borderRadius: 16, fontWeight: 900, color: "#fff", fontSize: 18, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #f43f5e, #8b5cf6)" }}>
              Let's Go! 🚀
            </button>
          </div>
        ) : (
          <div style={{ width: "100%", maxWidth: 480 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ color: "#fde68a", fontWeight: 700 }}>Welcome, <span style={{ color: "#fff" }}>{playerName}</span>! 🌍</div>
              <button onClick={() => { setPlayerName(""); setNameInput(""); setWorldScores({}); }} style={{ fontSize: 12, color: "#94a3b8", background: "rgba(255,255,255,0.1)", border: "none", borderRadius: 12, padding: "4px 10px", cursor: "pointer" }}>Switch</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {WORLDS.map((w, i) => {
                const stars = worldScores[i] || 0;
                const unlocked = i === 0 || (worldScores[i - 1] || 0) >= 1;
                return (
                  <button key={w.id} onClick={() => unlocked && startGame(i)}
                    style={{ borderRadius: 16, padding: 16, display: "flex", alignItems: "center", gap: 16, cursor: unlocked ? "pointer" : "not-allowed", opacity: unlocked ? 1 : 0.5, background: unlocked ? `linear-gradient(135deg,${w.accent}33,${w.accent}66)` : "rgba(255,255,255,0.08)", border: `2px solid ${unlocked ? w.accent : "rgba(255,255,255,0.13)"}`, transition: "transform 0.1s" }}>
                    <span style={{ fontSize: 40 }}>{w.emoji}</span>
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 18, color: "#fff" }}>{w.name}</div>
                      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12 }}>{w.grade} • {w.description}</div>
                      <Stars count={stars} max={3} />
                    </div>
                    <span style={{ fontSize: 22 }}>{unlocked ? "▶️" : "🔒"}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (screen === "game" && world && question) {
    return (
      <div style={{ ...baseStyle, display: "flex", flexDirection: "column", alignItems: "center", padding: 16, background: `linear-gradient(135deg, var(--bg1), var(--bg2))` }}>
        <style>{`@import url('${FONT_URL}'); @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-15px)}} @keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}`}</style>
        <Confetti active={showConfetti} />
        <div style={{ width: "100%", maxWidth: 480, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <button onClick={() => setScreen("home")} style={{ color: "#fff", fontWeight: 700, background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 12, padding: "4px 12px", cursor: "pointer" }}>← Exit</button>
            <span style={{ fontFamily: "'Fredoka One', cursive", color: "#fff", fontSize: 18 }}>{world.name} {world.emoji}</span>
            <span style={{ fontSize: 18 }}>{Array.from({ length: 3 }).map((_, i) => i < lives ? "❤️" : "🖤").join("")}</span>
          </div>
          <ProgressBar pct={(qIndex / world.questions.length) * 100} color={world.accent} />
          <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.8)", fontSize: 12, marginTop: 4 }}>
            <span>Q {qIndex + 1}/{world.questions.length}</span><span>Score: {score} ⭐</span>
          </div>
        </div>
        <div style={{ width: "100%", maxWidth: 480, background: "#fff", borderRadius: 24, padding: 24, marginBottom: 20, textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", animation: shake ? "shake 0.4s ease" : "none" }}>
          <div style={{ fontSize: 56, marginBottom: 8 }}>{question.emoji}</div>
          <div style={{ color: "#9ca3af", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>Solve this! 🧠</div>
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 48, color: "#1e1b4b", marginBottom: 8 }}>{question.q}</div>
          {feedback === "correct" && <div style={{ color: "#16a34a", fontWeight: 900, fontSize: 20, animation: "bounce 0.6s infinite" }}>🎉 Correct! Amazing!</div>}
          {feedback === "wrong" && <div style={{ color: "#dc2626", fontWeight: 900, fontSize: 18 }}>😅 Oops! Answer: {question.a}</div>}
        </div>
        <div style={{ width: "100%", maxWidth: 480, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {question.choices.map((choice, i) => {
            let bg = "#fff", border = "2px solid transparent", tc = "#1e1b4b";
            if (chosen !== null) {
              if (String(choice) === String(question.a)) { bg = "#dcfce7"; border = "2px solid #4ade80"; tc = "#15803d"; }
              else if (String(choice) === String(chosen)) { bg = "#fee2e2"; border = "2px solid #f87171"; tc = "#dc2626"; }
            }
            return (
              <button key={i} onClick={() => handleAnswer(choice)}
                style={{ background: bg, color: tc, borderRadius: 16, padding: "20px 0", fontSize: 32, fontFamily: "'Fredoka One', cursive", fontWeight: 900, border, cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", transition: "transform 0.1s" }}>
                {choice}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (screen === "worldComplete" && world) {
    const finalStars = score >= world.questions.length ? 3 : score >= Math.ceil(world.questions.length / 2) ? 2 : score >= 1 ? 1 : 0;
    const medals = ["🎮", "🥉", "🥈", "🥇"];
    return (
      <div style={{ ...baseStyle, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <style>{`@import url('${FONT_URL}'); @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-15px)}}`}</style>
        <Confetti active />
        <div style={{ background: "#fff", borderRadius: 24, padding: 32, textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", width: "100%", maxWidth: 360 }}>
          <div style={{ fontSize: 72, marginBottom: 12 }}>{medals[finalStars]}</div>
          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 32, color: "#1e1b4b", marginBottom: 4 }}>
            {score >= world.questions.length ? "PERFECT! 🏆" : score >= 3 ? "Great Job! 🥳" : "Keep Trying! 💪"}
          </div>
          <div style={{ color: "#9ca3af", marginBottom: 12 }}>{world.name} Complete!</div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><Stars count={finalStars} max={3} /></div>
          <div style={{ background: "#f9fafb", borderRadius: 16, padding: 16, marginBottom: 20 }}>
            <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 40, color: "#1e1b4b" }}>{score}/{world.questions.length}</div>
            <div style={{ color: "#9ca3af", fontSize: 14 }}>Correct Answers</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button onClick={() => startGame(selectedWorld)} style={{ padding: "12px 0", borderRadius: 16, fontWeight: 900, color: "#fff", fontSize: 18, border: "none", cursor: "pointer", background: `linear-gradient(135deg, ${world.accent}, #8b5cf6)` }}>🔁 Play Again</button>
            <button onClick={() => setScreen("home")} style={{ padding: "12px 0", borderRadius: 16, fontWeight: 900, color: "#fff", fontSize: 18, border: "none", cursor: "pointer", background: "#9ca3af" }}>🌍 World Map</button>
            <button onClick={() => setAppMode("parent")} style={{ padding: "8px 0", borderRadius: 16, fontWeight: 700, color: "#6b7280", fontSize: 14, border: "1px solid #e5e7eb", cursor: "pointer", background: "transparent" }}>👨‍👩‍👧 View Parent Dashboard</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
