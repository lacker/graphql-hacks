import NonNullType from './NonNullType';
import PrimitiveType from './PrimitiveType';

export default function typeFromString(s) {
  if (s.match(/!$/)) {
    return new NonNullType(s.replace(/!$/, ''));
  }
  return new PrimitiveType(s);
}
