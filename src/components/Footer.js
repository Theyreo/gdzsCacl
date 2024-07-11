import "./Footer.css";
import tg from "./images/Telegram.png";

function Footer() {
    return (
        <footer className="Footer">
            <a href="https://t.me/theyreo"><img src={tg} alt="Telegram"></img></a>
        </footer>
    )
}

export default Footer;