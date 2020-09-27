import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Result, ListCategories, Menus } from "../components";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";
var _ = require('lodash');


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      choosenCategory: "Makanan",
      cart: [],
    };
  }

  componentDidMount() {
    console.log("Mounted Cart State", this.state.cart.length);
    axios
      .get(`${API_URL}products?category.nama=${this.state.choosenCategory}`)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${API_URL}keranjangs`)
      .then((res) => {
        const cart = res.data;
        this.setState({ cart });
      })
      .catch((error) => {
        console.log(error);
      });
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
      console.log(prevState.cart);

    //   if (this.state.cart !== prevState.cart) {
        if(!_.isEqual(prevState.cart, this.state.cart)){
        axios
          .get(API_URL + "keranjangs")
          .then((res) => {
            const cart = res.data;
            this.setState({ cart });
          })
          .catch((error) => {
            console.log("Error yaa ", error);
          });
      }
  }

  changeCategory = (value) => {
    this.setState({
      choosenCategory: value,
      menus: [],
    });

    axios
      .get(`${API_URL}products?category.nama=${value}`)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  masukKeranjang = (value) => {

    axios.get(API_URL + "keranjangs?product.id=" + value.id).then((res) => {
      console.log(res.data.length);
      if (res.data.length < 1) {
        const itemKeranjang = {
          jumlah: 1,
          total_harga: value.harga,
          product: value,
        };

        axios.post(API_URL + "keranjangs", itemKeranjang).then((res) => {
          swal({
            title: "Sukses",
            text:
              "Berhasil menambahkan barang ke keranjang " +
              itemKeranjang.product.nama,
            icon: "success",
            button: false,
          });
        });
      } else {
        const itemKeranjang = {
          jumlah: res.data[0].jumlah + 1,
          total_harga: res.data[0].total_harga + value.harga,
          product: value,
        };

        axios
          .put(API_URL + "keranjangs/" + res.data[0].id, itemKeranjang)
          .then((res) => {
            swal({
              title: "Sukses",
              text:
                "Berhasil menambahkan barang ke keranjang " +
                itemKeranjang.product.nama,
              icon: "success",
              button: false,
            });
          });
      }
    });
  };

  render() {
    const { menus, choosenCategory, cart } = this.state;
    return (
      <div className="mt-2">
        <Container fluid>
          <Row>
            <ListCategories
              changeCategory={this.changeCategory}
              choosenCategory={choosenCategory}
            />
            <Col>
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row>
                {menus &&
                  menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Result cart={cart} {...this.props} />
          </Row>
        </Container>
      </div>
    );
  }
}
