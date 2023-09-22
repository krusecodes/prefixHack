import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import router, { Router } from 'next/router';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
      status
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
    $status: String
  ) {
    updateProduct(
      id: $id
      data: {
        name: $name
        description: $description
        price: $price
        status: $status
      }
    ) {
      id
      name
      description
      price
      status
    }
  }
`;

export default function UpdateProduct({ id }) {
  // 1. We need to get the existing product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  // 2. We need to get the mutation to update the product
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);
  // 2.5 Create some state for the form inputs:
  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);
  console.log(inputs);
  if (loading) return <p>loading...</p>;
  // const statusLabel = data.status;
  return (
    <>
      <ProductStyles>
        {data.Product?.photo?.image?.publicUrlTransformed && (
          <img
            src={data.Product.photo.image.publicUrlTransformed}
            alt={data.Product.photo.altText}
          />
        )}
        <div className="details">
          <h2>{data.Product.name}</h2>
          <p>{data.Product.description}</p>
        </div>
      </ProductStyles>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await updateProduct({
            variables: {
              id,
              name: inputs.name,
              description: inputs.description,
              price: inputs.price,
              status: inputs.status,
            },
            refetchQueries: [{ query: SINGLE_PRODUCT_QUERY }],
          }).catch(console.error);
          console.log(res);
          router.push('/products');
        }}
      >
        <DisplayError error={error || updateError} />
        <fieldset disabled={updateLoading} aria-busy={updateLoading}>
          <label htmlFor="status">
            Status
            <select
              id="status"
              name="status"
              value={inputs.status}
              onChange={handleChange}
            >
              <option value="AVAILABLE">Reviewed by Manager</option>
              <option value="UNAVAILABLE">Solution in Progress</option>
            </select>
          </label>

          <button type="submit">Update Status</button>
        </fieldset>
      </Form>
    </>
  );
}
