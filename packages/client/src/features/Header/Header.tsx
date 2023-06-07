import { type FC, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Button, Typography } from 'antd';
import { BgColorsOutlined, GlobalOutlined } from '@ant-design/icons';
import { changeUserTheme, signOut } from 'app/slices/userSlice';
import { ROUTES } from 'core/Router';
import { GameRulesModal } from 'features/GameRulesModal';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useLocale } from 'hooks/useLocale';
import { headerLinks, messages, pathsWithRulesModal } from './common';

import './Header.scss';

export const Header: FC = () => {
  const { formatMessage: fm } = useIntl();
  const [, toggleLocale] = useLocale();

  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const { isAuth } = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isGameRulesShown, setGameRuleShown] = useState<boolean>(false);

  const toggleShowRules = () => {
    setGameRuleShown((prevState) => !prevState);
  };

  const toggleTheme = async () => {
    if (currentUser?.id) {
      await dispatch(
        changeUserTheme({
          // TODO: определять девайс
          device: 'default',
          theme: currentUser?.theme?.theme === 'light' ? 'dark' : 'light',
          userId: currentUser?.id,
        }),
      );
    }
  };

  const handleSignOut = async () => {
    await dispatch(signOut());

    navigate(ROUTES.LOGIN_PAGE.path);
  };

  const shouldRulesModalBeShown = pathsWithRulesModal.includes(pathname);

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <Link to={ROUTES.ROOT.path} className="header__link">
            <Typography.Text className="header__title">{fm(messages.buttonTitle)}</Typography.Text>
          </Link>
        </div>

        <nav className="header__nav">
          {isAuth && (
            <>
              {shouldRulesModalBeShown && (
                <Button onClick={toggleShowRules} type="link" className="header__button">
                  {fm(messages.buttonRules)}
                </Button>
              )}
              {headerLinks.map(({ key, link }) => (
                <Link to={link} key={key}>
                  <Button type="link" className="header__button">
                    {fm({ id: `header.navbar.${key}`, defaultMessage: key })}
                  </Button>
                </Link>
              ))}
            </>
          )}
          <GlobalOutlined onClick={toggleLocale} className="header__button" />
          {isAuth && (
            <>
              <BgColorsOutlined onClick={toggleTheme} className="header__button" />
              <Button onClick={handleSignOut} type="link" className="header__button">
                {fm(messages.buttonSignOut)}
              </Button>
            </>
          )}
        </nav>
      </header>
      {isGameRulesShown && <GameRulesModal isOpen={isGameRulesShown} onClose={toggleShowRules} />}
    </>
  );
};
