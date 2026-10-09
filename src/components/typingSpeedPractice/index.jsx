import { useEffect, useMemo, useState } from "react";
import { FiCheck, FiRefreshCw, FiTarget } from "react-icons/fi";
import styles from "./styles.module.css";
const passage="Good ideas need a little room to grow. Write a first draft, keep your hands moving, and give your attention to the next word instead of the last mistake. A steady rhythm makes clear thinking easier.";
const TypingSpeedPractice=()=>{
 const [duration,setDuration]=useState(60);const [time,setTime]=useState(60);const [typed,setTyped]=useState("");const [running,setRunning]=useState(false);const [finished,setFinished]=useState(false);
 useEffect(()=>{if(!running)return undefined;const timer=setInterval(()=>setTime((value)=>{if(value<=1){setRunning(false);setFinished(true);return 0}return value-1}),1000);return()=>clearInterval(timer)},[running]);
 const correct=useMemo(()=>typed.split("").filter((char,index)=>passage[index]===char).length,[typed]);const elapsed=duration-time;const accuracy=typed.length?Math.round(correct/typed.length*100):100;const wpm=elapsed?Math.round(correct/5/(elapsed/60)):0;
 const update=(value)=>{const next=value.slice(0,passage.length);setTyped(next);if(next.length){setRunning(true);setFinished(false)}if(next.length===passage.length){setRunning(false);setFinished(true)}};
 const reset=()=>{setRunning(false);setFinished(false);setTyped("");setTime(duration)};const chooseDuration=(value)=>{setDuration(value);setTime(value);setTyped("");setFinished(false);setRunning(false)};
 return <section className={styles.typingSpeedPractice} id="dashboard">
  <header className={styles.header}><div><p className={styles.label}>A LITTLE PRACTICE, A CLEARER RHYTHM</p><h1>Find your flow.</h1><p>Type the passage, keep your pace, and see how you did.</p></div><div className={styles.keyboardMark}>K<span>·</span></div></header>
  <div className={styles.test} id="workspace"><div className={styles.testHead}><div><p className={styles.label}>TYPING TEST</p><h2>Words, one after another.</h2></div><div className={styles.duration}>{[30,60].map((seconds)=><button key={seconds} type="button" className={duration===seconds?styles.selected:""} onClick={()=>chooseDuration(seconds)}>{seconds}s</button>)}</div></div>
   <div className={styles.metrics}><div><span>TIME LEFT</span><b className={time<=10?styles.lowTime:""}>{String(Math.floor(time/60)).padStart(2,"0")}:{String(time%60).padStart(2,"0")}</b></div><div><span>WPM</span><b>{finished?wpm:"--"}</b></div><div><span>ACCURACY</span><b>{finished?accuracy+"%":"--"}</b></div><button type="button" className={styles.reset} onClick={reset} aria-label="Reset test"><FiRefreshCw /></button></div>
   <div className={styles.passage} aria-label="Typing passage">{passage.split("").map((char,index)=><span key={index} className={index<typed.length?(typed[index]===char?styles.correct:styles.incorrect):index===typed.length?styles.current:""}>{char}</span>)}</div>
   <label className={styles.inputLabel} htmlFor="typing-entry">TYPE THE PASSAGE HERE</label><textarea id="typing-entry" value={typed} onChange={(event)=>update(event.target.value)} onKeyDown={(event)=>{if(event.key==="Tab")event.preventDefault()}} disabled={finished} placeholder="Click here and start typing..." spellCheck="false" autoCapitalize="off" />
   <div className={styles.testFoot}><span><FiTarget /> {running?"Timer is running":"The timer starts with your first keystroke"}</span>{finished&&<strong><FiCheck /> Test complete</strong>}</div>
  </div>
  <div className={styles.note}><span>01</span><p><b>How scoring works</b>Words per minute uses five characters as one word. Accuracy compares each typed character to the passage.</p></div>
 </section>;
};
export default TypingSpeedPractice;
