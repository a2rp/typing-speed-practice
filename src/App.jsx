import { useEffect, useState } from "react";
import styles from "./App.module.css";
import SiteHeader from "./components/siteHeader";
import SiteFooter from "./components/siteFooter";
import BackToTop from "./components/backToTop";
import TypingSpeedPractice from "./components/typingSpeedPractice";

const App = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);
    useEffect(() => {
        const onScroll = () => setShowBackToTop(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <div className={styles["app-shell"]} id="top">
            <SiteHeader title="Keyline" mark="K" navItems={[["Test", "#dashboard"], ["How it works", "#workspace"]]} repoUrl="https://github.com/a2rp/typing-speed-practice" />
            <main className={styles.pageContent}>
                <TypingSpeedPractice />
            </main>
            <SiteFooter repoUrl="https://github.com/a2rp/typing-speed-practice" />
            <BackToTop visible={showBackToTop} />
        </div>
    );
};

export default App;
