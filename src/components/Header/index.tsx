import { HeaderContainer } from "./styles";
import Logo from "../../assets/logo.svg";
import { Timer, Scroll } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <HeaderContainer>
      <img src={Logo} alt="Logo" />
      <nav>
        <NavLink to="/" title="timer">
          {<Timer size={24} />}
        </NavLink>
        <NavLink to="/history" title="Histórico">
          {<Scroll size={24} />}
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
