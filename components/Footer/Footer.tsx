'use client';

import { useSyncExternalStore } from 'react';
import css from './Footer.module.css';

const subscribe = () => () => {};

function getYear() {
  return new Date().getFullYear();
}

function getServerYear() {
  return null;
}

export default function Footer() {
  const year = useSyncExternalStore(subscribe, getYear, getServerYear);

  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {year ?? ''} NoteHub. All rights reserved.</p>
      </div>
    </footer>
  );
}
