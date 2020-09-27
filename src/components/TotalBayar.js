import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { API_URL } from "../utils/constants";
import axios from "axios";

export default class TotalBayar extends Component {
  submitTotalBayar(totalBayar) {
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.cart,
    };

    axios.post(API_URL + "pesanans", pesanan).then((res) => {
        this.props.history.push("/success");
    });
  }
  render() {
    const totalBayar = this.props.cart.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);

    return (
      <div className="fixed-bottom">
        <Row>
          <Col md={{ span: 3, offset: 9 }} className="px-4">
            <h4>Total Harga: Rp. {totalBayar}</h4>
            <Button
              variant="primary"
              block
              className="mb-2 mt-4 mr-2"
              size="lg"
              onClick={() => this.submitTotalBayar(totalBayar)}
            >
              <strong>BAYAR</strong>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
