// import {} from 'react'

export default function SizeComponent ({ size, setActiveSize, activeSize }) {
  return (
    <button
      className={`button-outline uppercase ${
        activeSize === size ? 'active-size' : ''
      }`}
      onClick={() => setActiveSize(size)}
      title={size.toUpperCase()}
    >
      {size}
    </button>
  );
}
