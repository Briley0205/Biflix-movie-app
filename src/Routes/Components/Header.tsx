import styled from "styled-components";

/**Import Logo svg */
import { ReactComponent as PiyoSvg } from "../../Image/Logo-piyo.svg";

/**To Route Link */
import { Link, useRouteMatch } from "react-router-dom";
import { MotionConfig } from "framer-motion";

/**For motion animation */
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { isWhiteSpaceLike } from "typescript";

const Nav = styled.nav`
  height: 70px;
  position: fixed;
  width: 100%;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #141414;
  color: white;
  padding: 0 50px;
  font-size: 14px;
`;
const Col = styled.div`
  display: flex;
  align-items: center;
`;
const LogoBox = styled.div`
  margin-right: 30px;
  cursor: pointer;
`;
const Items = styled.ul`
  display: flex;
  align-items: center;
  height: 70px;
`;
const Item = styled.li`
  margin-right: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-direction: column;
  position: relative;
  a {
    height: 100%;
    position: relative;
    display: flex;
    span {
      margin: auto;
    }
  }
`;
const NavUnderBar = styled(motion.span)`
  position: absolute;
  width: 100%;
  height: 3px;
  bottom: 0;
  border-radius: 2px;
  background-color: ${(props) => props.theme.red};
`;

const Search = styled.span`
  color: white;
  svg {
    height: 25px;
  }
`;
const Input = styled.input``;

function Header() {
  /**It wil tell if I am in the url */
  const homeMatch = useRouteMatch("/");
  const tvMatch = useRouteMatch("/tv");
  return (
    <Nav>
      <Col>
        <LogoBox>
          <PiyoSvg />
        </LogoBox>
        <Items>
          <Item>
            <Link to="/">
              <span>Home</span>
              {homeMatch?.isExact && <NavUnderBar layoutId="nav" />}
            </Link>
          </Item>
          <Item>
            <Link to="/tv">
              <span>Tv Shows</span>
              {tvMatch?.isExact && <NavUnderBar layoutId="nav" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search>
          <Input />
          <motion.svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
        </Search>
      </Col>
    </Nav>
  );
}

export default Header;
