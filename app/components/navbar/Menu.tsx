import React from 'react';

interface MenuProps {
  openMenu: boolean;
}

export default function Menu({ openMenu }: MenuProps) {
  return (
    <svg className={`menu-svg navBar__content__menu ${openMenu ? ' open' : ''}`} width='25' height='20' viewBox='0 0 25 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M12.5 0H25V2H12.5V0Z' fill='white' className='p1' />
      <path d='M0 18H12.5V20H0V18Z' fill='white' className='p2' />
      <path d='M0.000244141 9.00049L25.0002 9.00049V11.0005L0.000244141 11.0005L0.000244141 9.00049Z' fill='white' className='p3' />
      <path className='p4' fillRule='evenodd' clipRule='evenodd' d='M21.4995 1.63138L4.10219 19.5851L2.66589 18.1933L20.0632 0.239596L21.4995 1.63138Z' fill='white' />
    </svg>
  );
}
