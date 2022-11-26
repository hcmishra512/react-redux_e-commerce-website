import React, { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Nav, Navbar, Container, Table } from "react-bootstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import Badge from "@mui/material/Badge";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { REMOVE } from "../redux/actions/action";

const Header = () => {
  const [price, setPrice] = useState(0);
  console.log(price);
  const getData = useSelector((state) => state.cartReducer.carts);
  console.log(getData);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteHandler = (id) => {
    dispatch(REMOVE(id));
  };

  const total = () => {
    let price = 0;
    getData.map((ele, i) => {
      price = ele.price * ele.qnty + price;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total]);

  return (
    <div>
      <Navbar bg="dark" variant="light" style={{ height: "64px" }}>
        <Container>
          <NavLink to="/cart" className=" text-decoration-none text-light mx-3">
            Add to Cart
          </NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className=" text-decoration-none text-light">
              Home
            </NavLink>
          </Nav>
          <Badge
            badgeContent={getData.length}
            color="secondary"
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <ShoppingCartIcon
              style={{ cursor: "pointer", fontSize: "35px", color: "white" }}
            />
          </Badge>
        </Container>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {getData.length ? (
            <div
              className="card_details"
              style={{ width: "24rem", padding: 10 }}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Restaurant name</th>
                  </tr>
                </thead>
                <tbody>
                  {getData.map((e) => {
                    return (
                      <>
                        <tr>
                          <td>
                            <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                              <img
                                src={e.imgdata}
                                alt=""
                                style={{ width: "6rem", height: "6rem" }}
                              />
                            </NavLink>
                          </td>
                          <td>
                            <p>{e.rname}</p>
                            <p>Price : ₹ {e.price}</p>
                            <p>Quantity : {e.qnty}</p>
                            <p
                              onClick={() => deleteHandler(e.id)}
                              style={{ color: "red", cursor: "pointer" }}
                              className="smalltrash"
                            >
                              <DeleteIcon />
                            </p>
                          </td>
                          <td
                            onClick={() => deleteHandler(e.id)}
                            className="mt-5 largetrash"
                            style={{ color: "red", cursor: "pointer" }}
                          >
                            <DeleteIcon />
                          </td>
                        </tr>
                      </>
                    );
                  })}
                  <p className="text-center">Total : ₹ {price}</p>
                </tbody>
              </Table>
            </div>
          ) : (
            <div
              className="card_details d-flex justify-content-center align-item-center"
              style={{ width: "24rem", padding: "10px", position: "relative" }}
            >
              <CloseIcon
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "20px",
                  cursor: "pointer",
                }}
              />
              <img
                src="./cart.gif"
                alt=""
                className="empitycart_img"
                style={{ width: "5rem", padding: "10px" }}
              />
              <MenuItem style={{ fontSize: "22px" }}>
                Your Cart is empity
              </MenuItem>
            </div>
          )}
        </Menu>
      </Navbar>
    </div>
  );
};

export default Header;
