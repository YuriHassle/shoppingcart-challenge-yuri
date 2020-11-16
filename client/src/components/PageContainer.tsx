import React, { Fragment } from 'react';
import CartBadge from './CartBadge'
import { RouteComponentProps } from '@reach/router';

interface PageContainerProps extends RouteComponentProps { }

const PageContainer: React.FC<PageContainerProps> = (props) => {
  return (
    <Fragment>
      <div className='page-container'>
        {props.children}
      </div>
    </Fragment>
  );
}

export default PageContainer

