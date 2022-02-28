import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';

import styles from './index.less';

const Page = () => {
  useStyles(styles);
  return (
    <div>
      <div className={styles.page}>Page</div>
      <button onClick={() => alert('page')}>click</button>
    </div>
  );
};

export default Page;
