import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { REMOVE, ADD, REMOVE_ONE } from "../redux/actions/action";
import { useDispatch } from "react-redux";

const CardDetails = () => {
  const [data, setData] = useState([]);
  console.log(data);
  const { id } = useParams();
  // console.log(id);

  const getData = useSelector((state) => state.cartReducer.carts);
  // console.log(getData);

  const dispatch = useDispatch();
  const history = useNavigate();

  const compare = () => {
    let compareData = getData.filter((e) => {
      return e.id == id;
    });

    setData(compareData);
  };

  useEffect(() => {
    compare();
  }, [id]);

  //ADD DATA BY CLICK PLUS(+)

  const addCartHandler = (e) => {
    // console.log(e);
    dispatch(ADD(e));
  };

  const cartDeleteHandler = (id) => {
    dispatch(REMOVE(id));
    history("/");
  };

  //Remove one cart
  const oneCartRemHandler = (item) => {
    dispatch(REMOVE_ONE(item));
  };

  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Items Details Page</h2>
        <section className="container mt-3">
          <div className="iteamsdetails">
            {data.map((elem) => {
              return (
                <>
                  <div className="items_img">
                    <img src={elem.imgdata} alt="" />
                  </div>
                  <div className="details">
                    <Table>
                      <tr>
                        <td>
                          <p>
                            <strong>Restaurant</strong>: {elem.rname}
                          </p>
                          <p>
                            <strong>Price</strong>: ₹ {elem.price}
                          </p>
                          <p>
                            <strong>Dishes</strong>: {elem.address}
                          </p>
                          <p>
                            <strong>Total</strong>: ₹ {elem.price * elem.qnty}
                          </p>
                          <div
                            className="mt-5 d-flex justify-content-between align-items-center"
                            style={{
                              width: "100px",
                              cursor: "pointer",
                              background: "#ddd",
                              color: "#111",
                              borderRadius: "8px",
                            }}
                          >
                            <span
                              style={{ fontSize: "24px" }}
                              onClick={
                                elem.qnty < 1
                                  ? cartDeleteHandler(elem.id)
                                  : () => oneCartRemHandler(elem)
                              }
                            >
                              -
                            </span>
                            <span style={{ fontSize: "20px" }}>
                              {elem.qnty}
                            </span>
                            <span
                              style={{ fontSize: "24px" }}
                              onClick={() => addCartHandler(elem)}
                            >
                              +
                            </span>
                          </div>
                        </td>
                        <td>
                          <p>
                            <strong>Rating</strong> :
                            <span
                              style={{
                                background: "green",
                                color: "#fff ",
                                padding: "2px 5px",
                                borderRadius: "5px",
                              }}
                            >
                              {elem.rating} ★
                            </span>
                          </p>
                          <p>
                            <strong>Order Review</strong>
                            <span> : {elem.somedata}</span>
                          </p>
                          <p>
                            <strong>Remove</strong> :
                            <span
                              onClick={() => cartDeleteHandler(elem.id)}
                              style={{
                                color: "red",
                                fontSize: "20",
                                cursor: "pointer",
                                paddingLeft: "10px",
                              }}
                            >
                              <DeleteIcon />
                            </span>
                          </p>
                        </td>
                      </tr>
                    </Table>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default CardDetails;
