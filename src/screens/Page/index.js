import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { Helmet } from 'react-helmet';

import styles from './index.less';

const Page = () => {
  useStyles(styles);
  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>page</title>
        <meta name='description' content='这是page页' />
        <link rel='canonical' href='http://mysite.com/example' />
      </Helmet>
      <div className={styles.page}>Page</div>
      <button onClick={() => alert('page')}>click</button>
    </div>
  );
};

export default Page;
