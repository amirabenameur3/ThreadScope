function ThreadScopeLogo({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      role="img"
      aria-label="ThreadScope"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 7h28a6 6 0 0 1 6 6v17a6 6 0 0 1-6 6H24l-10 8v-8h-4a6 6 0 0 1-6-6V13a6 6 0 0 1 6-6Z"
        fill="currentColor"
      />

      <circle
        cx="25"
        cy="21"
        r="8"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
      />

      <circle cx="25" cy="21" r="2.5" fill="white" />

      <path
        d="M25 10v5M25 27v5M14 21h5M31 21h5"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default ThreadScopeLogo;