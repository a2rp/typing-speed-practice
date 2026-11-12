import { useEffect, useMemo, useRef, useState } from "react";
import { FiCheck, FiRefreshCw, FiTarget } from "react-icons/fi";
import styles from "./styles.module.css";

const passage = "Good ideas need a little room to grow. Write a first draft, keep your hands moving, and give your attention to the next word instead of the last mistake. A steady rhythm makes clear thinking easier.";

const TypingSpeedPractice = () => {
    const [duration, setDuration] = useState(60);
    const [time, setTime] = useState(60);
    const [elapsed, setElapsed] = useState(0);
    const [typed, setTyped] = useState("");
    const [running, setRunning] = useState(false);
    const [finished, setFinished] = useState(false);
    const startedAt = useRef(null);

    useEffect(() => {
        if (!running || startedAt.current === null) return undefined;

        const timer = window.setInterval(() => {
            const elapsedSeconds = Math.min(duration, (performance.now() - startedAt.current) / 1000);
            const remaining = duration - elapsedSeconds;
            if (remaining <= 0) {
                setElapsed(duration);
                setTime(0);
                setRunning(false);
                setFinished(true);
                return;
            }
            setTime(Math.ceil(remaining));
        }, 100);

        return () => window.clearInterval(timer);
    }, [duration, running]);

    const correct = useMemo(() => typed.split("").filter((character, index) => passage[index] === character).length, [typed]);
    const accuracy = typed.length ? Math.round((correct / typed.length) * 100) : 0;
    const wpm = elapsed > 0 ? Math.round((correct / 5) / (elapsed / 60)) : 0;

    const update = (value) => {
        const next = value.slice(0, passage.length);
        if (next.length && startedAt.current === null) startedAt.current = performance.now();
        setTyped(next);

        if (next.length) {
            setRunning(true);
            setFinished(false);
        }

        if (next.length === passage.length) {
            const elapsedSeconds = Math.min(duration, (performance.now() - startedAt.current) / 1000);
            setElapsed(elapsedSeconds);
            setTime(Math.max(0, Math.ceil(duration - elapsedSeconds)));
            setRunning(false);
            setFinished(true);
        }
    };

    const reset = () => {
        startedAt.current = null;
        setRunning(false);
        setFinished(false);
        setTyped("");
        setElapsed(0);
        setTime(duration);
    };

    const chooseDuration = (seconds) => {
        startedAt.current = null;
        setDuration(seconds);
        setTime(seconds);
        setElapsed(0);
        setTyped("");
        setFinished(false);
        setRunning(false);
    };

    return <section className={styles.typingSpeedPractice} id="dashboard">
        <header className={styles.header}>
            <div><p className={styles.label}>A LITTLE PRACTICE, A CLEARER RHYTHM</p><h1>Find your flow.</h1><p>Type the passage, keep your pace, and see how you did.</p></div>
            <div className={styles.keyboardMark} aria-hidden="true">K<span>·</span></div>
        </header>
        <div className={styles.test} id="workspace">
            <div className={styles.testHead}>
                <div><p className={styles.label}>TYPING TEST</p><h2>Words, one after another.</h2></div>
                <div className={styles.duration} aria-label="Test duration">
                    {[30, 60].map((seconds) => <button key={seconds} type="button" className={duration === seconds ? styles.selected : ""} onClick={() => chooseDuration(seconds)} aria-pressed={duration === seconds}>{seconds}s</button>)}
                </div>
            </div>
            <div className={styles.metrics} aria-live="polite">
                <div><span>TIME LEFT</span><b className={time <= 10 ? styles.lowTime : ""}>{String(Math.floor(time / 60)).padStart(2, "0")}:{String(time % 60).padStart(2, "0")}</b></div>
                <div><span>WPM</span><b>{finished ? wpm : "--"}</b></div>
                <div><span>ACCURACY</span><b>{finished ? `${accuracy}%` : "--"}</b></div>
                <button type="button" className={styles.reset} onClick={reset} aria-label="Reset test"><FiRefreshCw aria-hidden="true" /></button>
            </div>
            <div className={styles.passage} id="typing-passage" role="group" aria-label="Passage to type">
                {passage.split("").map((character, index) => <span key={index} className={index < typed.length ? (typed[index] === character ? styles.correct : styles.incorrect) : index === typed.length ? styles.current : ""}>{character}</span>)}
            </div>
            <label className={styles.inputLabel} htmlFor="typing-entry">TYPE THE PASSAGE HERE · PASTE DISABLED</label>
            <textarea id="typing-entry" value={typed} onChange={(event) => update(event.target.value)} onPaste={(event) => event.preventDefault()} onDrop={(event) => event.preventDefault()} disabled={finished} placeholder="Click here and start typing..." spellCheck="false" autoCapitalize="off" maxLength={passage.length} aria-describedby="typing-passage" />
            <div className={styles.testFoot}>
                <span><FiTarget aria-hidden="true" /> {running ? "Timer is running" : "The timer starts with your first keystroke"}</span>
                {finished && <strong><FiCheck aria-hidden="true" /> Test complete</strong>}
            </div>
        </div>
        <div className={styles.note}><span>01</span><p><b>How scoring works</b>Words per minute uses five characters as one word. Accuracy compares each typed character to the passage.</p></div>
    </section>;
};

export default TypingSpeedPractice;
