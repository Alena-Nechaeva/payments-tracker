import InternetIcon from '@/src/assets/icons/internet';
import AguaIcon from '@/src/assets/icons/agua';
import BodegaIcon from '@/src/assets/icons/bodega';
import CreditoIcon from '@/src/assets/icons/credito';
import MovistarIcon from '@/src/assets/icons/movistar';
import TagsIcon from '@/src/assets/icons/tags';
import GastosIcon from '@/src/assets/icons/gastos';
import EnelIcon from '@/src/assets/icons/enel';
import DanceIcon from '@/src/assets/icons/dance';
import TarjetaIcon from '@/src/assets/icons/tarjeta';

const iconMap: Record<string, React.ElementType> = {
  agua: AguaIcon,
  bodega: BodegaIcon,
  credito: CreditoIcon,
  dance: DanceIcon,
  enel: EnelIcon,
  gastos: GastosIcon,
  movistar: MovistarIcon,
  entel: MovistarIcon,
  tags: TagsIcon,
  tarjeta: TarjetaIcon,
  hogar: InternetIcon
};

export default function IconAdornment({ slug }: { slug: string }) {
  const match = Object.keys(iconMap).find(k => slug.includes(k));
  if (!match) return <></>;

  const IconComponent = iconMap[match];
  return <IconComponent sx={{ color: 'info.main' }}/>;
}
