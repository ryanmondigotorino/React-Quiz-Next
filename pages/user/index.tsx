import React from 'react';
import * as cookie from 'cookie';
import jwtDecode from 'jwt-decode';
import Link from 'next/link';
import type { NextPage, GetServerSideProps } from 'next';
import { useDispatch } from 'react-redux';
import Wrapper from 'components/User/Wrapper';
import { User, Quiz } from '@prisma/client';
import NextSeo from 'components/Utilities/Next-seo';
import type { SEO, GeneratedToken, TableParams, Pagination } from 'interfaces';
import { Direction, Text, Tag } from 'styles/styled-components/global.styled';
import { Wrapper as DashBoardWrapper, Content } from 'styles/styled-components/user/dashboard.styled';
import { api } from 'utilities/auth';
import { format } from 'date-fns';
import { toggleAlert } from 'redux/appSlice';
import Table from 'components/Table';
import debounce from 'utilities/debounce';
import { constructPublishLink } from 'utilities/quiz';
import Button from 'components/Button';
import { ReactComponent as DeleteIcon  } from 'styles/assets/delete.svg';
import { ReactComponent as CopyIcon  } from 'styles/assets/copy-link.svg';


const CLIENT_URL = process.env.APP_URL;

type Props = { seo: SEO; user?: User };

const COLUMNS = ['Date Created', 'Title', 'Status', 'Action'];

