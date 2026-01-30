'use client';

import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import type { BoxProps } from '@mui/material/Box';
import type { Theme } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Slide, ToastContainerProps } from 'react-toastify';

type Props = ToastContainerProps & {
  boxProps?: BoxProps;
};

const ToastifyWrapper = styled(Box)<BoxProps>(({ theme }) => {
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down(480));

  return {
    ...(isSmallScreen && {
      '& .Toastify__toast-container': {
        marginBlockStart: theme.spacing(3),
        marginInline: theme.spacing(3),
        width: 'calc(100dvw - 1.5rem)'
      }
    }),
    '& .Toastify__toast': {
      minBlockSize: 100,
      minWidth: 300,
      borderRadius: 5,
      padding: theme.spacing(1.5, 2.5),
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[4],
      border: `1px solid ${theme.palette.background.paper}`,
      ...(isSmallScreen && {
        marginBlockEnd: theme.spacing(4)
      }),
      '&:not(.custom-toast)': {
        '& .Toastify__toast-body': {
          color: theme.palette.text.primary
        },
        '&.Toastify__toast--success': {
          '& .Toastify__toast-icon svg': {
            fill: theme.palette.success.main
          }
        },
        '&.Toastify__toast--error': {
          '& .Toastify__toast-icon svg': {
            fill: theme.palette.error.main
          }
        },
        '&.Toastify__toast--warning': {
          '& .Toastify__toast-icon svg': {
            fill: theme.palette.warning.main
          }
        },
        '&.Toastify__toast--info': {
          '& .Toastify__toast-icon svg': {
            fill: theme.palette.info.main
          }
        }
      }
    },
    '& .Toastify__toast-container--top-center': {
      left: 5,
      transform: 'translateX(0)'
    },
    '& .Toastify__toast-body': {
      margin: 0,
      fontSize: theme.typography.h6.fontSize
    },
    '& .Toastify__toast-icon': {
      marginRight: theme.spacing(3),
      height: 32,
      width: 32,
      '& .Toastify__spinner': {
        margin: 3,
        height: 14,
        width: 14
      }
    },
    '& .Toastify__close-button': {
      color: theme.palette.text.primary
    }
  };
}) as typeof Box;

const AppReactToastify = (props: Props) => {
  const { boxProps, ...rest } = props;

  return (
    <ToastifyWrapper {...boxProps}>
      <ToastContainer position='top-right' {...rest} closeButton={false} autoClose={4000} transition={Slide} />
    </ToastifyWrapper>
  );
};

export default AppReactToastify;
