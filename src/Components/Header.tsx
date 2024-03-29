import styled from "styled-components";

/**Import Logo svg */
import { ReactComponent as PiyoSvg } from "../Image/Logo-piyo.svg";

/**To Route Link */
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useTransform } from "framer-motion";

/**For motion animation */
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
  height: 70px;
  position: fixed;
  width: 100%;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 0 50px;
  font-size: 14px;
  z-index: 99;
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

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
  cursor: pointer;
`;
const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: #fff;
  font-size: 16px;
  background-color: transparent;
  caret-color: auto;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;

interface IForm {
  keyword: string;
}

function Header() {
  /**It wil tell if I am in the url */
  const homeMatch = useRouteMatch("/");
  const tvMatch = useRouteMatch("/tv");
  /**useAnimation() hook triggers the animation in outer function */
  const [searchOpen, setSearchOpen] = useState(false);
  const inputAnimation = useAnimation();
  const searchToggle = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen((prev) => !prev);
  };
  const { scrollY } = useViewportScroll();
  const gradientColor = useTransform(
    scrollY,
    [0, 150],
    [
      "linear-gradient(rgb(20, 20, 20), rgba(20, 20, 20, 0.04))",
      "linear-gradient(rgb(0, 0, 0), rgb(7, 7, 7))",
    ]
  );

  const history = useHistory();
  const { register, handleSubmit } = useForm<IForm>();
  const onSearch = (data: IForm) => {
    history.push(`/search?keyword=${data.keyword}`);
  };
  return (
    <Nav style={{ background: gradientColor }}>
      <Col>
        <LogoBox>
          <PiyoSvg />
        </LogoBox>
        <Items>
          <Item>
            <Link to="/">
              <span
                style={{
                  color: homeMatch?.isExact ? "#E51013" : "white",
                  fontWeight: homeMatch?.isExact ? "600" : "400",
                }}
              >
                Home
              </span>
            </Link>
          </Item>
          <Item>
            <Link to="/tv">
              <span
                style={{
                  color: tvMatch?.isExact ? "#E51013" : "white",
                  fontWeight: tvMatch?.isExact ? "600" : "400",
                }}
              >
                Tv Shows
              </span>
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onSearch)}>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "linear" }}
            placeholder="Search for..."
          />
          <motion.svg
            onClick={searchToggle}
            animate={{ x: searchOpen ? "-215px" : 0 }}
            transition={{ type: "linear" }}
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
