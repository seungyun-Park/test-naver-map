import { Fragment, useEffect } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import { VscFeedback } from 'react-icons/vsc';
import { AiOutlineShareAlt } from 'react-icons/ai';
import Header from '../components/common/Header';
import styles from '../styles/header.module.scss';
import MapSection from '../components/home/MapSection';
import { Store } from '../types/store';
import useStores from '../hooks/useStores';

interface Props {
  stores: Store[];
}

const Home: NextPage<Props> = ({ stores }) => {
//  console.log(stores);
  const { initializeStores } = useStores();

  useEffect(() => {
    initializeStores(stores);
  }, [initializeStores, stores]); // 새로운 매장 데이터 들어오면, 그 매장 데이터로 전역 상태 업데이트

  return (
    <Fragment>
      <Header
        rightElements={[
          <button
            onClick={() => {
              alert('복사!');
            }}
            className={styles.box}
            style={{ marginRight: 8 }}
            key="button"
          >
            <AiOutlineShareAlt size={20} />
          </button>,
          <Link href="/feedback" className={styles.box} key="link">
            <VscFeedback size={20} />
          </Link>,
        ]}
      />
      <main style={{ width: '100%', height: '100%' }}>
        <MapSection />
      </main>
    </Fragment>
  );
};
export default Home;

export async function getStaticProps() {
  /** TODO: next api routes로 불러오기 */
  const stores = (await import('../public/stores.json')).default;

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
}
