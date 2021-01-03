import React, { ReactElement } from 'react';
import { Col } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Header } from '../Header/Header.component';

import 'bootstrap/dist/css/bootstrap.min.css';
import './AppLayout.css';

export const AppLayout = (props: React.PropsWithChildren<unknown>): ReactElement => {
  return (
    <div className="d-flex justify-content-between flex-column height-min-vh-max">
      <header className="width-full">
        <Header />
      </header>
      <section className="width-full p-2">
        <Container>
          <Row>
            <Col>{props.children}</Col>
          </Row>
        </Container>
      </section>
      <footer className="width-full p-2">
        <div className="d-flex justify-content-center">Michał Dziekoński 2020</div>
      </footer>
    </div>
  );
};
