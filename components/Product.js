import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

export default function Product({ product }) {
  const updateStatusLabel = () => {
    const statusLabel = product.status;
    if (statusLabel === 'DRAFT') {
      return 'Submitted for Review';
    }
    if (statusLabel === 'AVAILABLE') {
      return 'Reviewed by Manager';
    }
    if (statusLabel === 'UNAVAILABLE') {
      return 'Solution in Progress';
    }
  };
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{updateStatusLabel()}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: 'update',
            query: {
              id: product.id,
            },
          }}
        >
          Update Status ✏️
        </Link>
      </div>
    </ItemStyles>
  );
}
