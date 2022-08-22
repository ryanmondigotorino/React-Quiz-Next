import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Direction, Text } from 'styles/styled-components/global.styled';
import { authenticated, removeTokens } from 'utilities/auth';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { Header, User } from '../styles/styled-components/app.styled';

const HeaderComponent: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);

  const logout = () => {
    removeTokens();
    setIsLoggedIn(false);
    router.push('/');
  };

  React.useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (authToken) {
      setIsLoggedIn(authenticated(jwtDecode(authToken)));
    } else {
      setIsLoggedIn(false);
    }
    setShowMenu(false);
  }, [router.pathname]);

  return (
    <Header.Wrapper>
      <Header.Body>
        <Direction.Row className="container justify-content-between align-items-center">
          <Header.Content className="align-center">
            <Link passHref href="/">
              <a href="replace">
                <Text.Title className="light">Quiz App</Text.Title>
              </a>
            </Link>
          </Header.Content>
          {!router.pathname.includes('/sign') && (
            <Header.Content className="align-center justify-content-end">
              {!isLoggedIn ? (
                <Link passHref href="/">
                  <a href="replace">
                    <Text.SubTitle className="light">Sign In</Text.SubTitle>
                  </a>
                </Link>
              ) : (
                <OutsideClickHandler onOutsideClick={() => setShowMenu(false)}>
                  <User.Container role="button">
                    <User.Image src="/static/empty-person.png" onClick={() => setShowMenu(true)} />
                    {showMenu && (
                      <User.Dropdown>
                        <li className="menu__link">
                          <User.Button
                            type="button"
                            onClick={() => {
                              router.push('/user');
                              setShowMenu(false);
                            }}
                          >
                            Dashboard
                          </User.Button>
                        </li>
                        <li className="menu__link">
                          <User.Button type="button" onClick={logout}>
                            Logout
                          </User.Button>
                        </li>
                      </User.Dropdown>
                    )}
                  </User.Container>
                </OutsideClickHandler>
              )}
            </Header.Content>
          )}
        </Direction.Row>
      </Header.Body>
    </Header.Wrapper>
  );
};

export default HeaderComponent;
