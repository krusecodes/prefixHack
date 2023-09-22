import Link from 'next/link';
import NavStyles from './styles/NavStyles';

export default function Nav() {
  return (
    <NavStyles>
      <Link href="/products">Tickets</Link>
      <Link href="/sell">Create Ticket</Link>
    </NavStyles>
  );
}
