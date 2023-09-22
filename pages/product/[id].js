import SingleProduct from '../../components/SingleProduct';

export default function SingleProductPage({ query }) {
  // const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY);
  // if (loading) return <div>loading...</div>;
  // if (error) return <div>{query.error.response}</div>;
  return <SingleProduct id={query.id} />;
}
