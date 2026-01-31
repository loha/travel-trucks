import sprite from '../../assets/svg/sprite.svg?url';

const Icon = ({ name, width = 20, height = 20, className = '', fill = 'none', stroke = 'currentColor' }) => {
  return (
    <svg 
      width={width} 
      height={height} 
      className={className}
      fill={fill}
      stroke={stroke}
    >
      <use href={`${sprite}#${name}`} />
    </svg>
  );
};

export default Icon;
