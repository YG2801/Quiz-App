export default function Button({
  disabled,
  handleClick,
  children,
  extraStyle,
}) {
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`mt-2 w-full rounded-lg bg-[#a52af5] px-6 py-3 text-lg font-semibold transition-all hover:bg-[#ab45ee] ${!disabled && 'active:scale-[0.98]'} ${extraStyle}`}
    >
      {children}
    </button>
  );
}
