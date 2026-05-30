import React from 'react';

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function IconHome({ active }) {
  return (
    <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" {...base}>
      {active ? (
        <path d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-10.5z" fill="currentColor" stroke="none" />
      ) : (
        <path d="M3 10.5L12 3l9 7.5M5 10v10h5v-7h4v7h5V10" />
      )}
    </svg>
  );
}

export function IconSearch() {
  return (
    <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" {...base}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export function IconExplore({ active }) {
  return (
    <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" {...base}>
      {active ? (
        <>
          <path d="M12 2l3 7h7l-5.5 4.5 2 7.5L12 17l-6.5 4 2-7.5L2 9h7l3-7z" fill="currentColor" stroke="none" />
        </>
      ) : (
        <path d="M12 2l3 7h7l-5.5 4.5 2 7.5L12 17l-6.5 4 2-7.5L2 9h7l3-7z" />
      )}
    </svg>
  );
}

export function IconReels() {
  return (
    <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" {...base}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M10 8v8l6-4-6-4z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconMessenger() {
  return (
    <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" {...base}>
      <path d="M21 11.5a8.5 8.5 0 1 1-3.4-6.8L21 4l-1.5 6.5z" />
    </svg>
  );
}

export function IconHeart({ filled }) {
  return (
    <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" {...base}>
      {filled ? (
        <path
          d="M12 21s-7-4.35-9.5-8.5C.5 9.5 2.5 5 7 5c2.2 0 3.5 1.2 5 2.5C13.5 6.2 14.8 5 17 5c4.5 0 6.5 4.5 4.5 7.5C19 16.65 12 21 12 21z"
          fill="currentColor"
          stroke="none"
        />
      ) : (
        <path d="M12 21s-7-4.35-9.5-8.5C.5 9.5 2.5 5 7 5c2.2 0 3.5 1.2 5 2.5C13.5 6.2 14.8 5 17 5c4.5 0 6.5 4.5 4.5 7.5C19 16.65 12 21 12 21z" />
      )}
    </svg>
  );
}

export function IconComment() {
  return (
    <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" {...base}>
      <path d="M21 11.5a8.5 8.5 0 0 1-12.7 7.2L3 21l2.3-5.3A8.5 8.5 0 1 1 21 11.5z" />
    </svg>
  );
}

export function IconShare() {
  return (
    <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" {...base}>
      <path d="M22 3L11 14M22 3l-7 18-4-7-7-4 18-7z" />
    </svg>
  );
}

export function IconBookmark({ filled }) {
  return (
    <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" {...base}>
      {filled ? (
        <path d="M6 2h12v20l-6-4-6 4V2z" fill="currentColor" stroke="none" />
      ) : (
        <path d="M6 2h12v20l-6-4-6 4V2z" />
      )}
    </svg>
  );
}

export function IconMore() {
  return (
    <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

export function IconCreate() {
  return (
    <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" {...base}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  );
}

export function IconClose() {
  return (
    <svg aria-hidden width="24" height="24" viewBox="0 0 24 24" {...base}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
