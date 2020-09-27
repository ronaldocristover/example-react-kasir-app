import React, { Component } from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default class Success extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        const cart = res.data;
        cart.map(function (item) {
          return axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log("Error!", error);
            });
        });
      })
      .catch((error) => {
        console.log("Error!", error);
      });
  }

  render() {
    return (
      <div className="mt-4 text-center">
        <Image src="assets/images/success.svg" width="500" />
        <h2>Sukses Pesan</h2>
        <p>Terima kasih sudah memesan !</p>
        <Button variant="primary" as={Link} to="/">
          Kembali
        </Button>
      </div>
    );
  }
}
