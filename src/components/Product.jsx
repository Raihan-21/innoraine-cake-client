import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const Product = () => {
  const { id } = useParams();
  const [data, isLoading] = useFetch(`/api/products${id}`);
  // useEffect(() => {
  //   const getProduct = async () => {
  //     try {
  //       const res = await fetch(`/products${id}`);
  //       const data = await res.json();
  //       if (data.product) {
  //         setProduct(data.product);
  //       } else {
  //         console.log(data.error);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getProduct();
  // }, [id]);
  return (
    <div className="container product-details">
      {!isLoading && (
        <>
          <div className="product">
            <h2>{data.product.itemname}</h2>
            <img
              src={`http://localhost:5000/uploads/${data.product.image}`}
              alt="cake"
              width={100}
            />
            <p>{data.product.desc}</p>
          </div>
          <div className="order-details"></div>
        </>
      )}
    </div>
  );
};

export default Product;
