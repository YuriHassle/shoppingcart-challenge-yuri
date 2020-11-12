import React, { Fragment } from 'react';
import Header from './Header'


export default function PageContainer (props: any) {
  return (
    <Fragment>
        <Header></Header>
        <div>{props.children}</div>
    </Fragment>
  );
}