const UserDashboard: NextPage<Props> = ({ seo, user }) => {
  const dispatch = useDispatch();
  const [params, setParams] = React.useState<TableParams>({
    page: 1,
    size: 10,
    search: '',
    sort: 'createdAt,desc',
  });
  const [data, setData] = React.useState<any[]>([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [links, setLinks] = React.useState<Pagination>({ self: 1, first: 1, prev: 1, next: 1, last: 1 });
  const debouncedSearch = debounce(searchValue, 500);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [tableNumber, setTableNumber] = React.useState<number>(1);
  const [totalCount, setTotalCount] = React.useState<number>(1);

  const paginate = (action: 'prev' | 'next') => {
    switch (action) {
      case 'prev':
        if (links.first !== links.self) setParams({ ...params, page: links.prev });
        break;
      case 'next':
        if (links.last !== links.self) setParams({ ...params, page: links.next });
        break;
      default:
        break;
    }
  };

  const toggleErrordispatch = () => {
    dispatch(
      toggleAlert({
        icon: 'danger',
        isVisible: true,
        header: 'Error!',
        message: 'Issue encountered. Please reload this page.',
        btn: (
          <Button
            type="button"
            styles={{ width: 133 }}
            onClick={() =>
              dispatch(
                toggleAlert({
                  isVisible: false,
                  header: '',
                  message: '',
                  btn: null,
                })
              )}
            >
              Ok
            </Button> 
        ),
      }),
    );
  };

  const deleteQuiz = async (quiz: Quiz) => {
    try {
      dispatch(
        toggleAlert({
          isVisible: false,
          header: '',
          message: '',
          btn: null,
        })
      );
      const payload = { id: quiz.id };
      const { data: quizData } = await api().delete('/api/quiz', { params: { ...payload }});

      if (quizData?.meta?.status === 'success') {
        dispatch(
          toggleAlert({
            icon: 'success',
            isVisible: true,
            header: 'Success!',
            message: 'Quiz deleted successfully.',
            btn: (
              <Button
                type="button"
                styles={{ width: 133 }}
                onClick={() => {
                  dispatch(
                    toggleAlert({
                      isVisible: false,
                      header: '',
                      message: '',
                      btn: null,
                    })
                  );
                  setParams({ ...params });
                }}
                >
                  Ok
                </Button> 
            ),
          }),
        );
      }
    } catch {
      toggleErrordispatch()
    }
  };

  const tableAction = (action: 'delete' | 'copy', value: Quiz) => {
    switch (action) {
      case 'delete':
        dispatch(
          toggleAlert({
            icon: 'danger',
            isVisible: true,
            header: 'Confirmation',
            message: 'Are you sure you wanted to delete this quiz? This cannot be undo.',
            btn: (
              <Direction.Row className="alert-wrap">
                <Button
                  isClear
                  type="button"
                  styles={{ width: 133 }}
                  onClick={() =>
                    dispatch(
                      toggleAlert({
                        isVisible: false,
                        header: '',
                        message: '',
                        btn: null,
                      })
                    )}
                  >
                    Close
                  </Button> 
                <Button
                  type="button"
                  styles={{ width: 133 }}
                  onClick={() => deleteQuiz(value)}
                  >
                    Confirm
                  </Button> 
              </Direction.Row>
            ),
          }),
        );
        break;
      case 'copy':
        if (value.status === 1) {
          const input = document.createElement('textarea');
          /* @ts-ignore */
          input.innerText = constructPublishLink(value);
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          input.remove();
          dispatch(
            toggleAlert({
              icon: 'success',
              isVisible: true,
              header: 'Success!',
              message: 'Quiz url link copied!',
              btn: (
                <Button
                  type="button"
                  styles={{ width: 133 }}
                  onClick={() => {
                    dispatch(
                      toggleAlert({
                        isVisible: false,
                        header: '',
                        message: '',
                        btn: null,
                      })
                    );
                  }}
                  >
                    Ok
                  </Button> 
              ),
            }),
          );
        }
        break;
    }
  };

  React.useEffect(() => {
    setParams({ ...params, page: links.first, search: debouncedSearch });
  }, [debouncedSearch]);

  React.useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const { data: quizData } = await api().get('/api/quiz', { params: { ...params }});
        if (quizData.meta?.status === 'success') {
          const tableData = quizData.data.map((val: Quiz) => ({
            id: val.id,
            'Date Created': format(new Date(val.createdAt as unknown as string), 'MMM dd, yyyy'),
            Title: val.title,
            Status: val.status === 0 ? 'Draft' : 'Published',
            Action: (
              <Direction.Row>
                <Tag className="danger mr-10" onClick={() => tableAction('delete', val)}>
                  <DeleteIcon className="icon icon--tag" />
                </Tag>
                <Tag className="success" onClick={() => tableAction('copy', val)}>
                  <CopyIcon className="icon icon--tag" />
                </Tag>
              </Direction.Row>
            ),
          }));
          setData(tableData);
          setLinks(quizData.links);
          setTableNumber(tableData.length || 1);
          setTotalCount(quizData.meta.count || 1);
        }
        setLoading(false);
      } catch {
        toggleErrordispatch();
      }
    };

    fetchQuizzes();
  }, [params]);


  return (
    <Wrapper user={user}>
      <NextSeo seo={seo} />
      <DashBoardWrapper.Content>
        <Direction.Row className="justify-content-between separator">
          <Text.Title className="text-uppercase">Dashboard</Text.Title>
          <Link passHref href="/user/quiz/create">
            <a href="replace">
              <Button type="button" styles={{ width: 200 }}>
                + Create Quiz
              </Button>
            </a>
          </Link>
        </Direction.Row>
        <Content.Wrapper>
          <Text.Title className="heading text-uppercase">Quizzes</Text.Title>
          <div className="flex-1">
            <Table
              columns={COLUMNS}
              data={data}
              firstPage={links.first === links.self}
              lastPage={links.last === links.self}
              loader={loading}
              currentNumber={links.first === links.self ? links.self : Number(links.self * 10 - 10) + 1}
              tableNumber={
                Number(links.self) === links.last
                  ? (links.last - 1) * 10 + tableNumber
                  : Number(links.self) * tableNumber
              }
              totalCount={totalCount}
              paginate={paginate}
              searchValue={(val) => setSearchValue(val)}
            />
          </div>
        </Content.Wrapper>
      </DashBoardWrapper.Content>
    </Wrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const props: Props = {
    seo: {
      mainseo: { title: `${process.env.APP_NAME} | Dashboard` },
    },
  };

  const unvalidated = {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };

  const cookies = cookie.parse(req.headers?.cookie || '');

  if (!(cookies.authToken && cookies.token)) return unvalidated;

  const token = jwtDecode<GeneratedToken>(cookies.authToken);
  try {
    if (Date.now() >= token.exp * 1000) return unvalidated;
    if (CLIENT_URL !== token.source) return unvalidated;

    const { data } = await api(cookies.authToken).get(`${CLIENT_URL}/api/user`, { params: { id: token.userId }});

    const user = data?.data?.[0] as User;
    if (user.id === token.userId) {
      return { props: { ...props, user } };
    }
  } catch (error) {
    return unvalidated;
  }
  return { props };
};

export default UserDashboard;