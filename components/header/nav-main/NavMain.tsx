import { FC } from 'react';

import NavLink from '@kvitkaphoto/components/header/nav-link/NavLink';
import { ROUTES } from '@kvitkaphoto/constants';
import Trans from '@kvitkaphoto/translation/en.json';
import { THeader } from '@kvitkaphoto/types';

type TMainNav = THeader;

const NavMain: FC<TMainNav> = ({ galleryDropDown }) => {
  return (
    <ul className="nav navbar-nav">
      <NavLink href={ROUTES.PRICING} text={Trans.nav_pricing} />
      {galleryDropDown && (
        <li>
          <span>{Trans.nav_gallery}</span>

          <div>
            <ul>
              {galleryDropDown.map(item => (
                <NavLink href={item.link} text={item.text} key={item.link} />
              ))}
            </ul>
          </div>
        </li>
      )}
      <NavLink href={ROUTES.ABOUT} text={Trans.nav_about} />
      <NavLink href={ROUTES.CONTACTS} text={Trans.nav_contacts} />
    </ul>
  );
};

export default NavMain;
