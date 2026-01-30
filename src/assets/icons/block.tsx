import { SvgIcon, SvgIconProps } from '@mui/material';

export default function BlockIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
        <g fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'>
          <path strokeDasharray='60' d='M3 12c0 -4.97 4.03 -9 9 -9c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9Z'>
            <animate fill='freeze' attributeName='stroke-dashoffset' dur='0.6s' values='60;0' />
          </path>
          <path strokeDasharray='12' strokeDashoffset='12' d='M7 12h10'>
            <animate fill='freeze' attributeName='stroke-dashoffset' begin='0.6s' dur='0.2s' to='0' />
          </path>
        </g>
      </svg>
    </SvgIcon>
  );
}
