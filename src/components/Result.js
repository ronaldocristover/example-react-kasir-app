import React, {Component} from "react";
import {Col, ListGroup, Row, Badge} from "react-bootstrap"
import TotalBayar from "./TotalBayar";

export default class Result extends Component {
    render() {
        const {cart} = this.props;
        return (
            <Col md={2} mt="2">
                <h4>Result</h4>
                <hr/>
                    {cart.length !== 0 && (
                        <ListGroup>
                            {cart.map((c) => (
                                <ListGroup.Item key={c.id}>
                                    <Row>
                                        <Col xs={2}>
                                            <Badge pill variant="success">
                                                {c.jumlah}
                                            </Badge>
                                        </Col>
                                        <Col>
                                            <h5>{c.product.nama}</h5>
                                            <p>Rp {c.product.harga}</p>
                                        </Col>
                                        <Col>
                                            <strong className="float-right">Rp. {c.total_harga}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) }

                    <TotalBayar cart={cart} {...this.props}/>
            </Col>
        );
    }
}