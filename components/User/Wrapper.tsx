import React from 'react';
import { useDispatch } from 'react-redux';
import { setAuthUser } from 'redux/authSlice';
import { User } from '@prisma/client';
import { Wrapper as DashBoardWrapper } from 'styles/styled-components/user/dashboard.styled';

type Props = {
  user?: User;
  children?: React.ReactNode;
};

const Wrapper: React.FC<Props> = ({ children, user }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user?.id) {
      dispatch(setAuthUser(user));
    }
  }, [user, dispatch]);

  return <DashBoardWrapper.Container className="container">{children}</DashBoardWrapper.Container>;
};

export default Wrapper;
